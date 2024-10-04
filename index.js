const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
const { HarmBlockThreshold, HarmCategory, GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', safetySettings: safetySettings });
async function textGenTextOnlyPrompt(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.get('/test/:prompt', async (req, res) => {
  const prompt = req.params.prompt || 'create a story about rabbit'; // Default jika prompt tidak ada
  console.log(prompt);

  const result = await textGenTextOnlyPrompt(prompt);
  res.send(`<pre>${result}</pre>`);
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
