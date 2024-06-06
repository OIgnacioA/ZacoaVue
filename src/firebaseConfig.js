// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDZj6P89x-gsWmqwU1xEh7j67QouDeoJfg",
  authDomain: "sacoa-38.firebaseapp.com",
  projectId: "sacoa-38",
  storageBucket: "sacoa-38.appspot.com",
  messagingSenderId: "873465637553",
  appId: "1:873465637553:web:0b7cebeef3eb0c334a9090",
  measurementId: "G-7T1DFS7PFG"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Inicializa Firestore y exporta la instancia
const db = getFirestore(app);
export { db };
export { auth };