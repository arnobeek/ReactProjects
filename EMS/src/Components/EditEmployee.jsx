import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function EditEmployee() {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''
    })
    const [category, setCategory] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status){
                setCategory(result.data.Result);
                console.log(category);
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))

        axios.get(`http://localhost:3000/auth/employee/${id}`)
        .then(result => {
            setEmployee({...employee,
                name:result.data.Result[0].name,
                email:result.data.Result[0].email,
                address:result.data.Result[0].address,
                salary:result.data.Result[0].salary,
                category_id:result.data.Result[0].category_id,
            })
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    function handleSubmit(e){
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit_employee/${id}`,employee)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/employee');
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-80 mt-5">
            <div className="p-3 rounded w-25 border ">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Name"><strong>Name</strong></label>
                        <input
                            type="text"
                            id="inputName"
                            placeholder="Enter Name..."
                            value={employee.name}
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="inputEmail"
                            placeholder="Enter Email..."
                            value={employee.email}
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="Name"><strong>Salary</strong></label>
                        <input
                            type="text"
                            id="inputSalary"
                            placeholder="Enter Salary..."
                            value={employee.salary}
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="Name"><strong>Address</strong></label>
                        <input
                            type="text"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            value={employee.address}
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="Name" className="form-label"><strong>Category</strong></label>
                        <select name="category" id="category" className="form-select"
                            value={employee.category_id}
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            <option value="">-- Select Category --</option>
                            {
                                category && category.length > 0 && category.map(c => {
                                    const optId = c.category_id !== undefined ? String(c.category_id) : (c.id !== undefined ? String(c.id) : String(c.name));
                                    return <option key={optId} value={optId}>{c.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Edit Employee</button>

                </form>
            </div>
        </div>
    )
}