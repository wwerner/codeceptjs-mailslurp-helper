exports.config = {
  tests: './test/*.js',
  output: './output',
  helpers: {
    WebDriverIO: {
      url: 'https://www.mailslurp.com/',
      browser: 'chrome'
    },
    MailSlurpHelper: {
      require: './lib/helper/MailSlurp.js',
      apiKey: 'VEpGQB8JH7KjiHwgXpKuQuNK7N1j39ZkrjWJxzc0w6sooV5Yu9' // MailSlurp API key from https://www.mailslurp.com/login
    }
  },
  bootstrap: false,
  name: 'CodeceptJS MailSlurp Helper'
}
