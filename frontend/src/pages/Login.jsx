import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {  useNavigate } from "react-router";
import logo from '../assets/fevicon.svg';
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null);

    // Check for required fields
    if ( !credentials.email || !credentials.password) {
      setError("All fields are required.");
      return;
    }

    // Optional: Add more validation checks (e.g., valid email, password length, etc.)
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setError("Please enter a valid email address.");
      return;
    }

  try {
    await login(credentials);
    
  } catch (error) {
    setError("login failed. Please try again.");
  }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-800">
      <form onSubmit={handleSubmit} className="p-6  bg-gray-800 rounded shadow-md">
        <div className="flex justify-center mb-4  ">
                  <img src={logo} alt="Logo" className="h-14 w-auto" />
                </div>
        <h2 className="mb-4 text-2xl font-bold text-white">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Login</button>

        <p className="mt-4 text-sm text-white">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
