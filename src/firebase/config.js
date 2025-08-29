import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDwHzh7ZcC2gguXA1Q5ansLriDQkIuGOHQ",
    authDomain: "etecnicolasteste.firebaseapp.com",
    projectId: "etecnicolasteste",
    storageBucket: "etecnicolasteste.firebasestorage.app",
    messagingSenderId: "69238121675",
    appId: "1:69238121675:web:50b88ed6a83d487702e74e",
    measurementId: "G-NS10W6GQ12"
}
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);