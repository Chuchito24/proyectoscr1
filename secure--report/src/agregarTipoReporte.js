
const admin = require('firebase-admin');
const fs = require('fs');

// Carga tu archivo de clave privada aquí
const serviceAccount = require('./clave.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function actualizarTipoReporte() {
  const snapshot = await db.collection('reportes').get();

  const batch = db.batch();
  let count = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (!data.tipoReporte) {
      const ref = db.collection('reportes').doc(doc.id);

      // Detectar si tiene 'nombre' o 'representante' y deducir tipo
      const tipo = data.nombre ? 'personal' : (data.representante ? 'comunitario' : 'desconocido');

      batch.update(ref, { tipoReporte: tipo });
      count++;
    }
  });

  if (count > 0) {
    await batch.commit();
    console.log(`✅ Campo "tipoReporte" agregado a ${count} documentos`);
  } else {
    console.log('🎉 Todos los documentos ya tienen tipoReporte');
  }
}

actualizarTipoReporte().catch(console.error);
