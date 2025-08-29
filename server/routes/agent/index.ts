import express from 'express';
import { allowRoles } from '../../middleware/auth';
import {
  getGuesthouses,
  createBooking,
  getAgentBookings,
  updateBooking,
} from '../../controllers/agent';

const router = express.Router();
router.use(allowRoles('agent'));

router.get('/guesthouses', getGuesthouses);
router.post('/bookings', createBooking);
router.get('/bookings', getAgentBookings);
router.put('/bookings/:id', updateBooking);

export default router;