import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateWithModel = async (model, prompt) => {
  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
  });

  return response.text;
};

export const generateInterviewQuestions = async (
  title,
  skills,
  description
) => {
  const prompt = `
You are an expert technical interviewer.

Generate interview questions for the following job.

Job Title:
${title}

Required Skills:
${skills}

Job Description:
${description}

Generate exactly:

- 5 technical questions
- 3 coding questions
- 3 behavioral questions
- 3 HR questions

Return ONLY valid JSON.

{
  "technical": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ],
  "coding": [
    "...",
    "...",
    "..."
  ],
  "behavioral": [
    "...",
    "...",
    "..."
  ],
  "hr": [
    "...",
    "...",
    "..."
  ]
}
`;

  // Current stable models
  const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
  ];

  for (const model of models) {
    console.log(`\n========================================`);
    console.log(`Trying Gemini model: ${model}`);
    console.log(`========================================`);

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(
          `Attempt ${attempt}/2 using ${model}`
        );

        const result = await generateWithModel(
          model,
          prompt
        );

        console.log(
          "\n========== GEMINI INTERVIEW RESPONSE =========="
        );
        console.log(result);
        console.log(
          "================================================\n"
        );

        return result;

      } catch (error) {
        console.error(
          `Gemini ${model} failed on attempt ${attempt}:`,
          error.message
        );

        // Authentication / invalid request errors
        // should NOT be retried.
        if (
          error.status !== 503 &&
          error.status !== 429
        ) {
          throw error;
        }

        // Temporary server/rate-limit error
        if (attempt < 2) {
          const delay = 3000;

          console.log(
            `Temporary Gemini error. Retrying in ${
              delay / 1000
            } seconds...`
          );

          await sleep(delay);
        }
      }
    }

    console.log(
      `⚠️ ${model} unavailable. Trying next model...`
    );
  }

  throw new Error(
    "Gemini is temporarily unavailable. Please try again in a few minutes."
  );
};