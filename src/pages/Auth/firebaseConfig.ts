import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCIoKt-2jVpN50tr348w0hDbMuGF2uKyas",
  authDomain: "delivery-e580c.firebaseapp.com",
  projectId: "delivery-e580c",
  storageBucket: "delivery-e580c.appspot.com",
  messagingSenderId: "212891936855",
  appId: "1:212891936855:web:8e888b8bb617a93f9f5b12",
  measurementId: "G-79ERPL44T4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const twitterProvider = new TwitterAuthProvider();