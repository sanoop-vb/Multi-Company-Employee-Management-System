import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Company Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/dashboard">
                Dashboard
              </Link>
              <Link className="nav-link" to="/employees">
                Employees
              </Link>
              <Link className="nav-link" to="/departments">
                Departments
              </Link>
              <Link className="nav-link" to="/company">
                Company
              </Link>
              <Link className="nav-link" to="/attendence">
                Attendence
              </Link>
              <Link className="nav-link" id="logout" onClick={()=>logout()} to="/">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;