import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointments from './pages/Admin/Appointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './Context/DoctorContext';
import DoctorDashboard from './pages/Doctor/doctorDashboard';
import DoctorAppointment from './pages/Doctor/doctorAppointment';
import DoctorProfile from './pages/Doctor/doctorProfile';

const App = () => {
  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      
      <ToastContainer/>
      <NavBar/>
      <div className='flex items-start'> 
        <SideBar/>
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<Appointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorList/>} />
          
          {/* Doctor Routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
          <Route path='/doctor-appointments' element={<DoctorAppointment/>} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />


        </Routes>
      </div>
    </div>
  ):(
    <>
    <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
