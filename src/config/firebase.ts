import admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json'; // Asegúrate de que esta ruta sea correcta

// Inicializar Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

export { db };