import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

router.get('/', AdminControllers.getAllAdmins);

export const AdminRoutes = router;
