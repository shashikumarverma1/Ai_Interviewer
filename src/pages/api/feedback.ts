
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyBaHc2NqF7TN18c3ImALmUCfsOBUbp0jR4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fs = require('fs');  // Import File System module
const path = require('path');

const filePath = path.join(__dirname, 'data.json'); // Path to the JSON file

export default async function handler(req: { method: string; body: { question: any; answer: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; question?: any; answer?: any; }): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
    if (req.method === 'POST') {
      const { question, answer } = req.body;
  
      if (!question || !answer) {
        return res.status(400).json({ error: "Question and answer are required" });
      }
  
    //   const datass = fs.readFileSync(filePath, 'utf-8');

      const prompt = `
      Evaluate the given answer to the following question:
      Question: "${question}"
      User Answer: "${answer}"

      Provide:
      1. A correctness score from 0 to 100.
      2. A brief review of the answer.
      3. Suggested improvements if the answer is incorrect.
      Format the response as JSON:
      {
        "score": number,
        "feedback": string,
        "improvement": string
      }
    `;
    const result = await model.generateContent(prompt);
      // Simulating storing feedback (In a real app, save to a database)
      const responseText = result.response.text();

      let cleanedData = responseText
      .replace(/```json/g, "") // Remove opening ```json
      .replace(/```/g, "") // Remove closing ```
      .trim(); 
// console.log(cleanedData , "responseText")
let data= JSON.parse(cleanedData)
      const feedbackResponse = {
        question,
        answer,
        score: data.score,
        feedback: data.feedback,
        improvement: data.improvement,
        timestamp: new Date().toISOString(),
      };
   
    //   const datas = fs.readFileSync(filePath, 'utf-8');
// console.log(datas , "datas")
  console.log(feedbackResponse ,    "feedbackResponse") 
      return res.status(200).json(feedbackResponse);
    }
  
    // Handle non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  