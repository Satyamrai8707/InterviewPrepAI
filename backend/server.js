require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middleware/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanations } = require("./controllers/aiController");

const app = express();
app.use(express.json());
// Middleware to handle CORS
const PORT = process.env.PORT || 3500; // ✅ Define PORT early

app.use(
  cors({
    origin: "*", // Allow all origins by default
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB(); // Connect to the database

// Middleware to parse JSON bodies

//routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.post("/api/ai/generate-questions", protect,generateInterviewQuestions);
app.post("/api/ai/generate-explainations", protect,generateConceptExplanations);


//Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

//Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

