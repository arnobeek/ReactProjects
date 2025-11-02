import React, { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:3000/auth/adminlogin", values)
        .then(result=>{
            if(result.data.loginStatus){
                navigate('/dashboard')
            }else{
                setError(result.data.Error)
            }
        })
        .catch((err)=>console.log(err))
        
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 loginMain">
            <div className="p-3 rounded w-25 border loginForm">
                <h2>Login Page</h2>
                <div className="text-danger">
                    {error && error}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email: </strong></label>
                        <input type="text" name="email" placeholder="Enter Email..." className="form-control rounded-0" onChange={(e)=>setValues({...values, email:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password: </strong></label>
                        <input type="password" name="password" placeholder="Enter Password..." className="form-control rounded-0" onChange={(e)=>setValues({...values, password:e.target.value})}/>
                    </div>
                    <button className="btn btn-success w-100 rouded-0">Login</button>
                </form>
            </div>
        </div>
    )
}