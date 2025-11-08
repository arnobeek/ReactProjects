const express = require("express");
const con = require('../utils/db')
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/adminlogin',(req, res)=>{
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password],(err,result)=>{
        if(err) return res.json({loginStatus: false,Error:"Query error"})
        if(result.length > 0){
            const email = result[0].email;
            const token = jwt.sign({
                role:"admin",email:email},
                "jwt_secret_key",
                {expiresIn:'1d'}
            )
            res.cookie('token', token)
            return res.json({loginStatus: true})
        }else{
            return res.json({loginStatus: false,Error:"Wrong email or password"})
        }    
    }
)
})

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error:"Query error"})
        return res.json({Status:true, Result:result})
    })
})

router.post("/add_category",(req,res)=>{
    const sql = "INSERT INTO category(name) VALUES (?)"
    con.query(sql, [req.body.category], (err,result)=>{
        if(err) return res.json({Status: false, Error:"Query error"})
        return res.json({Status:true})

    })
})

router.post("/add_employee",(req,res)=>{
    const sql = "INSERT INTO employee (name,email,password,category_id,salary,address,image) VALUES (?,?,?,?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.category_id,
        req.body.salary,
        req.body.address,
        req.body.image            
    ]    
    con.query(sql, [values], (err,result)=>{
        if (err) return res.json({Status:false, Error:"Query Error"})
        return res.json({Status:true})
    })
    })


module.exports = router;