import { Router } from 'express';
import { createReservation, getReservations, cancelReservation } from '../controllers/reservationController';

const router = Router();

router.post('/createReservation', createReservation);
router.get('/getReservations', getReservations);
router.put('/cancelReservation/:id', cancelReservation);

export default router;
