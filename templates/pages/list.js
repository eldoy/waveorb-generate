module.exports = async function($) {
  $.page.title = '__Names__'

  async function renderList() {
    var items = await api({ action: '__name__/find' })
    if (items.length) {
      html('#list', /* html */`
        ${items.map(item => {
          return /* html */`
            <div class="flex list">
              ${esc(item.name)}
              <nav>
                <a href="${$.link(`__name__/show?__name___id=${item.id}`)}">
                  Show
                </a>
                <a href="${$.link(`__name__/edit?__name___id=${item.id}`)}">
                  Edit
                </a>
                <a href="${$.link(`__name__/delete?__name___id=${item.id}`)}">
                  Delete
                </a>
              </nav>
            </div>
          `
        }).join('')}
      `)
    } else {
      html('#list', `No __names__ found... Click on <mark>&ldquo;New __name__&rdquo;</mark> to create one!`)
    }
  }

  return /* html */`
    <div class="flex">
      <h1>__Names__</h1>
      <a href="${$.link('__name__/new')}">New __name__</a>
    </div>
    <div id="list"></div>
    <script>
      ${renderList}
      renderList()
    </script>
  `
}
