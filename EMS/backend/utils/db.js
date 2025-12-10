const mysql = require('mysql2')

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeems'
})
conn.connect((err) => {
    if(err){
        console.log("Connection failed")
    }
    else{
        console.log("Connected")
    }
})

module.exports = conn;