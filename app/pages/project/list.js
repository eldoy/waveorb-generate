module.exports = async function($) {

  async function listProject() {
    var projects = await api.action('projectList')
    if (projects.length) {
      html('.project-list', /* html */`
        <div>
          ${ projects.length }
          ${ $.t('pages.project.list.count') }
        </div>
        <ul>
        ${
          projects.map(function(project) {
            return /* html */`
              <li>
                <a href="${ $.link(`project/details?_id=${ project._id }`) }">
                  ${ project.name }
                  ${ project._id }
                </a>
                <a href="${ $.link(`project/edit?_id=${ project._id }`) }">
                  ${ $.t('pages.project.list.edit') }
                </a>
                <a href="${ $.link(`project/delete?_id=${ project._id }`) }">
                  ${ $.t('pages.project.list.delete') }
                </a>
              </li>
            `
          }).join('')
        }
        </ul>
      `)
    } else {
      html('.project-list', /* html */`
        <div>${ $.t('pages.project.list.empty') }</div>
      `)
    }
  }

  return /* html */`
    <h1>${ $.t('pages.project.list.title') }</h1>
    <a href="${ $.link('project/new') }">
      <button>
        ${ $.t('pages.project.list.new') }
      </button>
    </a>
    <div class="project-list">
      ${ $.t('pages.project.list.loading') }
    </div>
    <script>${ listProject }listProject()</script>
  `
}
