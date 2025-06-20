import React, { useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../Style/NewReport.css';

export default function Actualizar() {
  const [idBuscar, setIdBuscar] = useState('');
  const [reporte, setReporte] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBuscar = async () => {
    setMensaje('');
    setError('');
    const usuario = auth.currentUser;

    if (!usuario) {
      setError('No hay sesión activa. Inicia sesión.');
      return;
    }

    try {
      const q = query(
        collection(db, 'reportes'),
        where('id', '==', idBuscar),
        where('usuarioId', '==', usuario.uid)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setReporte(null);
        setError('❌ No se encontró un reporte con ese ID creado por ti.');
        return;
      }

      const docEncontrado = snapshot.docs[0];
      setReporte({ firebaseId: docEncontrado.id, ...docEncontrado.data() });
    } catch (err) {
      console.error(err);
      setError('Error al buscar el reporte.');
    }
  };

  const handleActualizar = async () => {
    try {
      const ref = doc(db, 'reportes', reporte.firebaseId);
      await updateDoc(ref, {
        direccion: reporte.direccion,
        fecha: reporte.fecha,
        nombre: reporte.tipoReporte === 'personal' ? reporte.nombre : '',
        representante: reporte.tipoReporte === 'comunitario' ? reporte.representante : '',
        acontecimiento: reporte.acontecimiento,
        tipoReporte: reporte.tipoReporte,
      });

      setMensaje('✅ Reporte actualizado correctamente.');
      setTimeout(() => navigate('/ConsultarEliminar'), 1500);
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el reporte.');
    }
  };

  const handleCancelar = () => {
    navigate('/Principal');
  };

  return (
    <div className="form-container">
      <h2>🔎 Buscar Reporte por ID</h2>
      <input
        type="text"
        placeholder="ID del reporte"
        value={idBuscar}
        onChange={(e) => setIdBuscar(e.target.value)}
      />
      <div className="button-group">
        <button onClick={handleBuscar}>Buscar</button>
        <button onClick={handleCancelar}>Cancelar</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

      {reporte && (
        <>
          <h3>✏️ Editar Reporte</h3>

          <label>Tipo de reporte</label>
          <select
            value={reporte.tipoReporte}
            onChange={(e) => setReporte({ ...reporte, tipoReporte: e.target.value })}
          >
            <option value="">--Selecciona--</option>
            <option value="personal">Personal</option>
            <option value="comunitario">Comunitario</option>
          </select>

          <label>Dirección</label>
          <input
            type="text"
            value={reporte.direccion}
            onChange={(e) => setReporte({ ...reporte, direccion: e.target.value })}
          />

          <label>Fecha</label>
          <input
            type="date"
            value={reporte.fecha}
            onChange={(e) => setReporte({ ...reporte, fecha: e.target.value })}
          />

          <label>Nombre del afectado</label>
          <input
            type="text"
            value={reporte.nombre}
            onChange={(e) => setReporte({ ...reporte, nombre: e.target.value })}
            disabled={reporte.tipoReporte === 'comunitario'}
          />

          <label>Representante</label>
          <input
            type="text"
            value={reporte.representante || ''}
            onChange={(e) => setReporte({ ...reporte, representante: e.target.value })}
            disabled={reporte.tipoReporte === 'personal'}
          />

          <label>Acontecimiento</label>
          <textarea
            rows="4"
            value={reporte.acontecimiento}
            onChange={(e) =>
              setReporte({ ...reporte, acontecimiento: e.target.value })
            }
          />

          <div className="button-group">
            <button onClick={handleActualizar}>Guardar cambios</button>
            <button onClick={handleCancelar}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}
