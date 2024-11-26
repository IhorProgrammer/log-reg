// import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "./firebase";


export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    
  return null //createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return null //signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return null //auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return null //sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return null //updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return null // sendEmailVerification(auth.currentUser, { url: `${window.location.origin}/home`, });
};