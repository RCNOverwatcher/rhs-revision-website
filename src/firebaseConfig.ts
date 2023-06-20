import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWjKKDkXVxmNzSphfKuxaaEWdsjB0dyls",
  authDomain: "richard-hale-revision-website.firebaseapp.com",
  projectId: "richard-hale-revision-website",
  storageBucket: "richard-hale-revision-website.appspot.com",
  messagingSenderId: "256665527183",
  appId: "1:256665527183:web:2290a01b76e0d75b9461fa",
  measurementId: "G-W0CHFCJGMV",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
