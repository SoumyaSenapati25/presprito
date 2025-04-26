// import React, { useContext } from 'react'
// import Login from './pages/Login'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import { AppContext } from './context/AppContext';
// import { AdminContext } from './context/AdminContext';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import { Route, Routes } from 'react-router-dom';
// import Dashbord from './pages/Admin/Dashbord';
// import AllApointments from './pages/Admin/AllApointments';
// import AddDoctor from './pages/Admin/AddDoctor';
// import DoctorsList from './pages/Admin/DoctorsList';
// import DoctorDashboard from './pages/Doctor/DoctorDashboard';
// import DoctorAppointments from './pages/Doctor/DoctorAppointments';
// import DoctorProfile from './pages/Doctor/DoctorProfile';
// import { DoctorContext } from './context/DoctorContext';

// const App = () => {

//   const {aToken} = useContext(AdminContext)
//   const {dToken} = useContext(DoctorContext)

//   return aToken || dToken ? (
//     <div className='bg-[#e1e5f7]'>
//       <ToastContainer/>

//       <Navbar/>
      
//       <div className='flex items-start'>
//         <Sidebar/>

//         <Routes>
//           {/* Admin Route */}
//           <Route path='/' element={ <></> } />
//           <Route path='/admin-dashboard' element={ <Dashbord /> } />
//           <Route path='/all-appointments' element={ <AllApointments /> } />
//           <Route path='/add-doctor' element={ <AddDoctor /> } />
//           <Route path='/doctor-list' element={ <DoctorsList /> } />

//           {/* Doctor Route */}
//           <Route path='/doctor-dashboard' element={ <DoctorDashboard /> } />
//           <Route path='/doctor-appointments' element={ <DoctorAppointments /> } />
//           <Route path='/doctor-profile' element={ <DoctorProfile /> } />

          
//         </Routes>

//       </div>

//     </div>
//   ) : (
//     <>
//       <Login />
//       <ToastContainer/>
//     </>
//   )
// }

// export default App









import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Admin/Dashbord';
import AllAppointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const isLoggedIn = aToken || dToken;

  return (
    <>
      <ToastContainer />
      {isLoggedIn ? (
        <div className="bg-[#e1e5f7]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              {/* Default Redirect Based on Role */}
              <Route
                path="/"
                element={
                  aToken ? (
                    <Navigate to="/admin-dashboard" />
                  ) : (
                    <Navigate to="/doctor-dashboard" />
                  )
                }
              />

              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />

              {/* Doctor Routes */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
