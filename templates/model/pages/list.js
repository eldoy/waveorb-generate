module.exports = async function($) {
  $.page.title = '__Name__ list'

  function setPage(n) {
    var link = $.link(`__name__/list`)
    location = link + (n < 2 ? '' : `&page=${n}`)
  }

  function handleSearch(button) {
    store('__name__-search', serialize(button.form))
    setPage(1)
  }

  function handleReset() {
    store('__name__-search', null)
    setPage(1)
  }

  async function render__Name__List() {
    html('#page-__name__-list', /* html */`
      <div class="hq-well">
        <label>__Names__</label>
        <div class="hq-help">
          <a onclick="this.parentNode.classList.toggle('open')">
            <img src="/img/icons/help.svg" alt="help" class="hq-icon">
          </a>
          <div class="hq-help-content">
           <p>__Name__ help text missing!</p>
          </div>
        </div>

        <form onsubmit="return false">
          <div class="search">
           <input type="text" name="term" value="${esc(search.term)}" >
           <button aria-label="Search" class="hq-button -search" onclick="handleSearch(this)">
             <img src="/img/icons/search.svg" alt="icon" class="search-icon hq-icon">
           </button>
           ${function(){
            if(search.term) {
              return `
                <button aria-label="Reset" class="-reset" title="Reset" href="#" onclick="return handleReset()">
                  <img src="/img/icons/close-danger.svg" alt="icon" class="reset-icon hq-icon">
                </button>
              `
             }
             return ''
           }()}
          </div>
          <div class="search-filters">
            Sort:
            <select name="sort">
              <option value="created_at"${search.sort == 'created_at' ? ' selected' : ''}>Created at</option>
              <option value="name"${search.sort == 'name' ? ' selected' : ''}>Name</option>
            </select>
            <select data-type="number" name="direction">
              <option value="-1"${search.direction == -1 ? ' selected' : ''}>Desc</option>
              <option value="1"${search.direction == 1 ? ' selected' : ''}>Asc</option>
            </select>
          </div>
        </form>
        <div class="hq-list-result"></div>
      </div>
    `)
    render__Names__()
  }

  async function render__Names__() {
    var query = {}
    if (search.term) {
      query.name = `%r/${search.term}/i`
    }

    var limit = 10
    var skip = (page - 1) * limit
    var sort = { [search.sort || 'created_at']: search.direction || -1 }

    var __names__ = await api({ action: 'v1/__name__/find', query, sort, limit, skip })

    if (!__names__.length) {
      if (!search.term) {
        return html('.hq-list-result', `
          <div class="hq-empty-state">
            <h5>What are __Names__?</h5>
            <p>
              Each campaign belongs to a __name__. Create a __name__ now and add it to your campaigns.
            </p>
          </div>
        `)
      }
      return text('.hq-list-result', 'No __names__ found...')
    }

    html('.hq-list-result', /* html */`
      ${__names__.map(function(__name__) {

        return /* html */`
          <div class="hq-list-item">
            <div class="hq-item-links">
              <a href="${$.link(`__name__/show?id=${__name__.id}`)}">${esc(__name__.name)}</a>
            </div>
            <div class="hq-item-controls">
              <a class="hq-button -outline-dark" href="${$.link(`__name__/edit?id=${__name__.id}`)}">Edit</a>
              <a class="hq-button -outline-dark" href="${$.link(`__name__/delete?id=${__name__.id}`)}">Delete</a>
            </div>
          </div>
        `
      }).join('')}

      ${function() {
        if (page == 1 && __names__.length < limit) return ''
        return /* html */`
          <div class="hq-pagination">
            <a${page == 1 ? '' : ` href="#" onclick="return setPage(${page - 1})"`}>Previous</a>
            |
            <a${__names__.length < limit ? '' : ` href="#" onclick="return setPage(${page + 1})"`}>Next</a>
          </div>
        `
      }()}
    `)
  }

  return /* html */`
    <div id="page-__name__-list"></div>
    <script>
      var page = parseInt(params('page') || 1)
      var search = store('__name__-search') || {}
      ${setPage}
      ${handleSearch}
      ${handleReset}
      ${render__Names__}
      ${render__Name__List}
      render__Name__List()
    </script>
  `
}
