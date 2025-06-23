import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  orderBy
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../style/ConsultarEliminar.css';

export default function ConsultarEliminar() {
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const usuario = auth.currentUser;
        if (!usuario) {
          setError('No estás autenticado');
          navigate('/login');
          return;
        }

        const reportesQuery = query(
          collection(db, 'reportes'),
          where('usuarioId', '==', usuario.uid),
          orderBy('fecha', 'desc')
        );

        const snapshot = await getDocs(reportesQuery);
        const lista = snapshot.docs.map((doc) => ({
          firebaseId: doc.id,
          ...doc.data(),
        }));
        setReportes(lista);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setError('Error al obtener reportes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportes();
  }, [navigate]);

  const handleDelete = async (firebaseId) => {
    try {
      await deleteDoc(doc(db, 'reportes', firebaseId));
      setReportes((prev) => prev.filter((r) => r.firebaseId !== firebaseId));
      setSuccessMessage('Reporte eliminado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al eliminar reporte:', error);
      setError('Error al eliminar reporte');
    }
  };

  const handlePublish = async (firebaseId) => {
    try {
      const ref = doc(db, 'reportes', firebaseId);
      await updateDoc(ref, {
        publico: true,
      });

      setReportes((prev) =>
        prev.map((r) =>
          r.firebaseId === firebaseId ? { ...r, publico: true } : r
        )
      );
      setSuccessMessage('Reporte publicado con éxito');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al publicar reporte:', error);
      setError('Error al publicar reporte');
    }
  };

  return (
    <div className="consultar-container">
      <h2>📋 Reportes Creados</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {isLoading ? (
        <p>Cargando reportes...</p>
      ) : reportes.length === 0 ? (
        <p>No hay reportes aún.</p>
      ) : (
        <table>
  <thead>
    <tr>
      <th>Firebase ID</th>
      <th>ID</th>
      <th>Dirección</th>
      <th>Fecha</th>
      <th>Tipo de reporte</th>
      <th>Nombre</th>
      <th>Representante</th>
      <th>Acontecimiento</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {reportes.map((r) => (
      <tr key={r.firebaseId}>
        <td>{r.firebaseId}</td>
        <td>{r.id}</td>
        <td>{r.direccion}</td>
        <td>{r.fecha}</td>
        <td>{r.tipoReporte || '—'}</td>
        <td>{r.tipoReporte === 'personal' ? r.nombre : '—'}</td>
        <td>{r.tipoReporte === 'comunitario' ? r.representante : '—'}</td>
        <td>{r.acontecimiento}</td>
        <td>{r.publico ? 'Público' : 'Privado'}</td>
        <td>
          <button onClick={() => handleDelete(r.firebaseId)}>🗑 Eliminar</button>
          {!r.publico && (
            <button onClick={() => handlePublish(r.firebaseId)}>📢 Publicar</button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}

      <div className="botones-navegacion">
        <button onClick={() => navigate('/Actualizar')}>✏️ Ir a actualizar</button>
        <button onClick={() => navigate('/Principal')}>🏠 Volver al inicio</button>
      </div>
    </div>
  );
}
