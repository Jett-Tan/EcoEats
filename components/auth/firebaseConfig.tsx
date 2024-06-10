import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyATf10hmBxhqva9Y3yAl_l9IeHi41LCwdk",
  authDomain: "ecoeats-00000.firebaseapp.com",
  projectId: "ecoeats-00000",
  storageBucket: "ecoeats-00000.appspot.com",
  messagingSenderId: "423747071672",
  appId: "1:423747071672:web:58e2da9a11fcffe72b4e4d",
  databaseURL: "https://ecoeats-00000-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

export const database = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// Jimin1310!