import express from 'express'
import connection from '../db/db.js'
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/signup',(req, res) => {
    const sql = "INSERT INTO users(name, email, password) VALUES (?,?,?)";
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
        const values = [
            req.body.name,
            req.body.email,
            hashed
        ]
        connection.query(sql, values, (err, result) => {
            if(err) return res.json({Status: false, Error:'Query Error'})
            return res.json({Status:true})    
        })
    })
    
})

router.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: true, Error:'Query Error'})
        
        if(result.length > 0){
            bcrypt.compare(req.body.password, result[0].password, (err, result) => {
                if(err){
                    res.json({Status:false, Error:err})
                }
                if(result){
                    res.json({Status:true})

                }else{
                    res.json({Status:false, Error:'Wrong password'})
                }

            })
        }else{
            return res.json({Status:false, Error:'User not found'})
        }    
    })
})

export default router;