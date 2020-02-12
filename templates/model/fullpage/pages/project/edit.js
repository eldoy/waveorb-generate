module.exports = async function($) {

  async function renderForm() {
    var params = new URLSearchParams(location.search)
    var _id = params.get('_id')
    var from = params.get('from')

    var result = await api.action('__name__Get', { query: { _id } })
    if (!result || result.error) {
      html('form', /* html */`
        ${ $.t('pages.__name__.edit.issue') }
      `)
    } else {
      html('form', /* html */`
        <div>
          <label for="name-input">
            ${ $.t('pages.__name__.edit.name') }
          </label>
          <input id="name-input" type="text" name="name" value="${ result.name }">
        </div>
        <div class="error name-error"></div>
        <button>
          ${ $.t('pages.__name__.edit.submit') }
        </button>
        <a href="${
          from === 'details'
            ? $.link(`__name__/details?_id=${ _id }`)
            : $.link('__name__/list')}">
          ${ $.t('pages.__name__.edit.cancel') }
        </a>
      `)
    }
  }

  async function handleSubmit(form) {
    var button = q('button', form)
    button.disabled = true
    var params = new URLSearchParams(location.search)
    var _id = params.get('_id')
    var from = params.get('from')
    var values = serialize(form)
    var result = await api.action('__name__Update', { query: { _id }, values })
    if (result.error) {
      button.disabled = false
      Object.keys(result.values || {}).forEach(function(key) {
        text(`.${key}-error`, result.values[key].join(', '))
      })
    } else {
      window.location = from === 'details'
        ? $.link(`__name__/details?_id=${ _id }`)
        : $.link('__name__/list')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.__name__.edit.title') }</h1>
    <form onsubmit="handleSubmit(this);return false">
      ${ $.t('pages.__name__.edit.loading') }
    </form>
    <script>${ handleSubmit }${ renderForm }renderForm()</script>
  `
}