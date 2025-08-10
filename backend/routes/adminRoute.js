import express from 'express';

import { addDoc, allDoctors, loginAdmin } from '../controllers/adminController.js';

import upload from '../middlewares/multer.js';
import { authAdmin } from '../middlewares/authadmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoc)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctors',authAdmin,allDoctors)

export default adminRouter;