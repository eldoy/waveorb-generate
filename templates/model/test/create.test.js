const { api, db, close, login, data, create, update } = require('../../../test-utils.js')

let $db
let $token

describe('__name__/create', () => {

  afterAll(close)

  beforeEach(async () => {
    $db = await db()
    $token = await login()
  })

  describe('public', () => {
    it('should require login', async () => {
      let result = await api({ action: 'v1/__name__/create' })
      expect(result.error.message).toBe('login required')
    })
  })

  describe('authenticated', () => {
    it('should not create a __name__ without values', async () => {
      let result = await api({ action: 'v1/__name__/create' }, { headers: { authorization: $token } })
      expect(result.error.message).toBe('validation error')
      expect(result.values.name).toEqual(['is required'])
      expect(result.values.site_id).toEqual(['is required'])
    })

    it('should not create a __name__ with short name', async () => {
      let result = await api({ action: 'v1/__name__/create', values: { site_id: data.fakeid, name: 'h' } }, { headers: { authorization: $token } })
      expect(result.error.message).toBe('validation error')
      expect(result.values.name).toEqual(['minimum length is 3'])
    })

    it('should create a __name__', async () => {
      let result = await api({ action: 'v1/__name__/create', values: { site_id: data.fakeid, name:'Hello' } }, { headers: { authorization: $token } })
      expect(result.id).toBeDefined()

      let __name__ = await $db('__name__').get({ id: result.id })
      expect(__name__.account_id).toBeDefined()
      expect(__name__.site_id).toEqual(data.fakeid)
    })
  })
})