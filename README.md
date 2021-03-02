# Waveorb generate

This package is part of the [Waveorb Javascript Jamstack web app development framework.](https://waveorb.com)

It is used to generate CRUD files and actions for your application.

Documentation for the generator is [found here.](https://waveorb.com/doc/command-line.html#generate)

### Usage

`waveorb generate model name`

input: name:string
input: mail:email
input: age:number (Last part is type)
textarea: bio:text
checkbox: hobby:check.digging.coding.boxing
radio: type:radio.red.strong.blue
select: meal:select.noodle.meat.soup

In actions use validations
- required true in create

Nesting is supported by using name with slash:

`waveorb generate model parent/name`
`waveorb generate model grandparent/parent/name`

It can be infinitely nested

This adds
- parent ids to pages
  - in form
  - in url
  - in links
- parent ids to create action validation

This can be translated to yml added to `models` directory:

`project.yml`
name: user/project
fields:
  name: string
  mail: email
  age: number
  bio: text
  hobby: check.digging.coding.boxing
  type:radio.red.strong.blue
  meal:select.noodle.meat.soup
