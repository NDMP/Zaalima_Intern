import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeResume = async ({
  job,
  resumeText,
  matchedSkills,
  missingSkills,
  matchPercentage,
}) => {
  const prompt = `
You are an expert HR recruiter.

Analyze this candidate.

Job Title:
${job.title}

Job Description:
${job.description}

Required Skills:
${job.skills}

Resume:
${resumeText}

Current Analysis

Match Score:
${matchPercentage}%

Matched Skills:
${matchedSkills.join(", ")}

Missing Skills:
${missingSkills.join(", ")}

Return ONLY JSON.

{
  "summary":"...",
  "strengths":[
    "...",
    "..."
  ],
  "weaknesses":[
    "...",
    "..."
  ],
  "recommendation":"..."
}
`;

  const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: prompt,
});

  return response.text;
};