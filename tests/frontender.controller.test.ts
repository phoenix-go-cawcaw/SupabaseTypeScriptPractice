import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

// ─── MOCK THE MODEL ──────────────────────────────────────────
vi.mock('../src/models/frontenderDb.js', () => ({
  getFrontendersDb: vi.fn(),
  registerFrontenderDb: vi.fn(),
  updateFrontenderDb: vi.fn(),
  deleteFrontenderDb: vi.fn()
}))

import { getFrontendersDb, registerFrontenderDb, updateFrontenderDb, deleteFrontenderDb } from '../src/models/frontenderDb.js'
import { getFrontendersCon, registerFrontenderCon, updateFrontenderCon, deleteFrontenderCon } from '../src/controllers/frontenderController.js'

// ─── MINI EXPRESS APP ────────────────────────────────────────
const app = express()
app.use(express.json())

app.get('/frontender', getFrontendersCon)
app.post('/frontender', registerFrontenderCon)
app.patch('/frontender/:id', updateFrontenderCon)
app.delete('/frontender/:id', deleteFrontenderCon)

beforeEach(() => {
  vi.clearAllMocks()
})

// ─── GET ALL ─────────────────────────────────────────────────
describe('getFrontendersCon', () => {

  it('should return 200 with all frontenders', async () => {
    vi.mocked(getFrontendersDb).mockResolvedValueOnce({
      success: true,
      data: [
        { id: 1, name: 'Joshua', surname: 'Jacobs', preference: 'React', exp: 2 },
        { id: 2, name: 'Charlton', surname: 'Poole', preference: 'Figma', exp: 1 }
      ]
    })

    const response = await request(app).get('/frontender')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveLength(2)
  })

  it('should return 400 when model returns error', async () => {
    vi.mocked(getFrontendersDb).mockResolvedValueOnce({
      success: false,
      error: 'Failed to fetch'
    })

    const response = await request(app).get('/frontender')

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBe('Failed to fetch')
  })

  it('should return 500 on unexpected crash', async () => {
    vi.mocked(getFrontendersDb).mockRejectedValueOnce(new Error('Unexpected crash'))

    const response = await request(app).get('/frontender')

    expect(response.status).toBe(500)
    expect(response.body.success).toBe(false)
  })
})

// ─── REGISTER ────────────────────────────────────────────────
describe('registerFrontenderCon', () => {

  it('should return 201 on successful registration', async () => {
    vi.mocked(registerFrontenderDb).mockResolvedValueOnce({
      success: true,
      data: { id: 3, name: 'Khangelani', surname: 'Mhlakane', preference: 'Vue.js', exp: 1 }
    })

    const response = await request(app)
      .post('/frontender')
      .send({ name: 'Khangelani', surname: 'Mhlakane', preference: 'Vue.js', exp: 1 })

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.data.name).toBe('Khangelani')
  })

  it('should return 400 when required fields are missing', async () => {
    const response = await request(app)
      .post('/frontender')
      .send({ name: 'Khangelani' })  // missing surname, preference, exp

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBe('All fields are required')
  })

  it('should return 400 when model returns error', async () => {
    vi.mocked(registerFrontenderDb).mockResolvedValueOnce({
      success: false,
      error: 'Registration failed'
    })

    const response = await request(app)
      .post('/frontender')
      .send({ name: 'Khangelani', surname: 'Mhlakane', preference: 'Vue.js', exp: 1 })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Registration failed')
  })

  it('should return 500 on unexpected crash', async () => {
    vi.mocked(registerFrontenderDb).mockRejectedValueOnce(new Error('Unexpected crash'))

    const response = await request(app)
      .post('/frontender')
      .send({ name: 'Khangelani', surname: 'Mhlakane', preference: 'Vue.js', exp: 1 })

    expect(response.status).toBe(500)
    expect(response.body.success).toBe(false)
  })
})

// ─── UPDATE ──────────────────────────────────────────────────
describe('updateFrontenderCon', () => {

  it('should return 200 on successful update', async () => {
    vi.mocked(updateFrontenderDb).mockResolvedValueOnce({
      success: true,
      data: { id: 3, name: 'Siza', surname: 'Mpafa', preference: 'Angular', exp: 3 }
    })

    const response = await request(app)
      .patch('/frontender/3')
      .send({ name: 'Siza', preference: 'Angular' })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.name).toBe('Siza')
  })

  it('should return 400 when model returns error', async () => {
    vi.mocked(updateFrontenderDb).mockResolvedValueOnce({
      success: false,
      error: 'Update failed'
    })

    const response = await request(app)
      .patch('/frontender/99')
      .send({ name: 'Ghost' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Update failed')
  })

  it('should return 500 on unexpected crash', async () => {
    vi.mocked(updateFrontenderDb).mockRejectedValueOnce(new Error('Unexpected crash'))

    const response = await request(app)
      .patch('/frontender/3')
      .send({ name: 'Siza' })

    expect(response.status).toBe(500)
    expect(response.body.success).toBe(false)
  })
})

// ─── DELETE ──────────────────────────────────────────────────
describe('deleteFrontenderCon', () => {

  it('should return 200 on successful delete', async () => {
    vi.mocked(deleteFrontenderDb).mockResolvedValueOnce({
      success: true,
      message: 'frontender deleted successfully'
    })

    const response = await request(app).delete('/frontender/3')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('frontender deleted successfully')
  })

  it('should return 400 when model returns error', async () => {
    vi.mocked(deleteFrontenderDb).mockResolvedValueOnce({
      success: false,
      error: 'Delete failed'
    })

    const response = await request(app).delete('/frontender/99')

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Delete failed')
  })

  it('should return 500 on unexpected crash', async () => {
    vi.mocked(deleteFrontenderDb).mockRejectedValueOnce(new Error('Unexpected crash'))

    const response = await request(app).delete('/frontender/3')

    expect(response.status).toBe(500)
    expect(response.body.success).toBe(false)
  })
})