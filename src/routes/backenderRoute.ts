import express from 'express'
import { deleteBackenderCon, getBackendersCon, registerBackenderCon, updateBackenderCon } from '../controllers/backenderController.js'

const router = express.Router()

router.get('/', getBackendersCon)
router.post('/addBackender', registerBackenderCon)
router.patch('/updateBackender/:id', updateBackenderCon)
router.delete('/deleteBackender/:id', deleteBackenderCon)

export default router

// http://localhost:4321/backender/addBackender   post
// http://localhost:4321/backender           get
// http://localhost:4321/backender/1     patch