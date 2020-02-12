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

tools.replaceIn = function(from, to, name) {
  function replace(dir) {
    fs.readdirSync(dir).forEach(function (f) {
      f = path.join(dir, f)
      if (fs.lstatSync(f).isFile()) {
        fs.writeFileSync(
          f, fs.readFileSync(f, 'utf-8').replace(new RegExp(from, 'g'), to)
        )
      } else {
        replace(f)
      }
    })
  }
  replace(tools.path(name))
}

tools.tree = function(dir) {
  return fs.readdirSync(dir).reduce(function(files, file) {
    const name = path.join(dir, file)
    const list = fs.statSync(name).isDirectory() ? tree(name) : name
    return files.concat(list)
  }, [])
}

tools.copyFolderSync = function(from, to) {
  tools.mkdir(to)
  fs.readdirSync(from).forEach(function(item) {
    const [f, t] = [path.join(from, item), path.join(to, item)]
    fs.lstatSync(f).isFile() ? fs.copyFileSync(f, t) : copyFolderSync(f, t)
  })
}

module.exports = tools
