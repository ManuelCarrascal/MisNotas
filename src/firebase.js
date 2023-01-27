import { initializeApp } from 'firebase/app';
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLABJoTXi3UeE6bbkdOuYXWYEkpNte9TU",
    authDomain: "mynotesdb-32056.firebaseapp.com",
    databaseURL: "https://mynotesdb-32056-default-rtdb.firebaseio.com",
    projectId: "mynotesdb-32056",
    storageBucket: "mynotesdb-32056.appspot.com",
    messagingSenderId: "606094503113",
    appId: "1:606094503113:web:c4f6c390df2e4ebb5f3118"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);

