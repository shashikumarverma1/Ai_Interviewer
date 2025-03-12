// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyBaHc2NqF7TN18c3ImALmUCfsOBUbp0jR4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fs = require('fs');  // Import File System module
const path = require('path');



type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const result = await model.generateContent("give me 5 interview question on react in json format");
  
// const filePath = path.join(__dirname, 'data.json'); // Path to the JSON file
// Read the file and store its contents in a variable
    let data = null;
    try {
      // data = fs.readFileSync(filePath, 'utf-8');
      console.log(data, "datkkkkka");
    } catch (error) {
      console.error("Error reading data.json:", error);
      return res.status(500).json({ name: "Error reading data.json" });
    }
    // Convert JSON string to JavaScript object
    let rawData = await result.response.text();
        // Remove any unwanted markdown formatting (e.g., ```json ... ```)
        let cleanedData = rawData
        .replace(/```json/g, "") // Remove opening ```json
        .replace(/```/g, "") // Remove closing ```
        .trim(); // Trim extra spaces and new lines
  // console.log(cleanedData , "cleanedData")
    res.status(200).json({ name: cleanedData});
} catch (error) {
    console.error("Error generating content:", error);
}
 
}
