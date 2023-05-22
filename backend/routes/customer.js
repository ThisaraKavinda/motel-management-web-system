import express, { Router } from 'express';

// Controllers
import { addCustomer, getAllCustomers, deleteCustomer, editCustomer, getSelectedCustomer,  getAllCustomersCount, logIn, getSelectedCustomerByNic} from '../controllers/customer.js';

const router = express.Router();

router.post('/add', addCustomer);
router.get('/getAllCustomers', getAllCustomers);
router.post('/delete', deleteCustomer);
router.post('/edit',editCustomer);
router.post('/getSelectedCustomer',getSelectedCustomer);
router.get('/getSelectedCustomerByNic/:nic',getSelectedCustomerByNic);
router.get('/getAllCustomersCount', getAllCustomersCount);
router.post('/logIn',logIn);

export default router;