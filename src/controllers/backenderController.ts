import type { Request, Response } from 'express'
import { getBackendersDb, registerBackenderDb, updateBackenderDb } from '../models/backenderDb.js'

export const getBackendersCon = async (req: Request, res: Response) => {
  try {
    const result = await getBackendersDb()

    if (!result.success) {
      return res.status(400).json(result)
    }

    return res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}
export const registerBackenderCon = async (req: Request, res: Response) => {
  try {
    const { name, surname, years_of_experience, preference } = req.body

    if (!name|| !surname|| !years_of_experience|| !preference) {
      return res.status(400).json({ success: false, error: 'All fields are required' })
    }

    const result = await registerBackenderDb(name, surname, years_of_experience, preference)

    if (!result.success) {
      return res.status(400).json(result)
    }

    return res.status(201).json(result)
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const updateBackenderCon = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params
    const updates = req.body

    const result = await updateBackenderDb(
      Number(id),
      updates
    )

    if (!result.success) {
      return res.status(400).json(result)
    }

    return res.status(200).json(result)

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      error: error.message
    })

  }
}