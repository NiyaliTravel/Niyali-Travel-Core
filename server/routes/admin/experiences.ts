import express from 'express';
import { verifyJWT, allowRoles } from '../../middleware/auth';
import {
  getExperiences, createExperience, updateExperience, deleteExperience
} from '../../controllers/experiences';

const router = express.Router();
router.use(verifyJWT);

router.get('/', allowRoles('admin', 'editor', 'viewer'), getExperiences);
router.post('/', allowRoles('admin'), createExperience);
router.put('/:id', allowRoles('admin', 'editor'), updateExperience);
router.delete('/:id', allowRoles('admin'), deleteExperience);

export default router;