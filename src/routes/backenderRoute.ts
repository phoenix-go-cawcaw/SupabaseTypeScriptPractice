import express from 'express'
import { getBackendersCon, registerBackenderCon, updateBackenderCon } from '../controllers/backenderController.js'

const router = express.Router()

router.get('/', getBackendersCon)
router.patch('/:id', updateBackenderCon)
router.post('/addBackender', registerBackenderCon)

export default router

// http://localhost:4321/backender/addBackender   post
// http://localhost:4321/backender           get
// http://localhost:4321/backender/1     patch