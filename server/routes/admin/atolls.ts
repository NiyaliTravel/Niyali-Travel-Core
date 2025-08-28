import express from 'express';
import { verifyJWT, allowRoles } from '../../middleware/auth';
import {
  getAtolls, createAtoll, updateAtoll, deleteAtoll
} from '../../controllers/atolls';

const router = express.Router();
router.use(verifyJWT);

router.get('/', allowRoles('admin', 'editor', 'viewer'), getAtolls);
router.post('/', allowRoles('admin'), createAtoll);
router.put('/:id', allowRoles('admin', 'editor'), updateAtoll);
router.delete('/:id', allowRoles('admin'), deleteAtoll);

export default router;