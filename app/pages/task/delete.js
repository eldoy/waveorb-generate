module.exports = async function($) {

  var task = await api.action('getTask', { _id: $.query._id })

  return /* html */`
    <h1>${ $.t('pages.task.delete.title') }</h1>
    <p>${ $.t('pages.task.delete.confirm') }</p>
    <form onsubmit="handleDelete();return false">
      <input type="hidden" name="_id" value="${ task._id }">
      <button>${ $.t('pages.task.delete.button') }</button>
    </form>
  `
}