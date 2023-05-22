import express, { Router } from 'express';

// Controllers
import { addVehicle, getAllVehicles, getAllVehicleCount,getAllRepairVehicle,getAllDrivingVehicle,getAllAvailableVehicle, deleteVehicle,editVehicle, getSelectedVehicle,getAllavalable,editVehicleState,editVehicleState2} from '../controllers/vehicle.js';

const router = express.Router();

router.post('/add', addVehicle);
router.get('/getAllVehicles', getAllVehicles);
router.post('/delete', deleteVehicle);
router.post('/edit',editVehicle);
router.post('/getSelectedVehicle',getSelectedVehicle);
router.get('/getAllVehicleCount', getAllVehicleCount);
router.get('/getAllavalable', getAllavalable);
router.post('/editVehcleState', editVehicleState);
router.post('/editVehcleState2', editVehicleState2);
router.get('/getAllAvailableCount',getAllAvailableVehicle)
router.get('/getAllDrivingCount',getAllDrivingVehicle)
router.get('/getAllRepairCount',getAllRepairVehicle)

export default router;