import { useState, useEffect } from "react";
import axios from "axios";

export default function Add_Employee(){
    const [category, setCategory] = useState([]);
    const [employee, setEmployee] = useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        category_id:'',
        image:''
    })

    useEffect(() => {
        axios.get("http://localhost:3000/auth/category")
        .then(result =>{
            if(result.data.Status){
                setCategory(result.data.Result);
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:3000/auth/add_employee", employee)
        .then(result => console.log(result))
        .catch(err => console.log(err))

    }

    return(
        <div className="d-flex justify-content-center align-items-center mt-3 ">
            <div className="p-3 rounded w-50 border">
                <h2>Add Employee</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label"><strong>Name: </strong></label>
                        <input type="text" id="inputName" className="form-control rounded-0" placeholder="Enter Name" onChange={(e)=>setEmployee({...employee, name:e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail" className="form-label"><strong>Email: </strong></label>
                        <input type="email" id="inputEmail" className="form-control rounded-0" placeholder="Enter Email" autoComplete="off" onChange={(e)=>setEmployee({...employee, email:e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword" className="form-label"><strong>Password: </strong></label>
                        <input type="password" id="inputPassword" className="form-control rounded-0" placeholder="Enter Password" onChange={(e)=>setEmployee({...password, name:e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputSalary" className="form-label"><strong>Salary: </strong></label>
                        <input type="text" id="inputSalary" className="form-control rounded-0" placeholder="Enter Salary" autoComplete="off" onChange={(e)=>setEmployee({...employee, salary:e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label"><strong>Address: </strong></label>
                        <input type="text" id="inputAddress" className="form-control rounded-0" placeholder="1234 Main St" autoComplete="off" onChange={(e)=>setEmployee({...employee, address:e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label"><strong>Category: </strong></label>
                        <select name="category" id="category" className="form-select" onChange={(e)=>setEmployee({...employee, category_id:e.target.value})}>
                            {category.map(c => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="inputGroupFile" className="form-label"><strong>Select Image: </strong></label>
                        <input type="file" id="inputGroupFile" className="form-control rounded-0" onChange={(e)=>setEmployee({...employee, image:e.target.files[0]})}/>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary w-100">Add Employee</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}