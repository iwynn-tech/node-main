const { initializeApp, cert,applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../iwynn-gaming-admin.json');  // Ensure correct relative path
require('dotenv').config();  // Load environment variables from .env


let app;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Local environment: use the service account JSON file
    const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT);
    const serviceAccount = require(serviceAccountPath);
  
    app = initializeApp({
      credential: cert(serviceAccount),
    }, 'app');
  } else {
    // Cloud Run: use Google Application Default Credentials (ADC)
    app = initializeApp({
      credential: applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,  // Set explicitly if needed
    }, 'app');
  }

const db = getFirestore(app);

module.exports = { db };
