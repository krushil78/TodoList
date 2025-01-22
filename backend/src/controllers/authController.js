const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
dotenv.config();

// signup for create a new user

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create the user and save it to the database
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
};


// login

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials, password mismatch" });
    }


    // If the password matches, create a token
    const token = jwt.sign({ id: user._id , username: user.username}, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return the token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Logout function
const logout = (req, res) => {
  // Client will handle token removal on their side, so just respond with a success message.
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };
