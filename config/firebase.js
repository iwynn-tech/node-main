const { initializeApp, cert,applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();  // Load environment variables from .env


let app;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Local environment: use the service account JSON file

    const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);
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
