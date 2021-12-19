import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  orderBy,
  query,
  where,
  increment,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM_4zX9u3abAkyU6fZGYLRxmiakFFZI4g",
  authDomain: "my-assignments-1279e.firebaseapp.com",
  projectId: "my-assignments-1279e",
  storageBucket: "my-assignments-1279e.appspot.com",
  messagingSenderId: "681637152242",
  appId: "1:681637152242:web:2e24488f5acc085279576b",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  increment,
  deleteDoc,
};
