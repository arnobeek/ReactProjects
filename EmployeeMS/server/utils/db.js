const mysql = require("mysql2");

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeems'
})

con.connect(function(err){
    if(err){
        console.error("Connection error:", err);
    }else{
        console.log("Database Connected Successfully");
    }
})

module.exports = con;