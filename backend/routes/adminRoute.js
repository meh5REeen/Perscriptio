import express from 'express';

import { addDoc } from '../controllers/adminController.js';

import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',upload.single('image'),addDoc)


export default adminRouter;