import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../style/ConsultarEliminar.css';

export default function PublicReports() {
  const [reportesPublicos, setReportesPublicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cargar reportes públicos
  useEffect(() => {
    const fetchPublicReports = async () => {
      try {
        const q = query(collection(db, 'reportes'), where('publico', '==', true));
        const snapshot = await getDocs(q);

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReportesPublicos(lista);
      } catch (error) {
        console.error('Error al obtener reportes públicos:', error);
        setError('No se pudieron cargar los reportes públicos');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicReports();
  }, []);

  return (
    <div className="consultar-container">
      <h2>📢 Reportes Públicos</h2>

      {loading ? (
        <p>Cargando reportes...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : reportesPublicos.length === 0 ? (
        <p>No hay reportes públicos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dirección</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Representante</th> {/* Nueva columna */}
              <th>Acontecimiento</th>
            </tr>
          </thead>
          <tbody>
            {reportesPublicos.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.direccion}</td>
                <td>{r.fecha}</td>
                <td>{r.tipoReporte === 'personal' ? r.nombre : '—'}</td> {/* Solo mostrar el nombre si es personal */}
                <td>{r.tipoReporte === 'comunitario' ? r.representante : '—'}</td> {/* Mostrar representante si es comunitario */}
                <td>{r.acontecimiento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="botones-navegacion">
        <button onClick={() => navigate('/Principal')}>🏠 Volver al inicio</button>
      </div>
    </div>
  );
}
