module.exports = async function($) {
  $.page.title = 'Show __name__'

  async function renderShow() {
    const item = await api({ action: '__name__/get', query: { id }})
    html('#show', /* html */`
      <h1>__Name__: ${esc(item.name)}</h1>
      <a href="${$.link(`index`)}">Back to list</a>
    `)
  }

  return /* html */`
    <div id="show"></div>
    <script>
      var id = params('__name___id')
      ${renderShow}
      renderShow()
    </script>
  `
}
