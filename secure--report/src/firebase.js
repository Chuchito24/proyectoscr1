import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwdloMF_7UZes4FUGXOefhzIPVDq2EbRM",
  authDomain: "report-6978b.firebaseapp.com",
  projectId: "report-6978b",
  storageBucket: "report-6978b.appspot.com",
  messagingSenderId: "2524575534",
  appId: "1:2524575534:web:aa92ee152e0c4863476cbf",
  measurementId: "G-1D1RMSXSTQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
