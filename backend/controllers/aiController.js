const { GoogleGenAI } = require("@google/genai");

const { conceptExplanPrompt, questionAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
    });


//@desc Generate interview questions and answers using Google GenAI    
//@route POST /api/ai/generate-questions
//@access Private

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicToFocusOn, numberOfQuestions } = req.body;
        if (!role || !experience || !topicToFocusOn || !numberOfQuestions) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const prompt = questionAnswerPrompt( role, experience, topicToFocusOn, numberOfQuestions);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        })
        let rawText = response.text
        // let clean it remove starting json and ending
        const cleanText = rawText.replace(/```json|```/g, "").trim();


        // Parse the cleaned text as JSON
        const data = JSON.parse(cleanText);
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Error generating interview questions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Generate concept explanations using Google GenAI
//@route POST /api/ai/generate-explanations
//@access Private

const generateConceptExplanations = async (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ message: "Question is required" });
      }
  
      const prompt = conceptExplanPrompt(question);
  
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt,
      });
  
      const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
      const cleanText = rawText.replace(/```json|```/g, "").trim();
  
      if (!cleanText.startsWith("{") && !cleanText.startsWith("[")) {
        console.warn("❌ Unexpected format:", cleanText.slice(0, 200));
        return res.status(500).json({ message: "Invalid AI response format" });
      }
  
      const data = JSON.parse(cleanText);
      res.status(200).json(data);
    } catch (error) {
      console.error("❌ Error generating concept explanations:", error);
      return res.status(500).json({
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Internal server error",
      });
    }
  };
  

module.exports = {
    generateInterviewQuestions,
    generateConceptExplanations
};