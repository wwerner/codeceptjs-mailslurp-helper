# CodeceptJS MailSlurp Email Helper

MailSlurp helper provides access to randomly generated email address inboxes and retrieve emails from these inboxes.
This is just a wrapper using the MailSlurp JS SDK to access the https://www.mailslurp.com/ API.
For additional information on MailSlurp see https://www.mailslurp.com/documentation.

MailSlurp helper requires
* the MailSlurp client (https://www.npmjs.com/package/mailslurp-client)
* and (currently) the WebDriverIO helper to provide browser interactions

## Configuration

This helper should be configured in codecept.json

* `apiKey`: MailSlurp API key from https://www.mailslurp.com/login

Example:

```json
{
  "helpers": {
    MailSlurpHelper: {
      require: './helpers/MailSlurp.js',
      apiKey: process.env.MAILSLURP_API_KEY || '<my actual API key>' // MailSlurp API key from https://www.mailslurp.com/login
    }
  }
}
```
