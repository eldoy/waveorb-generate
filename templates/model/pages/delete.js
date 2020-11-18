module.exports = async function($) {
  $.page.title = 'Delete __name__'
  $.page.layout = 'dialog'

  async function handleDelete__Name__(button) {
    button.disabled = true
    var query = serialize(button.form)
    var result = await api({ action: 'v1/__name__/delete', query })
    if (result.error) {
      button.disabled = false
      return flash(result.error.message)
    }
    cookie('flash', '__Name__ deleted')
    location = $.link(`__name__/list`)
  }

  function renderDeleteForm() {
    html('#page-__name__-delete form', /* html */`
      <input type="hidden" name="id" value="${id}">
      <div>
        <button class="hq-button -danger" onclick="handleDelete__Name__(this)">Delete</button>
        <a class="hq-underline" href="#" onclick="goBack()">Cancel</a>
      </div>
    `)
  }

  return /* html */`
    <div id="page-__name__-delete">
      <p class="hq-hint">This cannot be undone.</p>
      <form onsubmit="return false"></form>
    </div>
    <script>
      var id = params('id')
      ${renderDeleteForm}
      renderDeleteForm()
      ${handleDelete__Name__}
    </script>
  `
}
