import axios from "axios"
import { useEffect, useState } from "react"

export default function Home(){

    const [adminTotal, setAdminTotal] = useState()
    const [employeeTotal, setEmployeeTotal] = useState()
    const [salaryTotal, setSalaryTotal] = useState()
    const [adminRecords, setAdminRecords] = useState([])

    useEffect(()=>{
        adminCount();
        employeeCount();
        salaryCount();
        adminDetails()
    },[])

    function adminCount(){
        axios.get('http://localhost:3000/auth/admin_count')
        .then(result => {
            if(result.data.Result){
                setAdminTotal(result.data.Result[0].admin)
            }
        })
    }
    function employeeCount(){
        axios.get('http://localhost:3000/auth/employee_count')
        .then(result => {
            if(result.data.Status){
                setEmployeeTotal(result.data.Result[0].employees)
            }
        })
    }
    function salaryCount(){
        axios.get('http://localhost:3000/auth/salary_count')
        .then(result => {
            if(result.data.Status){
                setSalaryTotal(result.data.Result[0].salary)
            }
        })
    }
    function adminDetails(){
        axios.get('http://localhost:3000/auth/admin_records')
        .then(result => {
            if(result.data.Status){
                setAdminRecords(result.data.Result)
            }
        })
    }

    return(
        <div>
            <div className="p-3 d-flex justify-content-around mt-3">
                <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
                    <div className="text-center pb-1">
                        <h4>Admin</h4>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h5>Total:  </h5>
                        <h5>{adminTotal}</h5>
                    </div>
                </div>
                <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
                    <div className="text-center pb-1">
                        <h4>Employee</h4>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h5>Total: </h5>
                        <h5>{employeeTotal}</h5>
                    </div>
                </div>
                <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
                    <div className="text-center pb-1">
                        <h4>Salary</h4>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h5>Total: </h5>
                        <h5>UGX {salaryTotal}</h5>
                    </div>
                </div>
            </div>
            <div className="mt-3 px-5 pt-3">
                <h3>List of Admins</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminRecords.map(a => (
                            <tr key={a.id
                            }>
                                <td>{a.email}</td>
                                <td>
                                    <button className="btn btn-info btn-sm me-2">Edit</button>
                                    <button className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}