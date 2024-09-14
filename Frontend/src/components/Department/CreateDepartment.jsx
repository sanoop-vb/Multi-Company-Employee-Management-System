import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const CreateDepartment = () => {
  const data = {
    name: "",
    company: "",
  };

  const [dept, setDept] = useState(data);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setDept({ ...dept, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/department/", dept);
      alert("New Department Created");
      navigate("/departments");
    } catch (err) {
      if (err.response) {
        console.log("Error response data:", err.response.data);
        console.log("Error status:", err.response.status);
        console.log("Error headers:", err.response.headers);
      } else if (err.request) {
        console.log("Error request:", err.request);
      } else {
        console.log("Error message:", err.message);
      }
    }
  };

  return (
    <div className="container-dev">
      <h2>Create Department</h2>
      <Link to="/createDep" className="btn btn-primary mb-2">
        Create Department
      </Link>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Department Name"
          name="name"
          className="form-control"
          value={dept.name}
          onChange={handleInput}
          required
        />

        <label className="form-label">Company</label>
        <input
          type="text"
          placeholder="Department Company"
          name="company"
          className="form-control"
          value={dept.company}
          onChange={handleInput}
          required
        />

        <div>
          <button className="btn btn-success" type="submit">
            Save
          </button>
          <Link to="/departments" className="btn btn-danger">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateDepartment;