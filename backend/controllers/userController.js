const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/userModel");

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(email, userName, hashedPassword);
    await user.save();
    console.log(user);

    res
      .status(201)
      .json({ success: true, message: `User registered successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res
        .status(401)
        .send({ error: "Invalid email or password.", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ error: "Invalid email or password.", success: false });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );

    res.status(200).json({
      token,
      userId: user._id,
      userName: user.userName,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Authentication middleware
exports.authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ success: false, error: "Please provide Authorization" });
  }

  const arr = req.headers.authorization.split(" ");

  if (arr.length !== 2 || arr[0] !== "Bearer") {
    return res
      .status(401)
      .json({ success: false, error: "Please use Bearer scheme" });
  }

  try {
    const decoded = jwt.verify(arr[1], JWT_SECRET);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

//Get user by Id

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = decoded.userId;
    const { newUserName, newEmail } = req.body;

    const updatedUser = await User.updateProfile(userId, newUserName, newEmail);

    if (!updatedUser) {
      return res.status(404).send({ message: "Unable to update profile" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
