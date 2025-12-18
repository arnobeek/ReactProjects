import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login(){
    const [values, setValues] = useState({
        email:'',
        password:'',
    })
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:3000/auth/login', values)
        .then(result => {
            if(result.data.Status){
                navigate('/home');
            }else{
                console.log(result.data.Error)
            }

        })

    }

    return(
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-success fw-bold mb-3">Login</h1>
            <form className="form-control border-success shadow" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="mb-2"><strong>Email</strong></label>
                    <input type="email" className="form-control border-success" onChange={(e) => setValues({...values, email: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="mb-2"><strong>Password</strong></label>
                    <input type="password" className="form-control border-success" onChange={(e) => setValues({...values, password: e.target.value})}/>
                </div>
                <button className="btn btn-success w-100">Login</button>
                <span>Don't have an account yet?<Link to={'/signup'}><span> Sign Up</span></Link></span>
            </form>
        </div>
    )
}