import express, { Router } from 'express';

// Controllers
import { addAppointment, getAllAppointments, deleteAppointment, editAppointment, getSelectedAppointment,  getAllAppointmentsCount,
         getAllPending, getAllPendingCount, getAllActive, getAllActiveCount, getAllDone, getAllDoneCount, getAllCancel, getAllCancelCount,
         updateAppointmentState, appointmentReport, getActiveAppointmentByCustomer } from '../controllers/appointment.js';

const router = express.Router();

router.post('/add', addAppointment);
router.get('/getAllAppointments', getAllAppointments);
router.post('/delete', deleteAppointment);
router.post('/edit',editAppointment);
router.post('/updateAppointmentState',updateAppointmentState);
router.post('/getSelectedAppointment',getSelectedAppointment);
router.get('/getAllAppointmentsCount', getAllAppointmentsCount);
router.get('/getAllPending',getAllPending);
router.get('/getAllPendingCount',getAllPendingCount);
router.get('/getAllActive',getAllActive);
router.get('/getAllActiveCount',getAllActiveCount);
router.get('/getAllDone',getAllDone);
router.get('/getAllDoneCount',getAllDoneCount);
router.get('/getAllCancel',getAllCancel);
router.get('/getAllCancelCount',getAllCancelCount);
router.post('/appointmentReport',appointmentReport);
router.post('/getActiveAppointmentByCustomer',getActiveAppointmentByCustomer);


export default router;