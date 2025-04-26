// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'

// const DoctorsList = () => {

//   const {doctors , aToken , getAllDoctors , changeAvailability} = useContext(AdminContext)

//   useEffect(()=>{
//     if (aToken) {
//       getAllDoctors()
//     }
//   },[aToken])

//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium's>All Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {
//           doctors.map((item,index) => (
//             <div className='border border-indigo-300 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//               <img className='bg-indigo-100 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
//               <div className='p-4'>
//                 <p className='text-neutral-800 text-lg font-medium' >{item.name}</p>
//                 <p className='text-zinc-600 text-sm' >{item.speciality}</p>
//                 <div className='mt-2 flex items-center gap-1 text-sm'>
//                   <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
//                   <p>Available</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         }
//       </div>


//     </div>
//   )
// }

// export default DoctorsList











import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets'; // In case you want a fallback image

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item) => (
          <div
            className="border border-indigo-300 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={item._id}
          >
            <img
              className="bg-indigo-100 group-hover:bg-primary transition-all duration-500 w-full h-36 object-cover"
              src={item.image || assets.user_icon}
              alt={`${item.name}'s avatar`}
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className="cursor-pointer"
                />
                <label>Available</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
