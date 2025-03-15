import { GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth";
import { auth } from "./firebaseConfig";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  
   
  try {
    const result = await signInWithPopup(auth, provider);
    document.cookie = "token=your-secure-token; path=/";
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const signOutUser = async () => {
  try {
    
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

