import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const app = initializeApp({
    apiKey: "AIzaSyATaoPykcsCfAMP2v7tX3PDMpPLzriWV_A",
    authDomain: "auth-development-782cd.firebaseapp.com",
    projectId: "auth-development-782cd",
    storageBucket: "auth-development-782cd.appspot.com",
    messagingSenderId: "511737757070",
    appId: "1:511737757070:web:aa6c7d603a2dde4ea638df"
})

export const auth =  getAuth(app);
export default app

export const database = getDatabase(app)