module.exports = async function($) {

  async function listTask() {
    var tasks = await api.action('list__Name')
    if (tasks.length) {
      return /* html */`
        <div>${ tasks.length } tasks</div>
        <ul>
        ${
          tasks.map(function(task) {
            return /* html */`
              <li>
                <a href="${ $.link('tasks', task._id) }">
                  ${ task._id }
                </a>
              </li>
            `
          })
        }
        </ul>
      `
    } else {
      return /* html */`
        <div>${ $.t('pages.task.list.empty') }</div>
      `
    }
  }

  return /* html */`
    <h1>${ $.t('pages.task.list.title') }</h1>
    ${ await listTask() }
    <script>${ listTask };listTask()</script>
  `
}
