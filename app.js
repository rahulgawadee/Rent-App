const express = require("express");
const cors = require("cors"); // Import cors middleware
const app = express();
const path = require("path");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const formRoutes = require('./routes/formRoutes');
const router = express.Router();

// const connectDB = require("./config/database");


app.use(cors()); // Allow all origins for simplicity, or configure specifically


// Import routes

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow React frontend on this port
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  credentials: true, // Allow cookies if needed
};


const { submitForm } = require("./controllers/formController"); // Import controller

// POST route to handle form submission and save data to MongoDB
router.post("/submit-form", submitForm); // Use controller for form submission
// connectDB(); 
// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON and cookies, and URL-encoded data
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
// app.use('/api/users', userRoutes);
// app.use('/api/properties', propertyRoutes);
// app.use('/api/applications', applicationRoutes);
app.use('/api', formRoutes); // The routes are prefixed with /api


// Serve static files (React build) for production
app.use(express.static(path.join(__dirname, "./frontend/build")));

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
});

// Middleware for Error Handlingg
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
