import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, FacebookAuthProvider } from 'firebase/auth';

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

// Configuración mejorada de proveedores
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');

export const twitterProvider = new TwitterAuthProvider();
twitterProvider.setCustomParameters({
  request_email: 'true' 
});

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: 'popup',
  auth_type: 'rerequest' // Solicitar permisos nuevamente si fueron rechazados
});
