const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateTagsFromText(caption = "") {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("Gemini key missing");
      return [];
    }

    console.log("Generating AI tags for caption:", caption);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Generate 5 short lowercase tags for this event media caption.
Return only comma-separated tags.

Caption: ${caption}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("Gemini raw response:", text);

    return text
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 5);
  } catch (error) {
  console.log("Gemini tag generation failed:", error.message);

  return caption
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 3)
    .slice(0, 5);
}
}

module.exports = {
  generateTagsFromText,
};