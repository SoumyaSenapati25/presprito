// import React, { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { DoctorContext } from '../context/DoctorContext'

// const Sidebar = () => {

//     const {aToken} = useContext(AdminContext)
//     const {dToken} = useContext(DoctorContext)

//   return (
//     <div className='min-h-screen bg-white border-r'>
//         {
//             aToken && <ul className='text-[#40404a] mt-5'>

//             <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''}`} to = {'/admin-dashboard'}>
//                 <img src={assets.home_icon} alt="" />
//                 <p className='hidden md:block'>Dashboard</p>
//             </NavLink>

//             <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''}`} to={'/all-appointments'}>
//                 <img src={assets.appointment_icon} alt="" />
//                 <p className='hidden md:block'>Appointments</p>
//             </NavLink>

//             <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''}`} to={'/add-doctor'}>
//                 <img src={assets.add_icon} alt="" />
//                 <p className='hidden md:block'>Add Doctor</p>
//             </NavLink>

//             <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''}`} to={'/doctor-list'}>
//                 <img src={assets.people_icon} alt="" />
//                 <p className='hidden md:block'>Doctor List</p>
//             </NavLink>

//             </ul>
//         }

// {
//             dToken && <ul className='text-[#40404a] mt-5'>

//             <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''}`} to = {'/doctor-dashbord'}>
//                 <img src={assets.home_icon} alt="" />
//                 <p className='hidden md:block'>Dashboard</p>
//             </NavLink>

//             <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''}`} to={'/doctor-appointments'}>
//                 <img src={assets.appointment_icon} alt="" />
//                 <p className='hidden md:block'>Appointments</p>
//             </NavLink>

//             <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''}`} to={'/doctor-profile'}>
//                 <img src={assets.people_icon} alt="" />
//                 <p className='hidden md:block'>Profile</p>
//             </NavLink>

//             </ul>
//         }

//     </div>
//   )
// }

// export default Sidebar







import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { assets } from '../assets/assets';

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
        isActive ? 'bg-[#d7d7df] border-r-4 border-primary' : ''
      }`
    }
    to={to}
  >
    <img src={icon} alt={`${label} icon`} />
    <p className='hidden md:block'>{label}</p>
  </NavLink>
);

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken && (
        <ul className='text-[#40404a] mt-5'>
          <SidebarLink to='/admin-dashboard' icon={assets.home_icon} label='Dashboard' />
          <SidebarLink to='/all-appointments' icon={assets.appointment_icon} label='Appointments' />
          <SidebarLink to='/add-doctor' icon={assets.add_icon} label='Add Doctor' />
          <SidebarLink to='/doctor-list' icon={assets.people_icon} label='Doctor List' />
        </ul>
      )}

      {dToken && (
        <ul className='text-[#40404a] mt-5'>
          <SidebarLink to='/doctor-dashboard' icon={assets.home_icon} label='Dashboard' />
          <SidebarLink to='/doctor-appointments' icon={assets.appointment_icon} label='Appointments' />
          <SidebarLink to='/doctor-profile' icon={assets.people_icon} label='Profile' />
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
