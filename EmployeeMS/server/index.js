const express = require('express');
const cors = require('cors');
const path = require('path');
const adminrouter = require('./Routes/AdminRoute')

const app = express();


app.use(cors({
    origin:['http://localhost:5173'],
    methods:["GET","POST","PUT"],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/auth', adminrouter);
app.use(express.static('public'))

app.listen(3000, () => console.log("Server is running"));