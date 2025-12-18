import { Link } from "react-router-dom"

export default function Signup(){

    return(
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-success fw-bold mb-3">Login</h1>
            <form className="form-control border-success shadow" >
                <div className="mb-3">
                    <label htmlFor="email" className="mb-2"><strong>Email</strong></label>
                    <input type="email" className="form-control border-success" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="mb-2"><strong>Password</strong></label>
                    <input type="password" className="form-control border-success" />
                </div>
                <button className="btn btn-success w-100 mb-3">Login</button>
                <span>Already have an account yet?<Link to={''}><span> Login</span></Link></span>
            </form>
        </div>

    )
}