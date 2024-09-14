import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Company.css';

const getLoggedInUser = () => {
  // Fetch the user data from your preferred source (localStorage, context, Redux, etc.)
  return localStorage.getItem('userName');
};

const Company = () => {
  const [company, setCompany] = useState([]);

  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const displayCompany = (id) => {
    navigate('/viewComp/'+id)
  }

  const UpdateCompany = (id) => {
    navigate('/editComp/'+id)
  }

  const user = getLoggedInUser();

  useEffect(() => {
    // Check if the user is not an admin and redirect if necessary
    if (user !== 'sanoop') {
      navigate('/restricted'); // Redirect to restricted route
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/company/') // Make sure this matches your backend URL structure
      .then((response) => setCompany(response.data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, []);

  return (
    <div className="container">
      <h2>Company List</h2>
      <Link to="/create" className="btn btn-primary mb-2">
        Create Company
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
            <th>Address</th>
            <th>Contact</th>
            <th>Logo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {company &&
            company.filter((com) => {
              return search.toLowerCase() === ""
                ? com
                : com.name.toLowerCase().includes(search);
            }).map((com) => (
              <tr key={com.id}>
                <td>{com.name}</td>
                <td>{com.address}</td>
                <td>{com.contact_info}</td>
                <td>
                  {com.logo ? (
                    <>
                    <img
                      src={`${com.logo}`} // Combine base URL and logo path
                      alt={`${com.name} Logo`}
                      className='logo-img' // Adjust the size and style as needed
                    /> {console.log(`Image URL: ${com.logo}`)}
                    </>
                  ) : (
                    'No Logo'
                  )}
                </td>
                <td>
                  <button onClick={()=>displayCompany(com.id)}className="btn btn-info">View</button>
                  <button onClick={()=>UpdateCompany(com.id)}className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Company;