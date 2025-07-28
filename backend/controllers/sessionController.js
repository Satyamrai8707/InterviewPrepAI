const Session = require("../models/Session");
// const User = require('../models/User');
const Question = require("../models/Question");

// @desc    Create a new session
// @route   POST /api/sessions/create
// @access  Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicToFocusOn, description, questions } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
    }

    if (!role || !experience || !topicToFocusOn || !description || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ success: false, message: "Missing or invalid fields" });
    }

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicToFocusOn,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, response: session }); // ✅ return response
  } catch (error) {
    console.error("Backend Error:", error); // 👈 log actual error
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};




// @desc    Get all sessions for the authenticated user
// @route   GET /api/sessions/my-sessions
// @access  Private
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
    .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .populate("questions");
    res.status(200).json(sessions)
    }
    catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}

// @desc    Get session by ID
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({path: "questions", options: { sort: { isPinned: -1,createdAt: 1 } }}) // Populate questions and sort by creation date

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json(session);

  }
    catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}



// @desc    Delete a session by ID
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
        return res.status(404).json({
        success: false,
        message: "Session not found",
        });
    }
    if(session.user.toString() !== req.user.id) {
        return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this session",
        });
    }
        
    // Delete all questions associated with the session
    await Question.deleteMany({ session: session._id });
    // Delete the session
    await session.deleteOne();
    res.status(200).json({
        success: true,
        message: "Session deleted successfully",
    });

  }
    catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}
