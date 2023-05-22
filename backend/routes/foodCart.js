import express, { Router } from 'express';

import { addCartItems, getOrdersForSelectedPeriod, getRecordsForAOrder, getOrdersCountForAMonth, 
    getRevenueForAMonth, getRevenueList, getRecordsForAOrderWithImage, getFoodBill } from '../controllers/foodCart.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add', catchAsync(addCartItems));
router.get('/getOrdersForSelectedPeriod/:startDate/:endDate', catchAsync(getOrdersForSelectedPeriod));
router.get('/getRecordsForAOrder/:nic' , catchAsync(getRecordsForAOrder));
router.get('/getRecordsForAOrderWithImage/:nic' , catchAsync(getRecordsForAOrderWithImage));
router.get('/getOrdersCountForAMonth/:month', catchAsync(getOrdersCountForAMonth));
router.get('/getRevenueForAMonth/:month', catchAsync(getRevenueForAMonth));
router.get('/getRevenueList', catchAsync(getRevenueList));
router.post('/getFoodBill', getFoodBill);

export default router;