module.exports = async function($) {

  async function list__Name__() {
    var __names__ = await api.action('list__Name')
    if (__names__.length) {
      return /* html */`
        <div>${ __names__.length } __names__</div>
        <ul>
        ${
          __names__.map(function(__name__) {
            return /* html */`
              <li>
                <a href="${ $.link('__names__', __name__._id) }">
                  ${ __name__._id }
                </a>
              </li>
            `
          })
        }
        </ul>
      `
    } else {
      return /* html */`
        <div>${ $.t('pages.__name__.list.empty') }</div>
      `
    }
  }

  return /* html */`
    <h1>${ $.t('pages.__name__.list.title') }</h1>
    ${ await list__Name__() }
    <script>${ list__Name__ };list__Name__()</script>
  `
}
