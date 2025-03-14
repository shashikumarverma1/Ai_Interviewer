"use client";
import { signInWithGoogle } from "@/pages/api/auth";


export default function SignInButton() {
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}



