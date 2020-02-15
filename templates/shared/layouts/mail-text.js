module.exports = async function(mail, $, data) {
  return `${mail.text.content}`
}