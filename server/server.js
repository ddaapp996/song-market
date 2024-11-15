const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const { swaggerUi, swaggerDocs } = require('./config/swagger');
require("dotenv").config();
const path = require('path');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
connectDB();

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/musics', express.static(path.join(__dirname, 'public/musics')));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const bannerRoutes = require("./routes/banners");

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/banners", bannerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Song Market API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
