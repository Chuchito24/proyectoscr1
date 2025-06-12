// src/pages/FireBase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwdloMF_7UZes4FUGXOefhzIPVDq2EbRM",
  authDomain: "report-6978b.firebaseapp.com",
  projectId: "report-6978b",
  storageBucket: "report-6978b.appspot.com", // corregido
  messagingSenderId: "2524575534",
  appId: "1:2524575534:web:aa92ee152e0c4863476cbf",
  measurementId: "G-1D1RMSXSTQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
const auth = getAuth(app);

export { auth };
