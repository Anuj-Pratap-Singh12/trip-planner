// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq0-vupXMaMs-BzVUojOZqdf58zjncaKM",
  authDomain: "trip-planner-55580.firebaseapp.com",
  projectId: "trip-planner-55580",
  storageBucket: "trip-planner-55580.firebasestorage.app",
  messagingSenderId: "127219856165",
  appId: "1:127219856165:web:6afda8a5781b4db33220cc",
  measurementId: "G-KDS9WXCP89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);