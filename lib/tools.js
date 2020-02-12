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
  return fs.existsSync(name)
}

tools.rename = function(from, to) {
  return sh.mv(from, to)
}

tools.copyFolder = function(from, to, name) {
  tools.mkdir(to)
  fs.readdirSync(from).forEach(function(item) {
    const [afrom, ato] = [path.join(from, item), path.join(to, item)]
    if (fs.lstatSync(afrom).isFile()) {
      console.log(ato)
      console.log(tools.exist(ato))
      if (!tools.exist(ato)) {
        tools.write(ato, tools.convert(afrom, name))
        // fs.copyFileSync(afrom, ato)
      }
    } else {
      tools.copyFolder(afrom, ato, name)
    }
  })
}

tools.convert = function(file, name) {
  let t = tools.read(file)
  console.log({ name })
  const plural = pluralize(name)

  t = t.replace(/__Names__/g, plural[0].toUpperCase() + plural.slice(1))
  t = t.replace(/__names__/g, plural)
  t = t.replace(/__Name__/g, name[0].toUpperCase() + name.slice(1))
  t = t.replace(/__name__/g, name)
  return t
}


module.exports = tools
