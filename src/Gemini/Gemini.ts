import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyBaHc2NqF7TN18c3ImALmUCfsOBUbp0jR4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GenerateContent(prompt: string) {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }

}
