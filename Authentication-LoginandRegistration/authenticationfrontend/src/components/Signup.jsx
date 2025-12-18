import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Signup(){

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if(values.password !== values.confirmPassword){
            alert("Passwords don't match!")
        }else{
            axios.post('http://localhost:3000/auth/signup', values)
            .then(result => {
                if(result.data.Status){
                    alert("Registered. Please log in");
                    navigate('/');      
                }else{
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        }
    }

    return(
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-success fw-bold mb-3">Sign Up</h1>
            <form className="form-control border-success shadow" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="name" className="mb-2"><strong>Name</strong></label>
                    <input type="text" className="form-control border-success" onChange={(e) => setValues({...values, name: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="mb-2"><strong>Email</strong></label>
                    <input type="email" className="form-control border-success" onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="mb-2"><strong>Password</strong></label>
                    <input type="password" className="form-control border-success" onChange={(e) => setValues({...values, password: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="mb-2"><strong> Confirm Password</strong></label>
                    <input type="password" className="form-control border-success" onChange={(e) => setValues({...values, confirmPassword: e.target.value})}/>
                </div>
                <button className="btn btn-success w-100">Sign up</button>
                <span>Already have an account?<Link to={'/'}><span> Login</span></Link></span>
            </form>
        </div>

    )
}