const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "ddaapp";

const authAdminMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { username, email, password } = decoded.user;

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!user) return res.status(404).json({ error: "Invalid token" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid token" });

    if (user.role !== "admin") {
      return res.status(400).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authAdminMiddleware;
