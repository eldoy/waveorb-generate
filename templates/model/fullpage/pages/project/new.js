module.exports = async function($) {

  async function handleSubmit(form) {
    var button = q('button', form)
    button.disabled = true
    var values = serialize(form)
    var result = await api.action('create__Name__', { values })
    if (result.error) {
      button.disabled = false
      Object.keys(result.values || {}).forEach(function(key) {
        text(`.${key}-error`, result.values[key].join(', '))
      })
    } else {
      window.location = $.link('__name__/list')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.__name__.new.title') }</h1>
    <form onsubmit="handleSubmit(this);return false">
      <div>
        <label for="name-input">
          ${ $.t('pages.__name__.new.name') }
        </label>
        <input id="name-input" type="text" name="name">
      </div>
      <div class="error name-error"></div>
      <button>
        ${ $.t('pages.__name__.new.create') }
      </button>
      <a href="${ $.link('__name__/list') }">
        ${ $.t('pages.__name__.new.cancel') }
      </a>
    </form>
    <script>${ handleSubmit }</script>
  `
}