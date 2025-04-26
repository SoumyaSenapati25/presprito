import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

// Creating the global context
export const AppContext = createContext();

const AppContextProvider = (props) => {
    // Currency symbol used in the app
    const currencySymbol = '$';

    // Backend URL from .env
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // State to hold doctor data
    const [doctors, setDoctors] = useState([]);

    // Token state (fetched from localStorage if available)
    const [token, setToken] = useState(localStorage.getItem('token') || "");

    // Logged-in user's data
    const [userData, setUserData] = useState(null);

    // Fetch all doctors from the backend
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

            if (data.success) {
                setDoctors(data.doctors);
                // console.log(data.doctors)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // Fetch user profile if token is available
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/get-profile`,
                {
                    headers: {
                        token: ` ${token}`, // ✅ Proper format
                    }
                }
            );

            if (data.success) {
                setUserData(data.userData); // ✅ Ensure it matches your backend key
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // All context values made available to child components
    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    };

    // Run once on mount to fetch doctors
    useEffect(() => {
        getDoctorsData();
    }, []);

    // Run when token changes — fetch user profile or clear it
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
