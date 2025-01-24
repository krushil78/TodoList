import axios from "axios";

import { jwtDecode } from "jwt-decode";

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);



// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [backendUrl , setBackendUrl] = useState(null)

  const navigate = useNavigate();


  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const {data} = await axios.get('http://localhost:5000/api/config');
         setBackendUrl(data.backendUrl);
        console.log(data.backendUrl);
      } catch (error) {
        console.error('Error fetching backend URL:', error);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.username); // or whatever field you want from the token
    }
  }, [backendUrl,  token]);
 




  const login = async (credentials) => {
    const { data } = await axios.post(`${backendUrl}auth/login`, credentials);
    
   
    const decodedToken = jwtDecode(data.token);
    console.log(decodedToken)
    setUser(decodedToken.username);
      
    setToken(data.token);
    localStorage.setItem("token", data.token);
   
    navigate("/");
  
  };


  const signup = async (credentials) => {
    try {
      const { data } = await axios.post(`${backendUrl}auth/signup`, credentials);
    
      
   
      setToken(data.token);
      localStorage.setItem("token", data.token);
      
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || "Unknown error");
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${backendUrl}auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
      
      setToken(null);
      localStorage.removeItem("token");
      navigate("/login");
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  const value = { user, token, login, logout ,signup , backendUrl};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
