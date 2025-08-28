import express from 'express';
import { verifyJWT, allowRoles } from '../../middleware/auth';
import {
  getGuestHouses, createGuestHouse, updateGuestHouse, deleteGuestHouse
} from '../../controllers/guesthouses';

const router = express.Router();
router.use(verifyJWT);

router.get('/', allowRoles('admin', 'editor', 'viewer'), getGuestHouses);
router.post('/', allowRoles('admin'), createGuestHouse);
router.put('/:id', allowRoles('admin', 'editor'), updateGuestHouse);
router.delete('/:id', allowRoles('admin'), deleteGuestHouse);

export default router;