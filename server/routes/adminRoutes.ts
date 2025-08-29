import { Router } from 'express';
import { getAtolls, createAtoll, updateAtoll, deleteAtoll } from '../controllers/admin/atolls';
import { authenticateToken, authorizeRoles } from '../middleware/middleware';

const router = Router();

router.use(authenticateToken, authorizeRoles(['admin']));

router.get('/atolls', getAtolls);
router.post('/atolls', createAtoll);
router.put('/atolls/:id', updateAtoll);
router.delete('/atolls/:id', deleteAtoll);

export default router;