const Question = require("../models/Question");
const session = require("../models/Session");

//@desc Add questions to a session
//@route POST /api/questions/add
//@access Private

exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const sessionData = await session.findById(sessionId);
    if (!sessionData) {
      return res.status(404).json({ message: "Session not found" });
    }

    // create a new Question
    const createdQuestions = await Question.insertMany(
        questions.map((q)=>({
            question: q.question,
            answer: q.answer,
            // note: q.note || "",
            // pinned: q.pinned || false,
            session: sessionId
        })
    ));

    //update session with new questions

    sessionData.questions.push(...createdQuestions.map(q => q._id));
    await sessionData.save();

    return res.status(200).json({
        success: true,
        message: "Questions added successfully",
        addedQuestions: createdQuestions,
      });
    


  } catch (error) {
    console.error("Error adding questions to session:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Toggle pinned status of a question
//@route POST /api/questions/:id/pin
//@access Private

exports.togglePinnedQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    question.isPinned = !question.isPinned;
    await question.save();
    return res.status(200).json({
      success: true,
      message: "Question pinned status updated",
      question,
    });
  } catch (error) {
    console.error("Error adding questions to session:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Update note for a question
//@route PUT /api/questions/:id/note
//@access Private

exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    question.note = note || "";
    await question.save();
    return res.status(200).json({
      success: true,
      message: "Question note updated",
      question,
    });
  } catch (error) {
    console.error("Error adding questions to session:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
