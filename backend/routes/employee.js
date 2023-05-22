import express, { Router } from 'express';

// Controllers
import { addEmployee, getAllEmployees,getAllVehicleEmployeeCount,getAllKetchenHCount,getAllEmployeesType,getAllContractBaseCount,getAllOfficeSCount,getAllReceptionistsCount,getAllWaitersCount,getAllChefCount, deleteEmployee, editEmployee, getSelectedEmployee,  getAllEmployeesCount, getDrivers, logIn} from '../controllers/employee.js';

const router = express.Router();

router.post('/add', addEmployee);
router.get('/getAllEmployees', getAllEmployees);
router.post('/delete', deleteEmployee);
router.post('/edit',editEmployee);
router.post('/getSelectedEmployee',getSelectedEmployee);
router.get('/getAllEmployeesCount', getAllEmployeesCount);
router.get('/getDrivers', getDrivers);
router.post('/logIn',logIn);
router.get('/getAllVehicleEmployeesCount', getAllVehicleEmployeeCount);
router.get('/getAllCheffsCount', getAllChefCount);
router.get('/getAllKitchenHCount', getAllKetchenHCount);
router.get('/getAllWaitersHCount', getAllWaitersCount);
router.get('/getAllReceptionistsHCount', getAllReceptionistsCount);
router.get('/getAllOfficeSCount', getAllOfficeSCount);
router.get('/getAllContractBaseCount', getAllContractBaseCount);
router.get('/getAllEmployeesType/:type', getAllEmployeesType);

export default router;