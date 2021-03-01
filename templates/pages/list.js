module.exports = function({ name, names, Name, Names }) {
  return `module.exports = async function($) {
  $.page.title = '${Names}'

  async function renderList() {
    var items = await api({ action: '${name}/find' })
    if (items.length) {
      html('#list', /* html */\`
        \${items.map(item => {
          return /* html */\`
            <div class="flex list">
              <span>\${esc(item.name)}</span>
              <nav>
                <a href="\${$.link(\`${name}/show?${name}_id=\${item.id}\`)}">
                  Show
                </a>
                <a href="\${$.link(\`${name}/edit?${name}_id=\${item.id}\`)}">
                  Edit
                </a>
                <a href="\${$.link(\`${name}/delete?${name}_id=\${item.id}\`)}">
                  Delete
                </a>
              </nav>
            </div>
          \`
        }).join('')}
      \`)
    } else {
      html('#list', \`No ${names} found... Click on <mark>&ldquo;New ${name}&rdquo;</mark> to create one!\`)
    }
  }

  return /* html */\`
    <div class="flex">
      <h1>${Names}</h1>
      <a href="\${$.link('${name}/new')}">New ${name}</a>
    </div>
    <div id="list"></div>
    <script>
      \${renderList}
      renderList()
    </script>
  \`
}`
}
