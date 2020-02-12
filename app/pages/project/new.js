module.exports = async function($) {
  async function handleSubmit(form) {
    var button = q('button', form)
    button.disabled = true
    var values = serialize(form)
    var result = await api.action('projectCreate', { values })
    if (result.error) {
      button.disabled = false
      Object.keys(result.values || {}).forEach(function(key) {
        text(`.${key}-error`, result.values[key].join(', '))
      })
    } else {
      window.location = $.link('project/list')
    }
  }
  return /* html */`
    <form onsubmit="handleSubmit(this);return false">
      <div>
        <label for="name-input">
          ${ $.t('pages.project.new.label.name') }
        </label>
        <input id="name-input" type="text" name="name">
      </div>
      <div class="error name-error"></div>
      <button>
        ${ $.t('pages.project.new.submit') }
      </button>
      <a href="${ $.link('project/list') }">
        ${ $.t('pages.project.new.cancel') }
      </a>
    </form>
    <script>${ handleSubmit }</script>
  `
}