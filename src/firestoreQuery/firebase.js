// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5JEpjrXnuJYFXuDeDs5NWPN_3h07EuSA",
  authDomain: "sociol-f6a41.firebaseapp.com",
  projectId: "sociol-f6a41",
  storageBucket: "sociol-f6a41.appspot.com",
  messagingSenderId: "27859079262",
  appId: "1:27859079262:web:8a761c1a93aa2a3d2ba4cf",
  measurementId: "G-TT3LJ3QBR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);