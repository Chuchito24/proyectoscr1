import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../Style/ConsultarEliminar.css';

export default function ConsultarEliminar() {
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const usuario = auth.currentUser;
        if (!usuario) {
          setError('No estás autenticado');
          return;
        }

        const reportesQuery = query(
          collection(db, 'reportes'),
          where('usuarioId', '==', usuario.uid)
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
      }
    };

    fetchReportes();
  }, []);

  const handleDelete = async (firebaseId) => {
    try {
      await deleteDoc(doc(db, 'reportes', firebaseId));
      setReportes((prev) => prev.filter((r) => r.firebaseId !== firebaseId));
    } catch (error) {
      console.error('Error al eliminar reporte:', error);
      setError('Error al eliminar reporte');
    }
  };

  return (
    <div className="consultar-container">
      <h2>📋 Reportes Creados</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {reportes.length === 0 ? (
        <p>No hay reportes aún.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Firebase ID</th>
              <th>ID</th>
              <th>Dirección</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Acontecimiento</th>
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
                <td>{r.nombre}</td>
                <td>{r.acontecimiento}</td>
                <td>
                  <button onClick={() => handleDelete(r.firebaseId)}>🗑 Eliminar</button>
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
