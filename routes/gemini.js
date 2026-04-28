// routes/gemini.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// ✅ correct initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
});

router.post("/match-reason", async (req, res) => {
  try {
    const { volunteer, match, caseData } = req.body;

    const prompt = `
You are ImpactGrid AI.

Explain why this volunteer is suitable.

Case:
${JSON.stringify(caseData)}

Volunteer:
${JSON.stringify(volunteer)}

Match:
${JSON.stringify(match)}

Give 3 short bullet points.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    res.json({
      success: true,
      reason: text,
    });

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      success: false,
      reason: "AI reasoning failed",
    });
  }
});

module.exports = router;