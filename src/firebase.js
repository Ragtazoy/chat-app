import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXqPRUUaJz_0p8jdB2CbT327OHYmDx5Es",
  authDomain: "chat-app-be64e.firebaseapp.com",
  projectId: "chat-app-be64e",
  storageBucket: "chat-app-be64e.appspot.com",
  messagingSenderId: "893762783383",
  appId: "1:893762783383:web:a2256a8713a6cd23ea01d2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
