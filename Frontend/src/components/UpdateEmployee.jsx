import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = () => {

    const { id } = useParams();

    const data = {
        name: "",
        employee_id: "",
        company: "", // ID of the company
        department: "", // ID of the department
        role: "", // ID of the role
        joining_date: "", // should be in YYYY-MM-DD format
        salary: "",
      };
    
      const navigate = useNavigate()
    
      const [employee, setEmployee] = useState(data);

  //  const [empData, setEmpData] = useState({});

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        axios
        .get(`http://127.0.0.1:8000/employee/${id}/`)
        .then((response) => {
            console.log(response.data);
            setEmployee(response.data)

        })
        .catch((error) => {
            console.error("Error fetching employees:", error);
        });
    };

    const handleInput = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const formatDate = (date) => {
        if (!date) return "";
        const formattedDate = new Date(date).toISOString().split("T")[0];
        return formattedDate;
      };

    const handleSubmit = () => {
        const formattedEmployee = {
            ...employee,
            joining_date: formatDate(employee.joining_date),
          };

        axios
      .put(`http://127.0.0.1:8000/employee/${id}/`, formattedEmployee)
      .then((response) => {
        alert("Employee Updated Successfully!")
        navigate('/employees')
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error response data:", err.response.data);
          console.log("Error status:", err.response.status);
          console.log("Error headers:", err.response.headers);
        } else if (err.request) {
          console.log("Error request:", err.request);
        } else {
          console.log("Error message:", err.message);
        }
      });
    }

  return (
    <div className='container-dev'>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Employee Name"
          name="name"
          className="form-control"
          value={employee.name}
          onChange={handleInput}
          required
        />

        <label className="form-label">Employee ID</label>
        <input
          type="text"
          placeholder="Employee ID"
          name="employee_id"
          className="form-control"
          value={employee.employee_id}
          onChange={handleInput}
          required
        />

        <label className="form-label">Company (ID)</label>
        <input
          type="number"
          placeholder="Company ID"
          name="company"
          className="form-control"
          value={employee.company}
          onChange={handleInput}
          required
        />

        <label className="form-label">Department (ID)</label>
        <input
          type="number"
          placeholder="Department ID"
          name="department"
          className="form-control"
          value={employee.department}
          onChange={handleInput}
          required
        />

        <label className="form-label">Role (ID)</label>
        <input
          type="number"
          placeholder="Role ID"
          name="role"
          className="form-control"
          value={employee.role}
          onChange={handleInput}
          required
        />

        <label className="form-label">Joining Date (YYYY-MM-DD)</label>
        <input
          type="date"
          name="joining_date"
          className="form-control"
          value={employee.joining_date}
          onChange={handleInput}
          required
        />

        <label className="form-label">Salary</label>
        <input
          type="text"
          placeholder="Salary"
          name="salary"
          className="form-control"
          value={employee.salary}
          onChange={handleInput}
        />

        <div>
          <button className="btn btn-success" type="submit">
            Update
          </button>
          <Link to="/employees" className="btn btn-danger">
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateEmployee