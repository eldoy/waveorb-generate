module.exports = async function($) {
  $.page.title = 'Show __name__'

  async function render__Name__() {
    var __name__ = await api({ action: 'v1/__name__/get', query: { id } })

    html('#page-__name__-show', /* html */`
      <div class="hq-top">
        <div class="hq-top-title">
          <h1>__Name__: ${esc(__name__.name)}</h1>
          <div class="controls">
            <a class="hq-button -outline-dark" href="${$.link(`__name__/edit?id=${id}`)}">Edit</a>
            <a class="hq-button -outline-dark" href="${$.link(`__name__/delete?id=${id}`)}">Delete</a>
          </div>
        </div>
        <div class="hq-top-back">
          <a class="hq-back" href="${$.link(`__name__/list`)}">
            <img src="/img/icons/angle-left.svg" alt="icon" class="hq-icon">
            <span>Go to __name__ list</span>
          </a>
        </div>
      </div>
      <div class="hq-well">
        <h4>__Name__</h4>
        <p>
          <strong>Name:</strong> ${esc(__name__.name)}
        </p>
      </div>
    `)
  }

  return /* html */`
    <div id="page-__name__-show"></div>
    <script>
      var id = params('id')
      ${render__Name__}
      render__Name__()
    </script>
  `
}
