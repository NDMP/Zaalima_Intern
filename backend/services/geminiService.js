import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateInterviewQuestions = async (
  title,
  skills,
  description
) => {

    console.log("Gemini Key:", process.env.GEMINI_API_KEY?.substring(0, 8));
  const prompt = `
You are an expert technical interviewer.

Generate interview questions for the following job.

Job Title:
${title}

Required Skills:
${skills}

Job Description:
${description}

Return ONLY valid JSON.

{
  "technical":[
    "...",
    "..."
  ],
  "coding":[
    "...",
    "..."
  ],
  "behavioral":[
    "...",
    "..."
  ],
  "hr":[
    "...",
    "..."
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return response.text;
}