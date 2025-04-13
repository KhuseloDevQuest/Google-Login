import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDG9Kph4pAXSpqBNvEfP3GqXEijjjVFYvk",
  authDomain: "login-3fba9.firebaseapp.com",
  projectId: "login-3fba9",
  storageBucket: "login-3fba9.appspot.com", // ✅ Fixed here
  messagingSenderId: "675549154899",
  appId: "1:675549154899:web:360c26bd656935e9bb00a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("google-login-btn");

// Google login event
googleLogin?.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Signed in user:", user);
      alert(`Welcome, ${user.displayName}!`);
      window.location.href = "/logged.html"; // Redirect after login
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error.code, error.message);
      alert("Sign-in failed: " + error.message);
    });
});

// Function to update the user profile UI
function UpdateUserProfile(user) {
  const userName = user.displayName;
  const userEmail = user.email;
  const userProfilePicture = user.photoURL;

  console.log("User email:", userEmail);

  // Make sure these elements exist on the page
  document.getElementById("userName").textContent = userName;
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userProfilePicture").src = userProfilePicture;
}

// Listen for user state
onAuthStateChanged(auth, (user) => {
  if (user) {
    UpdateUserProfile(user); // ✅ Call the function correctly
  } else {
    alert("Please create an account or log in.");
    window.location.href = "/index.html";
  }
});
