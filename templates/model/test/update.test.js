const { api, db, close, login, data, create, update } = require('../../../test-utils.js')

let $db
let $token

describe('__name__/update', () => {

  afterAll(close)

  beforeEach(async () => {
    $db = await db()
    $token = await login()
  })

  describe('public', () => {
    it('should require login', async () => {
      let result = await api({ action: 'v1/__name__/update' })
      expect(result.error.message).toBe('login required')
    })
  })

  describe('authenticated', () => {
    it('should not update a __name__ without values', async () => {
      let result = await api({ action: 'v1/__name__/update' }, { headers: { authorization: $token } })
      expect(result.error.message).toBe('validation error')
      expect(result.query.id).toEqual(['is required'])
      expect(result.values.name).toEqual(['is required'])
    })

    it('should not update a __name__ with short name', async () => {
      let result = await api({ action: 'v1/__name__/update', query: { id: data.fakeid }, values: { name: 'h' } }, { headers: { authorization: $token } })
      expect(result.error.message).toBe('validation error')
      expect(result.values.name).toEqual(['minimum length is 3'])
    })

    it('should update a __name__', async () => {
      let __name__ = await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/update', query: { id: __name__.id }, values: { name: 'Bye' } }, { headers: { authorization: $token } })
      expect(result.n).toEqual(1)
    })
  })
})