import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
    const [employee, setEmployee] = useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        category_id:'',
        image:''
    })
    const [category, setCategory] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                    console.log('Fetched categories:', result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        // Basic validation
        if (!employee.name || !employee.email || !employee.password || !employee.salary || !employee.address || !employee.category_id || !employee.image) {
            alert('Please fill all fields and select a category and image');
            return;
        }

        console.log('Submitting employee:', employee);

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('salary', employee.salary);
        formData.append('address', employee.address);
        formData.append('category_id', employee.category_id);
        formData.append('image', employee.image);

        axios.post("http://localhost:3000/auth/add_employee", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result.data);
            if(result.data.Status) {
                alert("Employee added successfully!");
                setEmployee({name:'', email:'', password:'', salary:'', address:'', category_id:'', image:''});
            } else {
                alert('Error: ' + result.data.Error);
            }
            navigate('/dashboard/employee')
        })
        .catch(err => console.error("Error:", err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-80 mt-5">
            <div className="p-3 rounded w-25 border ">
                <h2>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Name"><strong>Name</strong></label>
                        <input
                            type="text"
                            id="inputName"
                            placeholder="Enter Name..."
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({...employee, name:e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="inputEmail"
                            placeholder="Enter Email..."
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({...employee, email:e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name"><strong>Password</strong></label>
                        <input
                            type="password"
                            id="inputPassword"
                            placeholder="Enter Password..."
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({...employee, password:e.target.value})}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="Name"><strong>Salary</strong></label>
                        <input
                            type="text"
                            id="inputSalary"
                            placeholder="Enter Salary..."
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({...employee, salary:e.target.value})}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="Name"><strong>Address</strong></label>
                        <input
                            type="text"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            className="form-control rounded-0"
                            onChange={(e) => setEmployee({...employee, address:e.target.value})}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="Name"><strong>Select Image</strong></label>
                        <input
                            type="file"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            className="form-control rounded-0"
                            name="image"
                            onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="Name" className="form-label"><strong>Category</strong></label>
                        <select name="category" id="category" className="form-select"
                        value={employee.category_id}
                        onChange={(e) => setEmployee({...employee, category_id:e.target.value})}>
                            <option value="">-- Select Category --</option>
                            {
                                category && category.length > 0 && category.map(c => {
                                    const optId = c.category_id !== undefined ? String(c.category_id) : (c.id !== undefined ? String(c.id) : String(c.name));
                                    return <option key={optId} value={optId}>{c.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Add Employee</button>

                </form>
            </div>
        </div>
    )
}