import express from 'express';
import { addDoctor } from '../controllers/adminController';
import upload from '../middlewares/multer';

const adminRouter = express.Router();

adminRouter.post('/addDoctor', upload.single('image'), addDoctor )

export default adminRouter;