// import React from "react";
// import { useContext } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { useEffect } from "react";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const AllApointments = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } =
//     useContext(AdminContext);

//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Apointments</p>

//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
//         <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>

//         {appointments.map((item, index) => (
//           <div
//             className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
//             key={index}
//           >
//             <p className="max-sm:hidden">{index + 1}</p>
//             <div className="flex items-center gap-2">
//               <img
//                 className="w-8 rounded-full"
//                 src={item.userData.image}
//                 alt=""
//               />
//               <p>{item.userData.name}</p>
//             </div>
//             <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
//             <p>
//               {slotDateFormat(item.slotDate)},{item.slotTime}
//             </p>

//             <div className="flex items-center gap-2">
//               <img
//                 className="w-8 rounded-full bg-gray-300"
//                 src={item.docData.image}
//                 alt=""
//               />
//               <p>{item.docData.name}</p>
//             </div>

//             <p>
//               {currency}
//               {item.amount}
//             </p>

//             {item.cancelled ? (
//               <p className="text-red-400 text-xs font-medium">Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className="text-green-500 text-xs font-medium">Completed</p>
//             ) : (
//               <img
//                 onClick={() => cancelAppointment(item._id)}
//                 className="w-10 cursor-pointer"
//                 src={assets.cancel_icon}
//                 alt=""
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllApointments;










import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
   

    

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-100"
              key={item._id}
            >
              <p className="max-sm:font-bold">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={item.userData?.image || assets.user_icon}
                  alt={`${item.userData?.name}'s profile`}
                />
                <p>{item.userData?.name}</p>
              </div>

              <p className="max-sm:text-xs">
                {calculateAge(item.userData?.dob)} yrs
              </p>

              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Doctor Info */}
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover bg-gray-300"
                  src={item.doctorData?.image || assets.user_icon}
                  alt={`${item.doctorData?.name}'s profile`}
                />
                <p>{item.doctorData?.name}</p>
              </div>

              <p>
                {currency}
                {item.amount}
              </p>

              {/* Status or Cancel Option */}
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-semibold">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-6 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel appointment"
                  title="Cancel appointment"
                />
              )}
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-400">No appointments found.</div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
