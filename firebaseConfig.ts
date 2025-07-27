// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD17gbezsUu5DC5CB3d1XCrFiYPKh5h8ag",
  authDomain: "nobisoft-nextjs-website.firebaseapp.com",
  projectId: "nobisoft-nextjs-website",
  storageBucket: "nobisoft-nextjs-website.appspot.com",
  messagingSenderId: "113310355869",
  appId: "1:113310355869:web:b05d284def9f047f88df74",
  measurementId: "G-EEL77JBKPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// const auth = getAuth(app)
// const analytics = getAnalytics(app);
export default app;
export { auth };

