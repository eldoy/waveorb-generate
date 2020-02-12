module.exports = async function($) {

  async function renderForm() {
    var params = new URLSearchParams(location.search)
    var _id = params.get('_id')
    var from = params.get('from')

    var result = await api.action('__name__Get', { query: { _id } })
    if (!result || result.error) {
      html('form', /* html */`
        ${ $.t('pages.__name__.delete.issue') }
      `)
    } else {
      html('form', /* html */`
        <div>
          ${ $.t('pages.__name__.delete.confirm') }
        </div>
        <div>
          ${ result.name }
          ${ result._id }
        </div>
        <button>${ $.t('pages.__name__.delete.submit') }</button>
        <a href="${
          from === 'details'
            ? $.link(`__name__/details?_id=${ _id }`)
            : $.link('__name__/list')}">
          ${ $.t('pages.__name__.delete.cancel') }
        </a>
      `)
    }
  }

  async function handleDelete(form) {
    var button = q('button', form)
    button.disabled = true
    var params = new URLSearchParams(location.search)
    var _id = params.get('_id')
    var result = await api.action('__name__Delete', { query: { _id } })
    if (!result || result.error) {
      button.disabled = false
      html('form', /* html */`
        ${ $.t('pages.__name__.delete.issue') }
      `)
    } else {
      window.location = $.link('__name__/list')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.__name__.delete.title') }</h1>
    <form onsubmit="handleDelete(this);return false">
      ${ $.t('pages.__name__.delete.loading') }
    </form>
    <script>${ handleDelete }${ renderForm }renderForm()</script>
  `
}