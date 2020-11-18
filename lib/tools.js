const fs = require('fs')
const path = require('path')
const sh = require('shelljs')
const pluralize = require('pluralize')

const tools = {}

tools.path = function(name) {
  return path.resolve(path.join(__dirname, '..', name))
}

tools.run = function(command) {
  return sh.exec(command)
}

tools.mkdir = function(...names) {
  return sh.mkdir('-p', ...names)
}

tools.rmdir = function(...names) {
  return sh.rm('-rf', ...names)
}

tools.read = function(name) {
  return fs.readFileSync(name, 'utf-8')
}

tools.write = function(name, content) {
  return fs.writeFileSync(name, content)
}

tools.append = function(name, content) {
  return fs.appendFileSync(name, content)
}

tools.exist = function(name) {
  return fs.existsSync(name)
}

tools.isFile = function(name) {
  return fs.lstatSync(name).isFile()
}

tools.rename = function(from, to) {
  if (tools.exist(from)) {
    return sh.mv(from, to)
  }
}

tools.copyFolder = function(from, to) {
  const name = to.split('/').reverse()[0]
  from = tools.path(from)
  tools.mkdir(to)

  fs.readdirSync(from).forEach(function(item) {
    const [afrom, ato] = [path.join(from, item), path.join(to, item)]
    if (tools.isFile(afrom) && !tools.exist(ato)) {
      tools.write(ato, tools.convert(afrom, name))
    } else {
      tools.copyFolder(afrom, ato, name)
    }
  })
}

tools.convert = function(file, name) {
  let t = tools.read(file)
  if (!name) return t
  const plural = pluralize(name)

  t = t.replace(/__Names__/g, plural[0].toUpperCase() + plural.slice(1))
  t = t.replace(/__names__/g, plural)
  t = t.replace(/__Name__/g, name[0].toUpperCase() + name.slice(1))
  t = t.replace(/__name__/g, name)
  return t
}

module.exports = tools
