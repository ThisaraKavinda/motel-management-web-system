import express, { Router } from 'express';

// Controllers
import { addAppoinmentVehicle, getAllVehicleAppointments, getAllVehicleAppointmentCount,getVehicleAppoinmentForSelectedPeriod,
         getAllDriving,getAllCompleted, deleteVehicleAppointment,editVehicleAppointment,
          getSelectedVehicleAppointment, getVehicleAppointmentBill} from '../controllers/vehicleAppointment.js';

const router = express.Router();

router.post('/add', addAppoinmentVehicle);
router.get('/getAllVehicleAppointment', getAllVehicleAppointments);
router.post('/delete', deleteVehicleAppointment);
router.post('/edit',editVehicleAppointment);
router.post('/getSelectedVehicleAppointment',getSelectedVehicleAppointment);
router.get('/getAllVehicleCount', getAllVehicleAppointmentCount);
router.get('/getAllDriving', getAllDriving);
router.get('/getAllCompleted', getAllCompleted);
router.get('/getnew/:startDate/:endDate', getVehicleAppoinmentForSelectedPeriod);
router.post('/getVehicleAppointmentBill',getVehicleAppointmentBill);
export default router;