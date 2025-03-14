import { auth } from "@/pages/api/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useGoogleAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
   async function registerUser(user:any) {
        console.log(user , "feedbackData")
        try {
          const response = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email:'' ,
              name:''
            }),
          });
      
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error submitting feedback:", error);
        }
      }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          registerUser(user)
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
        
      });
  
      return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);
  
    return { user, loading };
  };