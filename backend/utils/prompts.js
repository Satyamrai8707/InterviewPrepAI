const questionAnswerPrompt = (
  role,
  experience,
  topicToFocusOn,
  numberOfQuestions
) =>
  `You are an AI trained to generate technical interview questions and answers.

    Task:
    - Role: ${role}
    -Candidate Experience: ${experience} years
    - Topic to Focus On: ${topicToFocusOn}
    - Write ${numberOfQuestions} interview questions and answers.
    -For each question, generate a details but beginner friendly answer.
    -If the anser needs a code example, provide a simple code snippet in the answer.
    -Keep formatting very clean.
    -Return the questions and answers in JSON format with the following structure:
    [
      {
        "question": "Question text here?",
        "answer": "Answer text here."
      },
      ...
    ]
      Important: Do not include any explanations or additional text outside the JSON structure.


    `;

const conceptExplanPrompt = (question) => `
    You are an AI trained to generate detailed explanations for technical concepts.
    Task:
    -Explain the following interview question and its concept in depth as if you're teachimg a beginner developer.
    -Question: ${question} 
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header
    - If the explanation includes a code example, provide a small code block.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format:
    [
      {
        "title": "Short title here?",
        "explanation": "Explanation here."
      }
    ]
      Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
    `;

module.exports = {
    questionAnswerPrompt,
    conceptExplanPrompt,
    };