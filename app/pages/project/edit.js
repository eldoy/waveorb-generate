module.exports = async function($) {

  async function renderForm() {
    var params = new URLSearchParams(location.search)
    var _id = params.get('_id')
    var from = params.get('from')

    var result = await api.action('projectGet', { query: { _id } })
    if (!result || result.error) {
      html('form', /* html */`
        ${ $.t('pages.project.edit.issue') }
      `)
    } else {
      html('form', /* html */`
        <div>
          <label for="name-input">
            ${ $.t('pages.project.edit.name') }
          </label>
          <input id="name-input" type="text" name="name" value="${ result.name }">
        </div>
        <div class="error name-error"></div>
        <button>
          ${ $.t('pages.project.edit.submit') }
        </button>
        <a href="${
          from === 'details'
            ? $.link(`project/details?_id=${ _id }`)
            : $.link('project/list')}">
          ${ $.t('pages.project.edit.cancel') }
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
    var result = await api.action('projectUpdate', { query: { _id }, values })
    if (result.error) {
      button.disabled = false
      Object.keys(result.values || {}).forEach(function(key) {
        text(`.${key}-error`, result.values[key].join(', '))
      })
    } else {
      window.location = from === 'details'
        ? $.link(`project/details?_id=${ _id }`)
        : $.link('project/list')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.project.edit.title') }</h1>
    <form onsubmit="handleSubmit(this);return false">
      ${ $.t('pages.project.edit.loading') }
    </form>
    <script>${ handleSubmit }${ renderForm }renderForm()</script>
  `
}