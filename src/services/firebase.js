// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCX84VH9kSw7HRP4Z0OdTB-4ORsJJAs2NE",
  authDomain: "elaw-784b6.firebaseapp.com",
  projectId: "elaw-784b6",
  storageBucket: "elaw-784b6.firebasestorage.app",
  messagingSenderId: "827606112018",
  appId: "1:827606112018:web:5627535082fd7597b385cb",
  measurementId: "G-3HG5RDTVND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
