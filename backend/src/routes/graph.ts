import express from 'express';
import { getGraphData } from '../controllers/graphController';

const router = express.Router();

router.get('/graph', getGraphData);

export default router;
