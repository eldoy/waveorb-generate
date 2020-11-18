const { api, db, close, login, data, create, update } = require('../../test-utils.js')

let $db
let $token

describe('__name__/count', () => {

  afterAll(close)

  beforeEach(async () => {
    $db = await db()
    $token = await login()
  })

  describe('public', () => {
    it('should count __names__', async () => {
      await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/count' })
      expect(result.n).toBe(1)
    })
  })

  describe('authenticated', () => {
    it('should count __names__', async () => {
      await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/count' }, { headers: { authorization: $token } })
      expect(result.n).toBe(1)
    })
  })
})