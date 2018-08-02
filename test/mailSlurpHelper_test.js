/// <reference path="../steps.d.ts" />

Feature('MailSlurp Helper')

Scenario('Create Inbox', async (I) => {
  await I.setupInbox()
  I.say(`My user ID at MailSlurp is ${await I.typeMyEmailUserId()}`)
  I.say(`My email address at MailSlurp is ${await I.typeMyEmailAddress()}`)
})

Scenario('Receive an email', (I) => {})
Scenario('Parse an email body', (I) => {})
Scenario('Click a link in the email', (I) => {})
