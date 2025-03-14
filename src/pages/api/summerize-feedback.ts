import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "feedback.json"); // Store feedback in 'data' folder

export default async function handler(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; avgScore?: string; strengths?: any; weaknesses?: any; improvementTips?: any; verdict?: string; error?: any; }): any; new(): any; }; }; }) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Read existing feedback
    const fileData = await fs.readFile(filePath, "utf8");
    const feedbackData = JSON.parse(fileData);

    if (!feedbackData || feedbackData.length === 0) {
      return res.status(200).json({ message: "No feedback available for summarization." });
    }

    // Calculate Average Score
    const totalScore = feedbackData.reduce((sum: any, item: { score: any; }) => sum + (item.score || 0), 0);
    const avgScore = totalScore / feedbackData.length;

    // Identify Strengths and Weaknesses
    const highScores = feedbackData.filter((item: { score: number; }) => item.score >= 80);
    const lowScores = feedbackData.filter((item: { score: number; }) => item.score < 50);

    const strengths = highScores.map((item: { question: any; }) => item.question);
    const weaknesses = lowScores.map((item: { question: any; }) => item.question);
    
    // Collect Improvement Suggestions
    const improvements = feedbackData.map((item: { improvement: any; }) => item.improvement).filter(Boolean);
    
    // Final Verdict
    let verdict;
    if (avgScore >= 80) {
      verdict = "Excellent performance! You have a strong understanding of React concepts.";
    } else if (avgScore >= 50) {
      verdict = "Good effort! You have a decent understanding but need improvement in some areas.";
    } else {
      verdict = "Needs improvement. Focus on learning core  React concepts and best practices.";
    }

    // Prepare summary response
    const summary = {
      avgScore: avgScore.toFixed(2),
      strengths: strengths.length ? strengths : ["No strong areas identified."],
      weaknesses: weaknesses.length ? weaknesses : ["No weak areas identified."],
      improvementTips: improvements.length ? improvements : ["No improvement suggestions available."],
      verdict,
    };

    return res.status(200).json(summary);
  } catch (error) {
    return res.status(500).json({ message: "Error reading feedback data", error: error.message });
  }
}
