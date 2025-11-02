const express = require('express');
const cors = require('cors');
const adminrouter = require('./Routes/AdminRoute')

const app = express();


app.use(cors({
    origin:['http://localhost:5173'],
    methods:["GET","POST","PUT"],
    credentials:true
}));
app.use(express.json());
app.use('/auth', adminrouter);

app.listen(3000, () => console.log("Server is running"));