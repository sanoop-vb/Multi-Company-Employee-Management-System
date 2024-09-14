import AttendancePieChart from '../components/AttendencePieChart';
import LeavePieChart from '../components/LeavePieChart';
import './Attendence.css';

const Attendence = () => {
  return (
    <div className="attendence">
      <div>
        <div>
          <AttendancePieChart />
        </div>
        <div>
          <LeavePieChart />
        </div>
      </div>
    </div>
  );
};

export default Attendence;