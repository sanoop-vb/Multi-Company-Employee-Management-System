import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

const ViewCompany = () => {

    const { id } = useParams();

    const [company, setCompany] = useState({});

    useEffect(() => {
        fetchcompany();
    }, []);

    const fetchcompany = async () => {
        axios
        .get(`http://127.0.0.1:8000/company/${id}/`)
        .then((response) => {
            console.log(response.data);
            console.log(id)
            setCompany(response.data);
        })
        .catch((error) => {
            console.error("Error fetching companies:", error);
        });
    };

  return (
    <div className='container-dev'>
        <h2>Company Details</h2>
      {company && (
        <div className="details">
          <p>
            <strong>Name : </strong>
            {company.name}
          </p>
          <p>
            <strong>Address : </strong>
            {company.address}
          </p>
          <p>
            <strong>Contact : </strong>
            {company.contact_info}
          </p>
          <p>
            <strong>Logo : </strong>
            {company.logo}
          </p>
        </div>
      )}
      <Link to="/company" className="btn btn-danger">
        Back
      </Link>
    </div>
  )
}

export default ViewCompany