const express = require('express');
const app = express();
const cors = require('cors')
const adminRouter = require('./Routes/AdminRoute.js')

app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'))
app.use('/auth', adminRouter)

app.listen(3000, () => {
    console.log("Server is running!")
})
