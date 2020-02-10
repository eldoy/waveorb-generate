module.exports = async function($) {

  var project = await api.action('getProject', { _id: $.query._id })

  return /* html */`
    <h1>${ $.t('pages.project.delete.title') }</h1>
    <p>${ $.t('pages.project.delete.confirm') }</p>
    <form onsubmit="handleDelete();return false">
      <input type="hidden" name="_id" value="${ project._id }">
      <button>${ $.t('pages.project.delete.button') }</button>
    </form>
  `
}