import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function middleware(request: NextRequest) {
  const token =false // ||  request.cookies.get('authToken')?.value;
  const protectedRoutes = ['/Dashboard', '/Home' , "/"];
console.log(protectedRoutes , "protectedRoutes")
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      await admin.auth().verifyIdToken(token); // Verify token with Firebase
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Dashboard', '/Home' , "/"] // Apply middleware to protected routes
};
