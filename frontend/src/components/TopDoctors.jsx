// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { doctors } from "../assets/assets";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);

//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors.
//       </p>

//       {/* Ensure doctors exist before mapping */}
//       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {doctors?.slice(0, 10).map((item) => (
//           <div
//             key={item._id}
//             onClick={() => {
//               navigate(`/appointment/${item._id}`);
//               window.scrollTo(0, 0); // Fixed scroll issue
//             }}
//             className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
//           >
//             <img
//               className="bg-blue-100 w-full"
//               src={item.image}
//               alt={item.name}
//             />
//             <div className="p-4">
//               <div
//                 className={`flex items-center gap-2 text-sm text-center ${
//                   item.available ? "text-green-500" : "text-red-400"
//                 } `}
//               >
//                 <p
//                   className={`w-2 h-2 ${
//                     item.available ? "bg-green-500" : "bg bg-red-500"
//                   } rounded-full`}
//                 ></p>
//                 <p>{item.available ? "Available" : "Not Available"}</p>
//               </div>
//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-600 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => {
//           navigate("/doctors");
//           window.scrollTo(0, 0); // Fixed scroll issue
//         }}
//         className="bg-blue-100 text-gray-600 border border-blue-500 px-12 py-3 rounded-full mt-10"
//       >
//         More
//       </button>
//     </div>
//   );
// };

// export default TopDoctors;








import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// import { doctors as doctorsData } from "../assets/assets"; // Renaming to avoid conflict

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  // const doctors = doctorsData;

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Ensure doctors exist before mapping */}
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors?.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0); // Fixed scroll issue
            }}
            className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
          >
            <img
              className="bg-blue-100 w-full"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-red-400"
                } `}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg bg-red-500"
                  } rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0); // Fixed scroll issue
        }}
        className="bg-blue-100 text-gray-600 border border-blue-500 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
