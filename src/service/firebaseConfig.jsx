import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnToDiVPy4QtAGrlnvuaBDExkaGi1u-l8",
  authDomain: "tripon-67934.firebaseapp.com",
  projectId: "tripon-67934",
  storageBucket: "tripon-67934.firebasestorage.app",
  messagingSenderId: "35396593533",
  appId: "1:35396593533:web:6e42885c9d69b019750e14",
  measurementId: "G-TTMY64TPCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);