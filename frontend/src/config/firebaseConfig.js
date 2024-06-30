// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA62awH7x4P-CeAyXe5mIyxZSwZqdF481g",
  authDomain: "engcenter-cd204.firebaseapp.com",
  projectId: "engcenter-cd204",
  storageBucket: "engcenter-cd204.appspot.com",
  messagingSenderId: "890606826813",
  appId: "1:890606826813:web:3be4a5d05821cb70fc4154",
  measurementId: "G-QS7K199SRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);