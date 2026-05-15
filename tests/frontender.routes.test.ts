import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express from 'express'

// ─── MOCK CONTROLLERS ONLY ───────────────────────────────────
vi.mock('../src/controllers/frontenderController.js', () => ({
  getFrontendersCon: vi.fn((req, res) => res.status(200).json({ success: true })),
  registerFrontenderCon: vi.fn((req, res) => res.status(201).json({ success: true })),
  updateFrontenderCon: vi.fn((req, res) => res.status(200).json({ success: true })),
  deleteFrontenderCon: vi.fn((req, res) => res.status(200).json({ success: true }))
}))

// No auth mock needed
import frontenderRoutes from '../src/routes/frontenderRoute.js'

const app = express()
app.use(express.json())
app.use('/frontender', frontenderRoutes)

describe('Frontender Routes', () => {
  it('GET /frontender route exists', async () => {
    const response = await request(app).get('/frontender')
    expect(response.status).not.toBe(404)
  })

  it('POST /frontender route exists', async () => {
    const response = await request(app).post('/frontender')
    expect(response.status).not.toBe(404)
  })

  it('PATCH /frontender/:id route exists', async () => {
    const response = await request(app).patch('/frontender/1')
    expect(response.status).not.toBe(404)
  })

  it('DELETE /frontender/:id route exists', async () => {
    const response = await request(app).delete('/frontender/1')
    expect(response.status).not.toBe(404)
  })
})