import { describe, it, expect, vi, beforeEach } from 'vitest'

// Create mock functions once
const mockSingle = vi.fn()
const mockEq = vi.fn().mockReturnThis()
const mockSelect = vi.fn().mockReturnThis()
const mockInsert = vi.fn().mockReturnThis()
const mockUpdate = vi.fn().mockReturnThis()
const mockDelete = vi.fn().mockReturnThis()

// Mock Supabase
vi.mock('../src/config/supabase.js', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
      eq: mockEq,
      single: mockSingle
    }))
  }
}))

import { getBackendersDb, registerBackenderDb, deleteBackenderDb, updateBackenderDb } from '../src/models/backenderDb.js'

beforeEach(() => {
  vi.clearAllMocks()
  // Re-apply mockReturnThis after clearAllMocks
  mockSelect.mockReturnThis()
  mockInsert.mockReturnThis()
  mockUpdate.mockReturnThis()
  mockDelete.mockReturnThis()
  mockEq.mockReturnThis()
})

// ─── GET ALL ─────────────────────────────────────────────────
describe('getBackendersDb', () => {
  it('should return all backenders successfully', async () => {

    const mockData = [
      { id: 1, name: 'Siza', surname: 'Mpafa', years_of_experience: 3, preference: 'Ruby On Rails' },
      { id: 2, name: 'Emihle', surname: 'Dumo', years_of_experience: 1, preference: 'Node.js' }
    ]

    mockSelect.mockResolvedValueOnce({ data: mockData, error: null })

    const result = await getBackendersDb()

    expect(result.success).toBe(true)
    expect(result.data).toHaveLength(2)
  })

  it('should return error if supabase fails', async () => {

    mockSelect.mockResolvedValueOnce({
      data: null,
      error: { message: 'Database error' }
    })

    const result = await getBackendersDb()

    expect(result.success).toBe(false)
    expect(result.error).toBe('Database error')
  })
})

// ─── REGISTER ────────────────────────────────────────────────
describe('registerBackenderDb', () => {
  it('should register a new backender successfully', async () => {

    const mockData = {
      id: 13,
      name: 'Onke',
      surname: 'Jada',
      years_of_experience: 3,
      preference: 'Csharp'
    }

    mockSingle.mockResolvedValueOnce({ data: mockData, error: null })

    const result = await registerBackenderDb('Onke', 'Jada', 3, 'Csharp')

    expect(result.success).toBe(true)
    expect(result.data?.name).toBe('Onke')
  })
})

// ─── UPDATE ──────────────────────────────────────────────────
describe('updateBackenderDb', () => {
  it('should update a backender successfully', async () => {

    const mockData = {
      id: 12,
      name: 'Supa',
      surname: 'Base',
      years_of_experience: 1,
      preference: 'Supabase'
    }

    mockSingle.mockResolvedValueOnce({ data: mockData, error: null })

    const result = await updateBackenderDb(12, { name: 'Supa', surname: 'Base', preference: 'Supabase' })

    expect(result.success).toBe(true)
    expect(result.data?.name).toBe('Supa')
  })

  it('should return error if update fails', async () => {

    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: 'Update failed' }
    })

    const result = await updateBackenderDb(99, { name: 'Ghost' })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Update failed')
  })

  it('should return error if no fields provided', async () => {

    const result = await updateBackenderDb(12, {})

    expect(result.success).toBe(false)
    expect(result.error).toBe('No fields provided for update')
  })
})

// ─── DELETE ──────────────────────────────────────────────────
describe('deleteBackenderDb', () => {
  it('should delete a backender successfully', async () => {

    mockEq.mockResolvedValueOnce({ data: null, error: null })

    const result = await deleteBackenderDb(12)

    expect(result.success).toBe(true)
    expect(result.message).toBe('Backender deleted successfully')
  })

  it('should return error if delete fails', async () => {

    mockEq.mockResolvedValueOnce({
      data: null,
      error: { message: 'Delete failed' }
    })

    const result = await deleteBackenderDb(99)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Delete failed')
  })
})