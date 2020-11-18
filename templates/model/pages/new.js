module.exports = async function($) {
  $.page.title = 'New __name__'
  $.page.layout = 'dialog'

  async function handleCreate__Name__(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'v1/__name__/create', values })
    if (result.error) {
      button.disabled = false
      return showErrors(result)
    }
    cookie('flash', '__Name__ created')
    goBack()
  }

  function render__Name__Form() {
    html('#page-__name__-new form', /* html */`
      <div class="hq-field">
        <label for="__name__-name">Name</label>
        <span class="hq-star" title="required">*</span>
        <br>
        <input type="text" id="__name__-name" name="name" oninput="clearErrors(this)">
        <div class="hq-errors name-errors"></div>
      </div>
      <div class="hq-form-buttons">
        <button aria-label="Save" class="hq-button" onclick="handleCreate__Name__(this)">Save</button>
        <a class="hq-underline" href="#" onclick="goBack()">Cancel</a>
      </div>
    `)
  }

  return /* html */`
    <div id="page-__name__-new">
      <form onsubmit="return false"></form>
    </div>
    <script>
      ${render__Name__Form}
      render__Name__Form()
      ${handleCreate__Name__}
    </script>
  `
}
