// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBo8hyUFTDbCrIDLxdrComiVoWiGwscFg",
  authDomain: "aiinterview-f2d24.firebaseapp.com",
  projectId: "aiinterview-f2d24",
  storageBucket: "aiinterview-f2d24.firebasestorage.app",
  messagingSenderId: "404237234091",
  appId: "1:404237234091:web:1c66742c17948c80f06cee",
  measurementId: "G-QSMWQDEFDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase Services
export { auth, db, storage };
export default app;