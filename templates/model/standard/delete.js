module.exports = async function($) {

  var __name__ = await api.action('get__Name__', { _id: $.query._id })

  return /* html */`
    <h1>${ $.t('pages.__name__.delete.title') }</h1>
    <p>${ $.t('pages.__name__.delete.confirm') }</p>
    <form onsubmit="handleDelete();return false">
      <input type="hidden" name="_id" value="${ __name__._id }">
      <button>${ $.t('pages.__name__.delete.button') }</button>
    </form>
  `
}