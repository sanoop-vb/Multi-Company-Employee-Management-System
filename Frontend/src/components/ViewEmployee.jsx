import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ViewEmployee = () => {
  const { id } = useParams();

  const [empData, setEmpData] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    axios
      .get(`http://127.0.0.1:8000/employee/${id}/`)
      .then((response) => {
        console.log(response.data);
        setEmpData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  return (
    <div className="container-dev">
      <h2>Employee Details</h2>
      {empData && (
        <div className="details">
          <p>
            <strong>Name : </strong>
            {empData.name}
          </p>
          <p>
            <strong>EID : </strong>
            {empData.employee_id}
          </p>
          <p>
            <strong>Company : </strong>
            {empData.company}
          </p>
          <p>
            <strong>Department : </strong>
            {empData.department}
          </p>
          <p>
            <strong>Role : </strong>
            {empData.role}
          </p>
          <p>
            <strong>Joined : </strong>
            {empData.joining_date}
          </p>
          <p>
            <strong>Salary : </strong>
            {empData.salary}
          </p>
        </div>
      )}
      <Link to="/employees" className="btn btn-danger">
        Back
      </Link>
    </div>
  );
};

export default ViewEmployee;