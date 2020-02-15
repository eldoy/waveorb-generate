module.exports = async function($, data) {
  return {
    // Wmail options
    options: {
      subject: $.t('mails.signup.subject')
    },
    // HTML version
    html: {
      // The name of the layout to use in app/layouts
      layout: 'mail-html',
      // The content property of the data parameter
      content: [
        `<div>${ $.t('mails.signup.email') }: ${ data.email }</div>`
      ].join('\n')
    },
    // Text version
    text: {
      layout: 'mail-text',
      content: [
        `${ $.t('mails.signup.email') }: ${ data.email }`
      ].join('\n')
    }
  }
}
