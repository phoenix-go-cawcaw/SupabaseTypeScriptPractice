import type { Request, Response } from 'express'
import { deleteFrontenderDb, getFrontendersDb, registerFrontenderDb, updateFrontenderDb } from '../models/frontenderDb.js'

export const getFrontendersCon = async (req: Request, res: Response) => {
  try {
    const result = await getFrontendersDb()

    if (!result.success) {
      return res.status(400).json(result)
    }

    return res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const registerFrontenderCon = async (req: Request, res: Response) =>{
      try {
        const { name, surname, preference, exp } = req.body
    
        if (!name|| !surname|| !exp|| !preference) {
          return res.status(400).json({ success: false, error: 'All fields are required' })
        }
    
        const result = await registerFrontenderDb(name, surname, exp, preference)
    
        if (!result.success) {
          return res.status(400).json(result)
        }
    
        return res.status(201).json(result)
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message })
      }
}
export const updateFrontenderCon = async (req: Request, res: Response) =>{
      try {
    
        const { id } = req.params
        const updates = req.body
    
        const result = await updateFrontenderDb(
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
export const deleteFrontenderCon = async (req: Request, res: Response) =>{
      try {
        const { id } = req.params
    
        const result = await deleteFrontenderDb(Number(id))
    
        if (!result.success) {
          return res.status(400).json(result)
        }
    
        return res.status(200).json(result)
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message })
      }
}