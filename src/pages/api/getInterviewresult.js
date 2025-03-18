import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { NumberOfQuestion } from "./propmt";

export default async function handler(req, res) {
  if (req.method === 'POST') {
      const { email } = req.body;
      const collectionName = `${email}` ;// Change this to your collection name

  const feedbackDataRaw = await getDocs(collection(db,collectionName));
  const allData= [];
  feedbackDataRaw.forEach((doc) => {
    allData.push({ id: doc.id, ...doc.data() }); // Store docId with data
  });
const feedbackRes=allData[0]?.result?.slice(allData[0]?.result?.length - NumberOfQuestion)

const totalScore = feedbackRes?.reduce((sum, item) => sum + (item.score || 0), 0);
const avgScore = totalScore / feedbackRes?.length;
console.log(allData[0]?.result.length , "feedbackData")

const highScores = feedbackRes?.filter((item) => item.score >= 80);
const lowScores = feedbackRes?.filter((item) => item.score < 50);


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
"strengths":highScores,
"weaknesses":lowScores?.length ,
"interviewCompleted":Math.floor(Math.abs(allData[0]?.result?.length / NumberOfQuestion)),
  verdict,
};
console.log(summary , "summary summary")
      return res.status(200).json([feedbackRes ,summary ]);
  } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
