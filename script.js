import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 1. YOUR LIVE FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAhzd70-p7ZjQbLtosU3zKjr_9wIcgyGEQ",
  authDomain: "ttn-hangout.firebaseapp.com",
  projectId: "ttn-hangout",
  storageBucket: "ttn-hangout.firebasestorage.app",
  messagingSenderId: "1033809845518",
  appId: "1:1033809845518:web:54f5628ea61ab448534b",
  measurementId: "G-T4G5621KE2"
};

// 2. YOUR WHATSAPP GROUP INVITE LINK
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/JULXHYDWWs4CVSHknI9heq";

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("registration-form");
const submitBtn = document.getElementById("submit-btn");
const formSection = document.getElementById("form-section");
const successSection = document.getElementById("success-section");
const whatsappBtn = document.getElementById("whatsapp-btn");
const countdownEl = document.getElementById("countdown");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const registrationData = {
    fullName: document.getElementById("fullName").value.trim(),
    age: Number(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    organization: document.getElementById("organization").value.trim() || "N/A",
    referralSource: document.getElementById("referralSource").value,
    expectations: document.getElementById("expectations").value.trim(),
    submittedAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "registrations"), registrationData);

    // Swap form for confirmation message
    whatsappBtn.href = WHATSAPP_GROUP_URL;
    formSection.classList.add("hidden");
    successSection.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Countdown & auto-redirect to WhatsApp group
    let secondsLeft = 4;
    const timer = setInterval(() => {
      secondsLeft -= 1;
      countdownEl.textContent = secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(timer);
        window.location.href = WHATSAPP_GROUP_URL;
      }
    }, 1000);

  } catch (error) {
    console.error("Registration error:", error);
    alert("Could not complete registration. Please check your internet connection and try again.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Complete Registration";
  }
});
