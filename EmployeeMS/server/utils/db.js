const mysql = require("mysql2");

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeems'
})

con.connect(function(err){
    if(err){
        console.log("Connection error: ");
    }else{
        console.log("Connected");
    }
})

module.exports = con;