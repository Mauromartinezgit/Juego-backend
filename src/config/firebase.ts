import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// En producción, usar variables de entorno
// En desarrollo, usar archivo local
let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Producción (Render)
  credential = admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  );
} else {
  // Desarrollo local
  const serviceAccount = require('../../serviceAccountKey.json');
  credential = admin.credential.cert(serviceAccount);
}

admin.initializeApp({
  credential: credential,
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

export const db = admin.firestore();
export default admin;