import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkMCSDpTJ9GgK0wcH4rTed656m-KGWkrs",
  authDomain: "bcu-study-spaces.firebaseapp.com",
  projectId: "bcu-study-spaces",
  storageBucket: "bcu-study-spaces.appspot.com",
  messagingSenderId: "786778083790",
  appId: "1:786778083790:web:c8ce283fe5259f1bfedb9f",
  measurementId: "G-8E331BQVHV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const auth = getAuth(app);