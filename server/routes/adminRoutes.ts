// import express from 'express';
// import { requireRole } from '../../middleware/auth';
// import {
//   getAtolls,
//   createAtoll,
//   updateAtoll,
//   deleteAtoll,
// } from '../../controllers/admin/atolls';

const router = express.Router();

router.use(requireRole('admin'));

router.get('/', getAtolls);
router.post('/', createAtoll);
router.put('/:id', updateAtoll);
router.delete('/:id', deleteAtoll);

export default router;