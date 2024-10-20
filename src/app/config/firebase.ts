
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-2024-14fdb.firebaseapp.com",
  projectId: "revents-2024-14fdb",
  storageBucket: "revents-2024-14fdb.appspot.com",
  messagingSenderId: "601122234945",
  appId: "1:601122234945:web:a14c36fefe7e7c4ce11cc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);