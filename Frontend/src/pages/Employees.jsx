import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Employees.css";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const DisplayEmployee = (id) => {
    navigate("/view/" + id);
  };

  const UpdateEmployee = (id) => {
    navigate("/edit/" + id);
  };

  const DeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/employee/${id}/`);
        alert("Employee deleted successfully!");
        fetchEmployees(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete the employee. Please try again.");
      }
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/employee/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Employee List</h2>
      <Link to="/create" className="btn btn-primary mb-2">
        Create Employee
      </Link>
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
            <th>Name</th>
            <th>EID</th>
            <th>Company</th>
            <th>Department</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees
              .filter((employee) => {
                return search.toLowerCase() === ""
                  ? employee
                  : employee.name.toLowerCase().includes(search);
              })
              .map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.employee_id}</td>
                  <td>{employee.company}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>{employee.joining_date}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button
                      onClick={() => DisplayEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                    <button
                      onClick={() => UpdateEmployee(employee.id)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => DeleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;