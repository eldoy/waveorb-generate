const { api, db, close, login, data, create, update } = require('../../../test-utils.js')

let $db
let $token

describe('__name__/delete', () => {

  afterAll(close)

  beforeEach(async () => {
    $db = await db()
    $token = await login()
  })

  describe('public', () => {
    it('should require login', async () => {
      let result = await api({ action: 'v1/__name__/delete' })
      expect(result.error.message).toBe('login required')
    })
  })

  describe('authenticated', () => {
    it('should not delete a __name__ without query', async () => {
      let result = await api({ action: 'v1/__name__/delete' }, { headers: { authorization: $token } })
      expect(result.error.message).toBe('validation error')
      expect(result.query.id).toEqual(['is required'])
    })

    it('should delete a __name__', async () => {
      let __name__ = await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/delete', query: { id: __name__.id } }, { headers: { authorization: $token } })
      expect(result.n).toEqual(1)
    })
  })
})