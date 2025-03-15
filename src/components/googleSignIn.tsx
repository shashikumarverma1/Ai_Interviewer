"use client";

import { auth } from "@/pages/api/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken(); // ✅ Get Firebase Token

    // 🔹 Send token to API to store in HTTP-Only cookie
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    console.log("✅ User Signed In:", result.user);
    return result.user;
  } catch (error) {
    console.error("❌ Error signing in:", error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);

    // 🔹 Inform backend to remove cookie
    await fetch("/api/logout", { method: "POST" });

    console.log("✅ User Signed Out");
  } catch (error) {
    console.error("❌ Error signing out:", error);
  }
};

export default function SignInButton() {
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}