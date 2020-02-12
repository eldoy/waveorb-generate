const template = {}

template.convert = function(file, name) {
  let t = tools.read(`templates/${file}.js`)
  console.log({ name })
  const plural = pluralize(name)

  t = t.replace(/__Names__/g, plural[0].toUpperCase() + plural.slice(1))
  t = t.replace(/__names__/g, plural)
  t = t.replace(/__Name__/g, name[0].toUpperCase() + name.slice(1))
  t = t.replace(/__name__/g, name)
  return t
}

module.exports = template