module.exports = async function($) {
  $.page.title = 'Edit __name__'
  $.page.layout = 'dialog'

  async function handleUpload(input) {
    css('.hq-progress', { opacity: 1 })
    var result = await api({ action: 'v1/upload/create', config: { resize: [80, 80] } }, { files: input.files })
    css('.hq-progress', { opacity: 0 })
    if (!result || !result.length) {
      return flash('Upload failed', { scroll: false })
    }
    if (result.error) {
      return showErrors(result)
    }
    var url = result[0].url
    html('.__name__-image', `<img src="${url}">`)
    q('#__name__-image').value = url
  }

  async function handleUpdate__Name__(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'v1/__name__/update', query: { id }, values })
    if (result.error) {
      button.disabled = false
      return showErrors(result)
    }
    cookie('flash', '__Name__ updated.')
    goBack()
  }

  async function render__Name__Form() {
    var id = params('id')
    var __name__ = await api({ action: 'v1/__name__/get', query: { id } })
    html('#page-__name__-edit form', /* html */`
      <input type="hidden" name="id" value="${id}">
      <div class="hq-field">
        <label for="__name__-name">Name</label>
        <span class="hq-star" title="required">*</span>
        <br>
        <input type="text" id="__name__-name" name="name" value="${esc(__name__.name)}" oninput="clearErrors(this)">
        <div class="hq-errors name-errors"></div>
      </div>
      <div class="hq-form-buttons">
        <button class="hq-button" onclick="handleUpdate__Name__(this)">Save</button>
        <a class="hq-underline" href="#" onclick="goBack()">Cancel</a>
      </div>
    `)
  }

  return /* html */`
    <div id="page-__name__-edit">
      <form onsubmit="return false"></form>
    </div>
    <script>
      var id = params('id')
      ${render__Name__Form}
      render__Name__Form()
      ${handleUpload}
      ${handleUpdate__Name__}
    </script>
  `
}
