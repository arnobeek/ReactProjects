import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [values, setValues] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    
    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:3000/auth/adminlogin", values)
            .then(result => {
                if (result.data.loginStatus){
                    navigate('/dashboard')
                }else{
                    setError(result.data.Error)
                }
                
            } )
            .catch(err => console.log(err))
        
    }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm ">
        <div className="text-warning">
            {error && error}
        </div>
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email..."
              className="form-control rounded-0"
              value={values.email}
              onChange={(e) => setValues({...values, email:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password..."
              className="form-control rounded-0"
              value={values.password}
              onChange={(e) => setValues({...values, password:e.target.value})}
            />
          </div>
          <button className="btn btn-success w-100 rouded-0">Login</button>
          <div className="mb-1">
            <input
              type="checkbox"
              name="tick"
              id="tick"
            />
            <label htmlFor="password" className="me-2">
              <strong>You Agree with Terms and Conditions</strong>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
