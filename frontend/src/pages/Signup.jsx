import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/fevicon.svg';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error state before validation
    setError(null);

    // Check for required fields
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Optional: Add more validation checks (e.g., valid email, password length, etc.)
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Call the signup function if everything is valid
    try {
      await signup(formData);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-800">
 
      <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded shadow-md">
      <div className="flex justify-center mb-4  ">
          <img src={logo} alt="Logo" className="h-14 w-auto" />
        </div>
        <h2 className="mb-4 text-2xl font-bold text-white">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border bg-gray-200  rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border bg-gray-200 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border bg-gray-200 rounded"
        />
        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded">
          Sign Up
        </button>
        <p className="mt-4 text-sm text-white">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
