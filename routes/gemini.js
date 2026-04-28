const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/reason", async (req, res) => {
  console.log("🔥 API HIT"); // 👈 VERY IMPORTANT

  try {
    const volunteer = req.body.volunteer || req.body;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const prompt = `
Give 2 short reasons why this volunteer is suitable:
${JSON.stringify(volunteer)}
`;

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = result.response.text();

    console.log("✅ AI:", text);

    res.json({ reasoning: text });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.json({ reasoning: "AI failed" });
  }
});

module.exports = router;