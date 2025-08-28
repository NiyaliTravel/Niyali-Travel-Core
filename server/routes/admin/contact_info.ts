import express from 'express';
import { verifyJWT, allowRoles } from '../../middleware/auth';
import {
  getContactInfo, updateContactInfo
} from '../../controllers/contact_info';

const router = express.Router();
router.use(verifyJWT);

router.get('/', allowRoles('admin', 'editor', 'viewer'), getContactInfo);
router.put('/', allowRoles('admin', 'editor'), updateContactInfo);

export default router;