const express = require("express");
const { togglePinnedQuestion, updateQuestionNote, addQuestionsToSession} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addQuestionsToSession);
router.post("/:id/pin", protect, togglePinnedQuestion);
router.put("/:id/note", protect, updateQuestionNote);

module.exports = router;
