module.exports = async function($) {

  async function listProject() {
    var projects = await api.action('list__Name')
    if (projects.length) {
      return /* html */`
        <div>${ projects.length } projects</div>
        <ul>
        ${
          projects.map(function(project) {
            return /* html */`
              <li>
                <a href="${ $.link('projects', project._id) }">
                  ${ project._id }
                </a>
              </li>
            `
          })
        }
        </ul>
      `
    } else {
      return /* html */`
        <div>${ $.t('pages.project.list.empty') }</div>
      `
    }
  }

  return /* html */`
    <h1>${ $.t('pages.project.list.title') }</h1>
    ${ await listProject() }
    <script>${ listProject };listProject()</script>
  `
}
