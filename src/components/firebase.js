import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCr737OmxRtihWQP3EtYxW3wlB6UEfdhQY",
    authDomain: "covid-survey-7f6f8.firebaseapp.com",
    projectId: "covid-survey-7f6f8",
    storageBucket: "covid-survey-7f6f8.appspot.com",
    messagingSenderId: "188123661477",
    appId: "1:188123661477:web:5cc9088f32ae3ec2e7394c"
};

// firebase.initializeApp(firebaseConfig)
// const storage = firebase.storage()
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const stateChange = onAuthStateChanged;
const storage = getStorage(app);


export { firebaseConfig, auth, storage, db, stateChange }