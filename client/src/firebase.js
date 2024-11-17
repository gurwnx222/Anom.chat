// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import the auth module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyD89f9MSBagfretbQk9Ibzh8HBEw_3mH6k",
  authDomain: "anom-clusters.firebaseapp.com",
  projectId: "anom-clusters",
  storageBucket: "anom-clusters.appspot.com",
  messagingSenderId: "26395735365",
  appId: "1:26395735365:web:82c44ce1e611e5fdc33a2c",
  measurementId: "G-0BRRGQY5JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export the auth object
const auth = getAuth(app);

// Export the auth object so you can use it in other files
export { auth };
