import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';

const UpdateCompany = () => {

    const data = {
        name: "",
        address: "",
        contact_info: "",
        logo: ""
      };
    
      const [comp, setComp] = useState(data);
      const { id } = useParams();
      const navigate = useNavigate();
    
      const handleInput = (e) => {
        setComp({ ...comp, [e.target.name]: e.target.value });
      };
    
      useEffect(() => {
        fetchCompany();
      }, []);
    
      const fetchCompany = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/company/${id}/`);
          console.log(response.data);
          setComp(response.data);
        } catch (error) {
          console.error("Error fetching companies:", error);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://127.0.0.1:8000/company/${id}/`, comp);
          alert("Company Updated");
          navigate("/company");
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
      <h2>Update Company</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Company Name"
          name="name"
          className="form-control"
          value={comp.name}
          onChange={handleInput}
          required
        />

        <label className="form-label">Address</label>
        <input
          type="text"
          placeholder="Company Address"
          name="address"
          className="form-control"
          value={comp.address}
          onChange={handleInput}
          required
        />

        <label className="form-label">Contact</label>
        <input
          type="text"
          placeholder="Contact"
          name="contact"
          className="form-control"
          value={comp.contact_info}
          onChange={handleInput}
          required
        />

        <label className="form-label">Logo</label>
        <input
          type="image"
          placeholder="Company Logo"
          name="logo"
          className="form-control"
          value={comp.logo}
          onChange={handleInput}
          required
        />

        <div>
          <button className="btn btn-success" type="submit">
            Update
          </button>
          <Link to="/departments" className="btn btn-danger">
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateCompany