module.exports = async function($) {
  $.page.title = '__Name__s'

  async function renderList() {
    var items = await api({ action: '__name__/find' })
    if (items.length) {
      html('#list', /* html */`
        <ul>
          ${items.map(item => {
            return /* html */`
              <li>
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
              </li>
            `
          }).join('')}
        </ul>
      `)
    } else {
      html('#list', `No __names__ found... Click on <mark>&ldquo;New __name__&rdquo;</mark> to create one!`)
    }
  }

  return /* html */`
    <div class="title">
      <h1>__Name__s</h1>
      <a href="${$.link('__name__/new')}">New __name__</a>
    </div>
    <div id="list"></div>
    <script>
      ${renderList}
      renderList()
    </script>
  `
}
