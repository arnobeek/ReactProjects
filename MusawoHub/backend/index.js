import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js'; 
import coneectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

const app = express();
const port = process.env.PORT || 3000
connectDB()
coneectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin/',adminRouter);
//localhost:3000/api/admin/addDoctor

app.get('/', (req,res) => {
    res.send('API WORKING')
})

app.listen(3000, () => {
    console.log("Server is running!",port);
})