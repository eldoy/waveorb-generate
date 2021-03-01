module.exports = function(name, names, Name, Names) {
  return `module.exports = async function($) {
  $.page.title = 'New ${name}'

  async function handleSave(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api({ action: '${name}/create', values })
    if (!showErrors(result)) {
      cookie('flash', '${Name} created')
      location = $.link('${name}/list')
    }
    btn.disabled = false
  }

  return /* html */\`
    <h1>New ${name}</h1>
    <form onsubmit="return false">
      <p>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" oninput="clearErrors(this)">
        <em class="name-errors"></em>
      </p>
      <p>
        <button onclick="handleSave(this)">Save</button>
        <a href="\${$.link('${name}/list')}">Cancel</a>
      </p>
    </form>
    <script>
      \${handleSave}
    </script>
  \`
}`
}
