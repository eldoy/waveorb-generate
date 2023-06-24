module.exports = function() {
  return `module.exports = async function ($) {
  const { config } = $.params
  const options = { timestamp: true, config }

  await $.net.upload($.files, options)

  return $.files.map((f) => ({
    name: f.name,
    type: f.type,
    size: f.size,
    url: f.url
  }))
}`
}
