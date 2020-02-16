module.exports = async function($) {

  async function render__Name__() {
    var _id = new URLSearchParams(location.search).get('_id')
    var result = await api.action('get__Name__', { query: { _id } })
    if (!result || result.error) {
      html('.__name__-details', /* html */`
        ${ $.t('pages.__name__.details.issue') }
      `)
    } else {
      html('.__name__-details', /* html */`
        ${ result.name }
        ${ result._id }
        <a href="${ $.link(`__name__/edit?_id=${ _id }&from=details`) }">
          ${ $.t('pages.__name__.details.edit') }
        </a>
        <a href="${ $.link(`__name__/delete?_id=${ _id }&from=details`) }">
          ${ $.t('pages.__name__.details.delete') }
        </a>
      `)
    }
  }

  return /* html */`
    <h1>${ $.t('pages.__name__.details.title') }</h1>
    <a href="${ $.link('__name__/list') }">
      ${ $.t('pages.__name__.details.back') }
    </a>
    <div class="__name__-details">
      ${ $.t('pages.__name__.details.loading') }
    </div>
    <script>${ render__Name__ }render__Name__()</script>
  `
}