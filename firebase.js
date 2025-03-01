// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsXoOZDHlYuuzgOSYKudQYLzNrMGiaBMs",
  authDomain: "content-taker.firebaseapp.com",
  projectId: "content-taker",
  storageBucket: "content-taker.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "352022331013",
  appId: "1:352022331013:web:b82ac935b4c0a8e97373ec",
  measurementId: "G-ENQ0EDYT82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Keep analytics if you need it
const auth = getAuth(app); // Initialize authentication

// Export the authentication instance
export { auth };
