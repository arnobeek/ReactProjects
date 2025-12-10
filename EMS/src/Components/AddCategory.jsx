import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/add_category", { category })
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/category')
        }
        else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border ">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="category"
              placeholder="Enter Category..."
              className="form-control rounded-0"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100 rouded-0" >Add Category</button>

        </form>
      </div>
    </div>
  )
}