import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyBaHc2NqF7TN18c3ImALmUCfsOBUbp0jR4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export default async function handler(req: { method: string; body: { question: any; answer: any;name:any , email:any , isLast:Boolean }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; question?: any; answer?: any; }): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
  if (req.method === 'POST') {
    const { question, answer , isLast, email , name } = req.body;

    if (!question || !answer || !email) {
      return res.status(400).json({ error: "Question and answer are required" });
    }
console.log(isLast  , email, "isLast")
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
    let data = JSON.parse(cleanedData)
    const feedbackResponse = {
        name,email,
      question,
      answer,
      score: data.score,
      feedback: data.feedback,
      improvement: data.improvement,
      timestamp: new Date().toISOString(),
    };
   
    
    const collectionName = `${name}`; // Change this to your collection name
    const docId = collectionName; // Unique document ID

  
    const docRefs = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRefs);

    if (!docSnap.exists()) {
      // First time: Create the document with the array
      await setDoc(docRefs, {   result:feedbackResponse });
      console.log("Document created & item added:");
    } else {
      // Document exists: Update it and push new item to array
      await updateDoc(docRefs, {
        result: arrayUnion( 
          feedbackResponse
        ),
      });
      console.log("New item added to existing array:",);
    }
    // const docRef = await addDoc(collection(db, "interviews"), interviewData);
    // console.log("Document written with ID: ", docRef.id);

    if(!isLast){
      return res.status(200).json(feedbackResponse);
    }else{
      const feedbackDataRaw = await getDocs(collection(db,collectionName));
      const allData: { id: string; }[] = [];
      feedbackDataRaw.forEach((doc) => {
        allData.push({ id: doc.id, ...doc.data() }); // Store docId with data
      });
    const feedbackRes=allData[0]?.result
   


    const totalScore = feedbackRes.reduce((sum: any, item: { score: any; }) => sum + (item.score || 0), 0);
    const avgScore = totalScore / feedbackRes.length;
    console.log(totalScore , "feedbackData")
    // Identify Strengths and Weaknesses
    const highScores = feedbackRes.filter((item: { score: number; }) => item.score >= 80);
    const lowScores = feedbackRes.filter((item: { score: number; }) => item.score < 50);

    const strengths = highScores.map((item:any) => item);
    const weaknesses = lowScores.map((item: { question: any; }) => item.question);
    
    // Collect Improvement Suggestions
    const improvements = feedbackRes.map((item: { improvement: any; }) => item.improvement).filter(Boolean);
   
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
    
      verdict,
    };
// console.log(summary)
    // return res.status(200).json(summary);
    await updateDoc(docRefs, {
      summary: arrayUnion( 
        summary
      ),

    })
    // res.setHeader('Allow', ['POST']);
  // res.status(405).json({ error: `Method ${req.method} not allowed` });

    
  }
  if(!isLast){
    return res.status(200).json(feedbackResponse);
  }else{
    const feedbackDataRaw = await getDocs(collection(db,collectionName));
    const allData: { id: string; }[] = [];
    feedbackDataRaw.forEach((doc) => {
      allData.push({ id: doc.id, ...doc.data() }); // Store docId with data
    });
  const feedbackRes=allData[0]?.result

  const totalScore = feedbackRes.reduce((sum: any, item: { score: any; }) => sum + (item.score || 0), 0);
  const avgScore = (totalScore / feedbackRes.length)*.01;
  console.log(totalScore , "feedbackData")
  
  let verdict;
  if (avgScore >= 80) {
    verdict = "Excellent performance! You have a strong understanding of React concepts.";
  } else if (avgScore >= 50) {
    verdict = "Good effort! You have a decent understanding but need improvement in some areas.";
  } else {
    verdict = "Needs improvement. Focus on learning core  React concepts and best practices.";
  }

  // Prepare summary response
  const summary:any = {
    avgScore: avgScore.toFixed(2),
  
    verdict,
  };
// console.log(summary)
  // return res.status(200).json(summary);
  await updateDoc(docRefs, {
    summary: arrayUnion( 
      summary
    ),

  })
 return  res.status(200).json(summary);
  // res.setHeader('Allow', ['POST']);
// res.status(405).json({ error: `Method ${req.method} not allowed` });

  
}
  // Handle non-POST requests
  
}}
