import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authRoutes.js' 
import 'dotenv/config'

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    methods:['POST','GET'],
    withCredentials: true
}));
app.use(express.json());

app.use('/auth', authRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})