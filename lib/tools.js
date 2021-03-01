const path = require('path')
const extras = require('extras')
const pluralize = require('pluralize')

const tools = {}

tools.copyFolder = function(from, to, name) {
  if (!extras.exist(to)) {
    extras.mkdir(to)
  }
  extras.copy(from, to)

  extras.tree(to).forEach(f => {
    extras.edit(f, content => {
      return tools.convert(content, name)
    })
  })
}

tools.convert = function(t, name) {
  if (!name) return t || ''
  const plural = pluralize(name)
  t = t.replace(/__Names__/g, plural[0].toUpperCase() + plural.slice(1))
  t = t.replace(/__names__/g, plural)
  t = t.replace(/__Name__/g, name[0].toUpperCase() + name.slice(1))
  t = t.replace(/__name__/g, name)

  const dbname = path.basename(process.cwd())
  t = t.replace(/__DBNAME__/g, dbname)

  return t
}

module.exports = tools
