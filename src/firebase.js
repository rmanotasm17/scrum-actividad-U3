import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-BlcFRLLJBgmVbH5olursGhn9QF9tPbw",
    authDomain: "taller-u3.firebaseapp.com",
    projectId: "taller-u3",
    storageBucket: "taller-u3.appspot.com",
    messagingSenderId: "707107832279",
    appId: "1:707107832279:web:1110a0770c5ff67ff48b92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}