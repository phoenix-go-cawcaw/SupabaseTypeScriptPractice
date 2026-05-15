import { describe, it, expect, vi, beforeEach } from "vitest";

// create mock/fake functions once

const mockSingle = vi.fn()
const mockEq = vi.fn().mockReturnThis()
const mockSelect = vi.fn().mockReturnThis()
const mockInsert = vi.fn().mockReturnThis()
const mockUpdate = vi.fn().mockReturnThis()
const mockDelete = vi.fn().mockReturnThis()


// mock Supabase, pretend that you are really targeting the database on Supabase

vi.mock('../src/config/supabase.js', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: mockSelect,
            insert: mockInsert,
            update: mockUpdate,
            delete: mockDelete,
            eq: mockEq,
            single: mockSingle,
        }))
    }
}))

import {getFrontendersDb, registerFrontenderDb, deleteFrontenderDb, updateFrontenderDb} from '../src/models/frontenderDb.js'

// reset mocks before each test
beforeEach(() => {
    vi.clearAllMocks()
    //Reapply mockReturnThis() after clearAllMocks
    mockSelect.mockReturnThis()
    mockInsert.mockReturnThis()
    mockUpdate.mockReturnThis()
    mockDelete.mockReturnThis()
    mockEq.mockReturnThis()
})

//         GET ALL FRONTENDERS

describe('getFrontendersDb', () => {
    it('should return all frontenders successfully', async ()=> {
        // pretend that Supabase returns this
        const mockData = [
            {id: 1, name: 'Joshua', surname:'Jacobs', preference: 'React', exp: 2},
            {id: 2, name: 'Charlton', surname:'Poole', preference: 'Figma', exp: 1}
        ]

        // tell mockSelect what to return when called
        mockSelect.mockResolvedValueOnce({data: mockData, error: null})

        const result = await getFrontendersDb()

        // the getBackendersDb function must return success true and the array
        expect(result.success).toBe(true)
        expect(result.data).toHaveLength(2)
    })

    it('should return error if supabase fails', async () => {
        mockSelect.mockResolvedValueOnce({
            data: null, 
            error: {message: 'Database error'}
        })

        const result = await getFrontendersDb()

        expect(result.success).toBe(false)
        expect(result.error).toBe('Database error')
    })
})

describe('registerFrontenderDb', () => {
    it('should register a frontender successfully', async () => {
        const mockData = {
            id: 3, 
            name: 'Khangelani',
            surname: 'Mhlakane',
            preference: "Vue.js",
            exp: 1
        }

        mockSingle.mockResolvedValueOnce({data: mockData, error: null})

        const result = await registerFrontenderDb('Khangelani', 'Mhlakane', 'Vue.js', 1)

        expect(result.success).toBe(true)
        expect(result.data?.name).toBe('Khangelani')
        expect(result.data?.surname).toBe('Mhlakane')
        expect(result.data?.preference).toBe('Vue.js')
        expect(result.data?.exp).toBe(1)
    })
})

describe('updateFrontenderDb', () => {
  it('should update a frontender successfully', async () => {

    const mockData = {
      id: 3,
      name: 'Siza',
      surname: 'Mpafa',
      preference: 'Angular',
      exp: 3,
    }

    mockSingle.mockResolvedValueOnce({ data: mockData, error: null })

    const result = await updateFrontenderDb(3, { name: 'Siza', surname: 'Mpafa', preference: 'Angular' })

    expect(result.success).toBe(true)
    expect(result.data?.name).toBe('Siza')
    expect(result.data?.surname).toBe('Mpafa')
    expect(result.data?.preference).toBe('Angular')
  })

  it('should return error if update fails', async () => {

    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: 'Update failed' }
    })

    const result = await updateFrontenderDb(99, { name: 'Ghost' })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Update failed')
  })

  it('should return error if no fields provided', async () => {

    const result = await updateFrontenderDb(3, {})

    expect(result.success).toBe(false)
    expect(result.error).toBe('No fields provided for update')
  })
})

describe('deleteFrontenderDb', () => {
  it('should delete a frontender successfully', async () => {

    mockEq.mockResolvedValueOnce({ data: null, error: null })

    const result = await deleteFrontenderDb(12)

    expect(result.success).toBe(true)
    expect(result.message).toBe('frontender deleted successfully')
  })

  it('should return error if delete fails', async () => {

    mockEq.mockResolvedValueOnce({
      data: null,
      error: { message: 'Delete failed' }
    })

    const result = await deleteFrontenderDb(99)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Delete failed')
  })
})