const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || "ddaapp";

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { username, email, password } = decoded.user;

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }]
    });
    if (!user) return res.status(404).json({ error: "User not found with token" });

    const isMatch = user.password === password;
    if (!isMatch) return res.status(400).json({ error: "Invalid password with token" });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
