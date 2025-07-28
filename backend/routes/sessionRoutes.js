const express = require("express");
const { createSession, getSessionById, deleteSession, getMySessions } = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Session Routes
router.post("/create", protect, createSession); // Create a new session
router.get("/my-sessions", protect, getMySessions); // Get all sessions for the authenticated user
router.get("/:id", protect, getSessionById); // Get session by ID
router.delete("/:id", protect, deleteSession); // Delete a session by ID

module.exports = router;