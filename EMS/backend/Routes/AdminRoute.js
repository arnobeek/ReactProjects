const express = require('express');
const conn = require('../utils/db.js')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

router.post('/adminlogin',(req,res)=>{
    const sql = "SELECT * FROM admin WHERE email = ? and password = ?";
    conn.query(sql, [req.body.email, req.body.password],(err, result) => {
        if(err) return res.json({loginStatus:false, Error:'Query error'})
        if (result.length > 0 ){
            const email = result[0].email;
            const token = jwt.sign({role:"admin", email:email},"JWT_SECRET_KEY", {
                expiresIn:"1d"}
            );
            res.cookie('token',token);
            return res.json({
                loginStatus:true
            })
        }else{
            return res.json({
                loginStatus:false, Error:"Wrong Email or Password"
            })
        }

    })

})

router.post('/add_category',(req, res) => {
    const sql = "INSERT INTO category(`name`) VALUES (?)";
    conn.query(sql,[req.body.category], (err, result) => {
        if(err) return res.json({Status:false, Error: "Query error"})
        return res.json({Status:true})
    })
})

router.get('/category', (req,res) => {
    const sql = "SELECT * FROM category";
    conn.query(sql,(err, result) => {
        if(err) return res.json({Status:false, Error: "Query error"});
        return res.json({Status:true, Result:result})
    })
})

// image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + "_" + file.originalname)
    }
})
const upload = multer({
    storage: storage
})
//end image upload
router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee (name,email,password,category_id,salary,address,image) VALUES (?,?,?,?,?,?,?)`;
    if (!req.file){
        return res.json({Status:false, Error: "Image file is missing"});
    }
    const categoryId = parseInt(req.body.category_id, 10);
    if (isNaN(categoryId) || categoryId <= 0) {
        return res.json({ Status: false, Error: "Invalid category selected" });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status:false, Error: "Query error"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
            categoryId,
            req.body.salary,
            req.body.address,
            req.file.filename
        ]
        conn.query(sql, values, (err, result) => {
            if(err) return res.json({Status:false, Error: "Query error"})
            return res.json({Status: true})    
        })
    })
})

router.get('/employee', (req,res) => {
    const sql = "SELECT * FROM employee";
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"})
        res.json({Status:true, Result: result})    
    })
})

router.get('/employee/:id', (req,res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE employee_id=?";
    conn.query(sql, [id], (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"})
        res.json({Status:true, Result: result})    
    })
})

router.put('/edit_employee/:id', (req,res)=>{
    const id = req.params.id;
    const sql = `UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE employee_id = ? `;
    const values = [
            req.body.name,
            req.body.email,
            req.body.salary,
            req.body.address,
            req.body.category_id
    ]
    conn.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"+err})
        res.json({Status:true, Result: result})    
    })
})

router.delete('/delete_employee/:id', (req,res) => {
    const id = req.params.id;
    const sql = `DELETE FROM employee WHERE employee_id = ?`;
    conn.query(sql, [id], (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"})
        res.json({Status:true, Result: result})    
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"+err})
        res.json({Status:true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(employee_id) as employees from employee";
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"+err})
        res.json({Status:true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salary from employee";
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"+err})
        res.json({Status:true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin";
    conn.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error:"Query Error"+err})
        res.json({Status:true, Result: result})
    })
})

router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status:true})
})

module.exports = router;
