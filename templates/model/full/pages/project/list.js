module.exports = async function($) {

  async function list__Name__() {
    var __names__ = await api.action('list__Name__')
    if (__names__.length) {
      html('.__name__-list', /* html */`
        <div>
          ${ __names__.length }
          ${ $.t('pages.__name__.list.count') }
        </div>
        <ul>
        ${
          __names__.map(function(__name__) {
            return /* html */`
              <li>
                <a href="${ $.link(`__name__/details?_id=${ __name__._id }`) }">
                  ${ __name__.name }
                  ${ __name__._id }
                </a>
                <a href="${ $.link(`__name__/edit?_id=${ __name__._id }`) }">
                  ${ $.t('pages.__name__.list.edit') }
                </a>
                <a href="${ $.link(`__name__/delete?_id=${ __name__._id }`) }">
                  ${ $.t('pages.__name__.list.delete') }
                </a>
              </li>
            `
          }).join('')
        }
        </ul>
      `)
    } else {
      html('.__name__-list', /* html */`
        <div>${ $.t('pages.__name__.list.empty') }</div>
      `)
    }
  }

  return /* html */`
    <h1>${ $.t('pages.__name__.list.title') }</h1>
    <a href="${ $.link('__name__/new') }">
      <button>
        ${ $.t('pages.__name__.list.new') }
      </button>
    </a>
    <div class="__name__-list">
      ${ $.t('pages.__name__.list.loading') }
    </div>
    <script>${ list__Name__ }list__Name__()</script>
  `
}
