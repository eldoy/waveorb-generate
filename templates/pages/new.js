module.exports = function({ base, Name }) {
  return `module.exports = async function($) {
  $.page.title = 'New ${base}'

  async function handleSave(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api({ action: '${base}/create', values })
    if (!showErrors(result)) {
      cookie('flash', '${Name} created')
      location = $.link('${base}/list')
    }
    btn.disabled = false
  }

  return /* html */\`
    <h1>New ${base}</h1>
    <form onsubmit="return false">
      <p>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" oninput="clearErrors(this)">
        <em class="name-errors"></em>
      </p>
      <p>
        <button onclick="handleSave(this)">Save</button>
        <a href="\${$.link('${base}/list')}">Cancel</a>
      </p>
    </form>
    <script>
      \${handleSave}
    </script>
  \`
}`
}
