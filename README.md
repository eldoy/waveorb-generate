# Waveorb generate

This package is part of the [Waveorb Javascript Jamstack web app development framework.](https://waveorb.com)

It is used to generate pages and actions for your web app. The files are meant as a starting point for further development.

Documentation for the generator is [found here.](https://waveorb.com/doc/command-line#generate)

### Usage

To generate both pages and actions for a model, use this command:
`waveorb generate model name`

* input - name:string
* input - mail:email
* input - age:number (Last part is type)
* textarea - bio:text
* checkbox - hobby:check.digging.coding.boxing
* radio - type:radio.red.strong.blue
* select - meal:select.noodle.meat.soup

Minimal validations will be added to actions.

Example:
```sh
waveorb generate model project/task name:select.hei.deg hobby:radio.hunting.barbecue affiliation:check.the_party.freedom
```

The `.`-notation works for select, radio and checkboxes and are the different options.

To generate only pages: `waveorb generate pages name`

To generate only actions: `waveorb generate actions name`

You can rerun the command to overwrite your files.

### Nested resources

Nesting is supported by using name with slash:

`waveorb generate model parent/name`
`waveorb generate model grandparent/parent/name`

It can be infinitely nested.

This adds
- parent ids to pages
  - in form
  - in url
  - in links

### Generate from file

As an example, add a file called `project.yml` to the `models` directory:
```yml
name: user/project
fields:
  name: string
  mail: email
  age: number
  bio: text
  hobby: check.digging.coding.boxing
  type: radio.red.strong.blue
  meal: select.noodle.meat.soup
```

Generate from file:
`waveorb generate file models/project.yml`

Generate all in `models` dir:
`waveorb generate file models`

MIT Licensed. Enjoy!
