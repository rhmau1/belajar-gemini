const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
async function textGenTextOnlyPrompt() {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = 'Write a story about a rabbit and fox';

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

textGenTextOnlyPrompt();
