import express from 'express';
import { getBackendersCon, registerBackenderCon } from '../controllers/backenderController.js';
const router = express.Router();

router.get('/', getBackendersCon);
router.post('/addBackender', registerBackenderCon);
export default router;
// https://localhost:4321/backender          get
// https://localhost:4321/backender/addBackender post
//# sourceMappingURL=backenderRoute.js.map