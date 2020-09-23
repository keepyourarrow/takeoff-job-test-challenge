import * as firebase from "firebase/app";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCCj_5-EEfN0hOZfsCeKjTg3len5lS06gs",
  authDomain: "takeoff-job.firebaseapp.com",
  databaseURL: "https://takeoff-job.firebaseio.com",
  projectId: "takeoff-job",
  storageBucket: "takeoff-job.appspot.com",
  messagingSenderId: "933276654792",
  appId: "1:933276654792:web:a7dca3afc3287a431f59fd",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//database
const db = firebase.firestore();

export { db, firebase };
