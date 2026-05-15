import express from 'express'
import { deleteFrontenderCon, getFrontendersCon, registerFrontenderCon, updateFrontenderCon } from '../controllers/frontenderController.js'

const router = express.Router()

router.get('/', getFrontendersCon)
router.post('/', registerFrontenderCon)
router.patch('/:id', updateFrontenderCon)
router.delete('/:id', deleteFrontenderCon)

export default router