const { api, db, close, login, data, create, update } = require('../../test-utils.js')

let $db
let $token

describe('__name__/get', () => {

  afterAll(close)

  beforeEach(async () => {
    $db = await db()
    $token = await login()
  })

  describe('public', () => {
    it('should get __names__', async () => {
      await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/get' })
      expect(result.name).toBe('Hello')
    })
  })

  describe('authenticated', () => {
    it('should get __names__', async () => {
      await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/get' }, { headers: { authorization: $token } })
      expect(result.name).toBe('Hello')
    })
  })
})