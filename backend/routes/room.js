import express, { Router } from 'express';

// Controllers
import { addRoom, getRooms, updateRoomState, updateRoomStateDone, getAllRooms, getRoomBill } from '../controllers/room.js';

const router = express.Router();

router.post('/add', addRoom);
router.get('/getRooms',getRooms);
router.get('/getAllRooms', getAllRooms)
router.post('/updateRoomState', updateRoomState);
router.post('/updateRoomStateDone', updateRoomStateDone);
router.post('/getRoomBill', getRoomBill);


export default router;