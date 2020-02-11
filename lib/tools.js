const fs = require('fs')
const path = require('path')
const sh = require('shelljs')
const pluralize = require('pluralize')

const tools = {}

tools.path = function(name) {
  return path.resolve(path.join(process.cwd(), name))
}

tools.mkdir = function(...names) {
  names = names.map(name => tools.path(name))
  return sh.mkdir('-p', ...names)
}

tools.rmdir = function(...names) {
  names = names.map(name => tools.path(name))
  return sh.rm('-rf', ...names)
}

tools.read = function(name) {
  return fs.readFileSync(tools.path(name), 'utf-8')
}

tools.write = function(name, content) {
  return fs.writeFileSync(tools.path(name), content)
}

tools.exist = function(name) {
  return fs.existsSync(tools.path(name))
}

tools.template = function(file, name) {
  let t = tools.read(`templates/${file}.js`)
  console.log({ name })
  const plural = pluralize(name)

  t = t.replace(/__Names__/g, plural[0].toUpperCase() + plural.slice(1))
  t = t.replace(/__names__/g, plural)
  t = t.replace(/__Name__/g, name[0].toUpperCase() + name.slice(1))
  t = t.replace(/__name__/g, name)
  return t
}

module.exports = tools
