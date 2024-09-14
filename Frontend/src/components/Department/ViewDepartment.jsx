import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

const ViewDepartment = () => {

    const { id } = useParams();

    const [department, setDepartment] = useState({});

    useEffect(() => {
        fetchdepartment();
    }, []);

    const fetchdepartment = async () => {
        axios
        .get(`http://127.0.0.1:8000/department/${id}/`)
        .then((response) => {
            console.log(response.data);
            setDepartment(response.data);
        })
        .catch((error) => {
            console.error("Error fetching department:", error);
        });
    };

  return (
    <div className='container-dev'>
        <h2>Department Details</h2>
      {department && (
        <div className="details">
          <p>
            <strong>ID : </strong>
            {department.id}
          </p>
          <p>
            <strong>Name : </strong>
            {department.name}
          </p>
          <p>
            <strong>Company : </strong>
            {department.company}
          </p>
        </div>
      )}
      <Link to="/departments" className="btn btn-danger">
        Back
      </Link>
    </div>
  )
}

export default ViewDepartment