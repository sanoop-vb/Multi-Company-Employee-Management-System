import EmployeeSalaryChart from '../components/Salarychart';
import './Dashboard.css'

const Dashboard = () => {
    return (
      <div className="dashboard">
        <div style={{width: 1000}}>
        <EmployeeSalaryChart/>
        </div>
      </div>
    );
  };
  
  export default Dashboard;  