// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Company from './pages/Company';
import Attendence from './pages/Attendence';
import CreateEmployee from './components/CreateEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import ViewDepartments from './pages/Departments';
import RestrictedUser from './components/RestrictedUser';
import ViewDepartment from './components/Department/ViewDepartment';
import CreateDepartment from './components/Department/CreateDepartment';
import UpdateDepartment from './components/Department/UpdateDepartment';
import ViewCompany from './components/Company/ViewCompany';
import UpdateCompany from './components/Company/UpdateCompany';
import './index.css'
function App() {
  return (
    <div>
    <Router>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/departments" element={<ViewDepartments />} />
              <Route path="/company" element={<Company />} />
              <Route path="/restricted" element={<RestrictedUser />} />
              <Route path="/attendence" element={<Attendence />} />
              <Route path="/create" element={<CreateEmployee />} />
              <Route path='/view/:id' element={<ViewEmployee/>} />
              <Route path='/edit/:id' element={<UpdateEmployee />} />
              <Route path='/viewDep/:id' element={<ViewDepartment />} />
              <Route path='/createDep' element={<CreateDepartment />} />
              <Route path='/editDep/:id' element={<UpdateDepartment />} />
              <Route path='/viewComp/:id' element={<ViewCompany />} />
              <Route path='/editComp/:id' element={<UpdateCompany />} />
            </Route>
          </Routes>
    </Router>
    </div>
  );
}

export default App;