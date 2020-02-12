module.exports = async function($) {

  async function renderForm() {
    var params = new URLSearchParams(location.search)
    var _id = params.get('_id')
    var from = params.get('from')

    var result = await api.action('projectGet', { query: { _id } })
    if (!result || result.error) {
      html('form', /* html */`
        ${ $.t('pages.project.delete.issue') }
      `)
    } else {
      html('form', /* html */`
        <button>${ $.t('pages.project.delete.submit') }</button>
        <a href="${
          from === 'project/details'
            ? $.link(`project/details?_id=${ _id }`)
            : $.link('project/list')}">
          ${ $.t('pages.project.delete.cancel') }
        </a>
      `)
    }
  }

  async function handleDelete(form) {
    var button = q('button', form)
    button.disabled = true
    var params = new URLSearchParams(location.search)
    var _id = params.get('_id')
    var result = await api.action('projectDelete', { query: { _id } })
    if (!result || result.error) {
      button.disabled = false
      html('form', /* html */`
        ${ $.t('pages.project.delete.issue') }
      `)
    } else {
      window.location = $.link('project/list')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.project.delete.title') }</h1>
    <p>${ $.t('pages.project.delete.confirm') }</p>
    <form onsubmit="handleDelete(this);return false">
      ${ $.t('pages.project.delete.loading') }
    </form>
    <script>${ handleDelete }${ renderForm }renderForm()</script>
  `
}