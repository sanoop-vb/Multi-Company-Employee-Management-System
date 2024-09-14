import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Departments.css'

const ViewDepartments = () => {
  const [departments, setDepartments] = useState([]);

  const { id } = useParams();

  const [search, setSearch] = useState('');

  const navigate = useNavigate()

  const fetchDep = () => {
    axios.get('http://127.0.0.1:8000/department/')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }

  useEffect(() => {
    fetchDep()
  }, []);

  const displayDepartment = (id) => {
    navigate('/viewDep/'+id)
  }

  const updateDepartment = (id) => {
    navigate('/editDep/'+id)
  }

  const deleteDepartment = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/department/${id}/`);
        alert('Department deleted successfully!');
        fetchDep()
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Failed to delete the department. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Department List</h2>
      <Link to="/createDep" className="btn btn-primary mb-2">Create Department</Link>
      <div className="searchBox">
        <div className="input-group-prepend"></div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          class="form-control"
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            departments && departments.filter((department) => {
              return search.toLowerCase() === ""
                ? department
                : department.name.toLowerCase().includes(search);
            }).map(department => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>
                <td>{department.company}</td>
                <td>
                  <button onClick={()=>displayDepartment(department.id)} className='btn btn-info'>View</button>
                  <button onClick={()=>updateDepartment(department.id)} className='btn btn-primary'>Edit</button>
                  <button onClick={()=>deleteDepartment(department.id)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ViewDepartments;