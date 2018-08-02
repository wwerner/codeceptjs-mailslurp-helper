const MailSlurpClient = require('mailslurp-client')
const mailSlurpInboxApi = new MailSlurpClient.InboxcontrollerApi()
var assert = require('assert')

/**
 * ## MailSlurp Email Helper
 *
 * MailSlurp helper provides access to randomly generated email address inboxes and retrieve emails from these inboxes.
 * This is just a wrapper using the MailSlurp JS SDK to access the https://www.mailslurp.com/ API.
 * For additional information on MailSlurp see https://www.mailslurp.com/documentation.
 *
 * MailSlurp helper requires
 * * the MailSlurp client (https://www.npmjs.com/package/mailslurp-client)
 * * and (currently) the WebDriverIO helper to provide browser interactions
 *
 * ### Configuration
 *
 * This helper should be configured in codecept.json
 *
 * * `apiKey`: MailSlurp API key from https://www.mailslurp.com/login
 *
 * Example:
 *
 * ```json
 * {
 *   "helpers": {
 *     MailSlurpHelper: {
 *       require: './helpers/MailSlurp.js',
 *       apiKey: process.env.MAILSLURP_API_KEY || '<my actual API key>' // MailSlurp API key from https://www.mailslurp.com/login
 *     }
 *   }
 * }
 * ```
 */
class MailSlurp extends Helper { // eslint-disable-line no-undef
  constructor (config) {
    assert(config.apiKey, 'MailSlurp API key must be set in codecept.conf under helpers.MailSlurpHelper.apiKey.')
    super(config)
  }

  async setupInbox () {
    await mailSlurpInboxApi.createRandomInboxUsingPOST(this.config.apiKey)
      .then((data) => {
        this.emailAddress = data.payload.address
        this.emailUserId = data.payload.id
      })
  }

  typeMyEmailAddress () {
    if (!this.emailAddress) assert.fail('Inbox is not set up. Did you run setupInbox()?')
    return this.emailAddress
  }

  typeMyEmailUserId () {
    if (!this.emailUserId) assert.fail('Inbox is not set up. Did you run setupInbox()?')
    return this.emailUserId
  }

  async fillFieldWithMyEmailAddress (selector, ...options) {
    await this.helpers['WebDriverIO'].fillField(selector, this.getEmailAddress())
  }

  async fillFieldWithMyUserId (selector, ...options) {
    await this.helpers['WebDriverIO'].fillField(selector, this.getEmailId())
  }

  async receiveEmail (subject) {
    var data = await mailSlurpInboxApi
      .getEmailsForInboxUsingGET(this.config.apiKey, this.getEmailId(), {
        minCount: 1,
        maxWait: 90,
        since: new Date(new Date().getTime() - 120000) // look for mails that arrived in the last two minutes
      })

    var latestEmail = data.payload.reduce(function (l, c) { return c.received > l.received ? c : l })
    return assert.equal(latestEmail.subject, subject, `expected one email with subject ${subject}, but found ${latestEmail.subject}`)
  }

  async clickVerificationLinkInEmail () {
    var data = await mailSlurpInboxApi
      .getEmailsForInboxUsingGET(this.config.apiKey, this.getEmailId(), {
        minCount: 1,
        maxWait: 90,
        since: new Date(new Date().getTime() - 120000) // look for mails that arrived in the last two minutes
      })

    var latestEmail = data.payload.reduce(function (l, c) { return c.received > l.received ? c : l })
    var verificationLinkRegEx = /<a href="(https:.+verifyRegistration.+?)"/g
    var verificationLink = verificationLinkRegEx.exec(latestEmail.body)[1]
    await this.helpers['WebDriverIO'].amOnPage(verificationLink)
  }
}

module.exports = MailSlurp
