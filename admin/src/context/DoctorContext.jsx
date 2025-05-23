// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// // import { set } from "mongoose";

// export const DoctorContext = createContext();

// const DoctorContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [dToken, setDToken] = useState(
//     localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
//   );

//   const [appointments, setAppointments] = useState([]);

//   const [dashData, setDashData] = useState(false);

//   const [profileData,setProfileData] = useState(false);

//   const getAppointments = async () => {
//     try {
//       const { data } = await axios.get(
//         backendUrl + "/api/doctor/appointments",
//         { headers: { dToken } }
//       );

//       if (data.success) {
//         setAppointments(data.appointments);
//         console.log(data.appointments);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const completeAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/doctor/complete-appointment",
//         { appointmentId },
//         { headers: { dToken } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getAppointments();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/doctor/cancel-appointment",
//         { appointmentId },
//         { headers: { dToken } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getAppointments();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const getDashData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
//         headers: { dToken },
//       });

//       if (data.success) {
//         setDashData(data.dashData);
//         console.log(data.dashData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const getProfileData = async () => {

//     try {

//         const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})

//         if (data.success) {
//             setProfileData(data.profileData)
//             console.log(data.profileData)
//         }
        
//     } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//     }

//   }


//   const value = {
//     dToken,
//     setDToken,
//     backendUrl,
//     appointments,
//     setAppointments,
//     getAppointments,
//     cancelAppointment,
//     completeAppointment,
//     dashData,
//     setDashData,
//     getDashData,
//     profileData,setProfileData,
//     getProfileData
//   };

//   return (
//     <DoctorContext.Provider value={value}>
//       {props.children}
//     </DoctorContext.Provider>
//   );
// };

// export default DoctorContextProvider;








import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") || ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log("Doctor Appointments:", data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/dashboard`,
        { headers: { dToken } }
      );
      if (data.success) {
        setDashData(data.dashData);
        console.log("Doctor Dashboard:", data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/profile`,
        { headers: { dToken } }
      );
      if (data.success && data.profileData) {
        setProfileData(data.profileData);
        console.log("Doctor Profile:", data.profileData);
      } else {
        toast.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
