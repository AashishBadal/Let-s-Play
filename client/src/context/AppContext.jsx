import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [authChecked, setAuthChecked] = useState(false); // Add loading state

    const getAuthStatus = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/auth/is-auth`, {
                withCredentials: true // Ensure cookies are sent
            });
            if(data.success) {
                setIsLoggedIn(true);
                await getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setAuthChecked(true); // Mark auth check as complete
        }
    }

    const getUserData = async() => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/user/data`, {
                withCredentials: true
            });
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    // In your AppContext.js
const logout = async () => {
  try {
    await axios.post(`${backendUrl}/api/auth/logout`, {}, {
      withCredentials: true
    });
    setIsLoggedIn(false);
    setUserData(null);
  } catch (error) {
    toast.error(error.message);
    setIsLoggedIn(false);
    setUserData(null);
  }
};


    useEffect(() => {
        getAuthStatus();
    }, []);

    const value = {
        backendUrl,
        isloggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
        authChecked ,logout// Expose auth check status
    }

    // Wait for auth check to complete before rendering children
    if (!authChecked) {
        return <div>Loading...</div>; // Or a proper loading component
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}