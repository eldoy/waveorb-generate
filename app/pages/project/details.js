module.exports = async function($) {

  async function renderProject() {
    var _id = new URLSearchParams(location.search).get('_id')
    var result = await api.action('projectGet', { query: { _id } })
    if (!result || result.error) {
      html('.project-details', /* html */`
        ${ $.t('pages.project.details.issue') }
      `)
    } else {
      html('.project-details', /* html */`
        ${ result.name }
        ${ result._id }
        <a href="${ $.link(`project/edit?_id=${ _id }&from=project/details`) }">
          ${ $.t('pages.project.details.edit') }
        </a>
        <a href="${ $.link(`project/delete?_id=${ _id }&from=project/details`) }">
          ${ $.t('pages.project.details.delete') }
        </a>
      `)
    }
  }

  return /* html */`
    <h1>${ $.t('pages.project.details.title') }</h1>
    <a href="${ $.link('project/list') }">
      ${ $.t('pages.project.details.back') }
    </a>
    <div class="project-details">
      ${ $.t('pages.project.details.loading') }
    </div>
    <script>${ renderProject }renderProject()</script>
  `
}