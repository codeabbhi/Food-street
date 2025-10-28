const admin = require("firebase-admin");
require("dotenv").config();

// Initialize Firebase Admin SDK
// Note: You need to download your Firebase service account key from Firebase Console
// Go to: Project Settings > Service Accounts > Generate New Private Key

// For now, using environment variables (you can also use a service account JSON file)
try {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    // If using service account JSON file:
    // credential: admin.credential.cert(require("../serviceAccountKey.json"))
    
    // If using default credentials:
    credential: admin.credential.applicationDefault(),
  });
  
  console.log("✅ Firebase Admin SDK Initialized");
} catch (error) {
  console.error("❌ Firebase initialization error:", error.message);
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
