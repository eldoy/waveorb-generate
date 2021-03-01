module.exports = function(name, names, Name, Names) {
  return `module.exports = async function($) {
  $.page.title = 'Show ${name}'

  async function renderShow() {
    const item = await api({ action: '${name}/get', query: { id }})
    html('#show', /* html */\`
      <h1>${Name}: \${esc(item.name)}</h1>
      <a href="\${$.link('${name}/list')}">Back to list</a>
    \`)
  }

  return /* html */\`
    <div id="show"></div>
    <script>
      var id = params('${name}_id')
      \${renderShow}
      renderShow()
    </script>
  \`
}`
}
