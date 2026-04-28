const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/test", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = result.response.text();

    console.log("AI OUTPUT:", text);

    res.json({ output: text });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);

    res.json({
      error: error.message,
    });
  }
});

module.exports = router;