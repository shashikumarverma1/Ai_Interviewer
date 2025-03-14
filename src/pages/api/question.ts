import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyBaHc2NqF7TN18c3ImALmUCfsOBUbp0jR4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type ResponseData = {
  question?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { jobRole, jobDescription } = req.body;


    if (!jobRole) {
      return res.status(400).json({ error: "Job role and description are required." });
    }

    const prompt = `Generate 5 interview questions in json format for the job role: "${jobRole} and job description ${jobDescription} ignore job jobDescription if it is irrelavent"`;

  
    try {
      const result = await model.generateContent(prompt);
      let rawData = await result.response.text();
      let cleanedData = rawData.replace(/```json/g, "").replace(/```/g, "").trim();
      // cleanedData=JSON.parse(cleanedData)
      console.log(cleanedData, "cleanedData cleanedData")
  
      return res.status(200).json({ question: cleanedData });
    } catch (error) {
      console.error("Error :", error);
    }
    // Clean the response (remove markdown formatting)
  
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: "Failed to generate interview questions." });
  }
}

