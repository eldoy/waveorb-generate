const { api, db, close, login, data, create, update } = require('../../../test-utils.js')

let $db
let $token

describe('__name__/find', () => {

  afterAll(close)

  beforeEach(async () => {
    $db = await db()
    $token = await login()
  })

  describe('public', () => {
    it('should find __names__', async () => {
      await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/find' })
      expect(result[0].name).toBe('Hello')
    })
  })

  describe('authenticated', () => {
    it('should find __names__', async () => {
      await $db('__name__').create({ name: 'Hello' })
      let result = await api({ action: 'v1/__name__/find' }, { headers: { authorization: $token } })
      expect(result[0].name).toBe('Hello')
    })
  })

  describe('options', () => {
    it('should support fields option', async () => {
      await create('__name__', { site_id: data.fakeid, name: 'hello' })

      let result = await api({ action: 'v1/__name__/find', fields: { name: 0 }}, { headers: { authorization: $token } })
      expect(result[0].id).toBeDefined()
      expect(result[0].name).toBeUndefined()

      result = await api({ action: 'v1/__name__/find', fields: { name: 1 }}, { headers: { authorization: $token } })
      expect(result[0].id).toBeDefined()
      expect(result[0].name).toBeDefined()
    })

    it('should support sorting', async () => {
      const c1 = await create('__name__', { site_id: data.fakeid, name: 'abs' })
      const c2 = await create('__name__', { site_id: data.fakeid, name: 'bye' })

      let result = await api({ action: 'v1/__name__/find' }, { headers: { authorization: $token } })

      expect(result[0].id).toBe(c1.id)
      expect(result[1].id).toBe(c2.id)

      result = await api({ action: 'v1/__name__/find', sort: { name: 1 } }, { headers: { authorization: $token } })

      expect(result[0].id).toBe(c1.id)
      expect(result[1].id).toBe(c2.id)

      result = await api({ action: 'v1/__name__/find', sort: { name: -1 } }, { headers: { authorization: $token } })

      expect(result[0].id).toBe(c2.id)
      expect(result[1].id).toBe(c1.id)
    })

    it('should support skip', async () => {
      const c1 = await create('__name__', { site_id: data.fakeid, name: 'abs' })
      const c2 = await create('__name__', { site_id: data.fakeid, name: 'bye' })
      const c3 = await create('__name__', { site_id: data.fakeid, name: 'eiy' })
      const c4 = await create('__name__', { site_id: data.fakeid, name: 'fay' })

      let result = await api({ action: 'v1/__name__/find', skip: 1 }, { headers: { authorization: $token } })

      expect(result[0].id).toBe(c2.id)
    })

    it('should support limit', async () => {
      const c1 = await create('__name__', { site_id: data.fakeid, name: 'abs' })
      const c2 = await create('__name__', { site_id: data.fakeid, name: 'bye' })
      const c3 = await create('__name__', { site_id: data.fakeid, name: 'eiy' })
      const c4 = await create('__name__', { site_id: data.fakeid, name: 'fay' })

      let result = await api({ action: 'v1/__name__/find', limit: 2 }, { headers: { authorization: $token } })

      expect(result.length).toEqual(2)
      expect(result[0].id).toBe(c1.id)
      expect(result[1].id).toBe(c2.id)
    })
  })
})