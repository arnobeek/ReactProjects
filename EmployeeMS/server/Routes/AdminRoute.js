const express = require("express");
const con = require('../utils/db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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
        if(err) {
            console.error("Category query error:", err);
            return res.json({Status: false, Error:"Query error: " + err.message})
        }
        console.log("Categories fetched:", result);
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

router.post("/add_employee", upload.single('image'), (req,res)=>{
    try {
        // Validate required fields
        if(!req.body.name || !req.body.email || !req.body.password || !req.body.salary || !req.body.address || !req.body.category_id) {
            return res.json({Status: false, Error: "All fields are required"});
        }

        // Trim whitespace
        const salary = req.body.salary.toString().trim();
        const category_id = req.body.category_id.toString().trim();
        
        // Validate numeric fields
        if(!salary || isNaN(salary) || salary <= 0) {
            return res.json({Status: false, Error: "Salary must be a valid positive number"});
        }

        if(!category_id || isNaN(category_id) || category_id <= 0) {
            return res.json({Status: false, Error: "Category must be selected"});
        }

        const imagePath = req.file ? req.file.filename : null;
        const sql = "INSERT INTO employee(name,email,password,category_id,salary,address,image) VALUES (?)";
        bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
            if(err) {
                console.error("Bcrypt error:", err);
                return res.json({Status: false, Error:"Encryption error"})
            }
            const values = [
                req.body.name,
                req.body.email,
                hash,
                parseInt(category_id),
                parseInt(salary),
                req.body.address,
                imagePath
            ]      
            con.query(sql, [values], (err,result)=>{
                if (err) {
                    console.error("Query error:", err);
                    return res.json({Status:false, Error:"Query Error: " + err.message})
                }
                return res.json({Status:true})
            })
        })
    } catch(err) {
        console.error("Server error:", err);
        return res.json({Status:false, Error: err.message})
    }
})

// Diagnostic endpoint to check database status
router.get('/check-categories', (req, res) => {
    const sql = "SELECT COUNT(*) as count FROM category";
    con.query(sql, (err, result) => {
        if(err) {
            console.error("Database error:", err);
            return res.json({Status: false, Error: "Database error: " + err.message});
        }
        console.log("Category count:", result);
        res.json({
            Status: true,
            CategoryCount: result[0].count,
            Message: result[0].count > 0 ? "Categories exist" : "No categories found - please add categories first"
        });
    });
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) {
            return res.json({Status: false, Error:"Query error: " + err.message})
        }
        console.log("Categories fetched:", result);
        return res.json({Status:true, Result:result})
    })
})


module.exports = router;