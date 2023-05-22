import express, { Router } from 'express';

import { addFood, getAllFoods, getFoods, deleteFood, editFood, getNumOfFoods } from '../controllers/food.js';
import { getCategories } from '../controllers/foodCategory.js';
import {catchAsync} from '../utils/catchAsync.js';

import multer from 'multer';
import { storage } from '../cloudinary/index.js';
const upload = multer({ storage });

const router = express.Router();

router.post('/add', upload.single("image"), catchAsync(addFood));
router.get('/getCategories/:type', catchAsync(getCategories));
router.get('/getAllFoods', catchAsync(getAllFoods));
router.get('/getFoods/:type', catchAsync(getFoods));
router.get('/deleteFood/:id', catchAsync(deleteFood));
router.get('/getNumOfFoods', catchAsync(getNumOfFoods));
router.post('/editFood/:id',  catchAsync(editFood));

export default router;