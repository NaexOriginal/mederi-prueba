import { Router } from 'express';
import { createRoom, getRooms, updateRoom, deleteRoom } from '../controllers/meetingRoomController';

const router = Router();

router.post('/createRoom', createRoom);
router.get('/getRooms', getRooms);
router.put('/updateRoom/:id', updateRoom);
router.delete('/deleteRoom/:id', deleteRoom);

export default router;
