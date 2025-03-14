import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// pages/api/price.js
export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
      const { email ,  } = req.body;
      const collectionName = `Shashikant Verma`; // Change this to your collection name
    
  
      const feedbackDataRaw = await getDocs(collection(db,collectionName));
      const allData: { id: string; }[] = [];
      feedbackDataRaw.forEach((doc) => {
        allData.push({ id: doc.id, ...doc.data() }); // Store docId with data
      });
    const feedbackRes=[allData[0]?.result , allData[0]?.summary]
   console.log(feedbackRes , "feedbackRes feedbackRes")
      return res.status(200).json(feedbackRes);
  } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
