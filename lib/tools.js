const fs = require('fs')
const path = require('path')
const sh = require('shelljs')

const tools = {}

tools.path = function(name) {
  return path.resolve(path.join(process.cwd(), name))
}

tools.mkdir = function(...names) {
  names = names.map(name => tools.path(name))
  return sh.mkdir('-p', ...names)
}

tools.read = function(name) {
  return fs.readFileSync(tools.path(name), 'utf-8')
}

tools.write = function(name, content) {
  return fs.writeFileSync(tools.path(name), content)
}

module.exports = tools
