import { Router } from 'express';
import { exportCSV } from '../controllers/exportController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, exportCSV);

export default router;
