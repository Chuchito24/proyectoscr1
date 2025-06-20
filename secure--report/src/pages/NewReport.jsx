import React, { useState } from 'react';
import '../Style/NewReport.css';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function NewReport() {
  const [formData, setFormData] = useState({
    direccion: '',
    fecha: '',
    tipoReporte: 'personal',   // <-- nuevo campo con valor por defecto
    representante: '',         // <-- nuevo campo
    nombre: '',
    acontecimiento: '',
    publico: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Al cambiar tipoReporte, también limpiamos el campo que se debe bloquear
    if (name === 'tipoReporte') {
      if (value === 'comunitario') {
        setFormData({
          ...formData,
          tipoReporte: value,
          nombre: '',           // limpiamos nombre
          representante: formData.representante, // mantenemos representante
        });
      } else {
        // personal
        setFormData({
          ...formData,
          tipoReporte: value,
          representante: '',    // limpiamos representante
          nombre: formData.nombre, // mantenemos nombre
        });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const usuario = auth.currentUser;
      if (!usuario) {
        setSuccessMessage('❌ Usuario no autenticado');
        return;
      }

      // Validar que la fecha no sea futura
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(23, 59, 59, 999);

      if (fechaSeleccionada > hoy) {
        setSuccessMessage('❌ La fecha no puede ser futura.');
        return;
      }

      // Validar campos según tipoReporte
      if (formData.tipoReporte === 'comunitario' && !formData.representante.trim()) {
        setSuccessMessage('❌ El campo representante es obligatorio para reportes comunitarios.');
        return;
      }
      if (formData.tipoReporte === 'personal' && !formData.nombre.trim()) {
        setSuccessMessage('❌ El campo nombre es obligatorio para reportes personales.');
        return;
      }

      // Obtener cantidad de reportes del usuario
      const reportesQuery = query(
        collection(db, 'reportes'),
        where('usuarioId', '==', usuario.uid)
      );
      const snapshot = await getDocs(reportesQuery);
      const nextId = snapshot.size + 1;

      const docRef = doc(collection(db, 'reportes'));

      await setDoc(docRef, {
        ...formData,
        usuarioId: usuario.uid,
        id: nextId,
      });

      setSuccessMessage('✅ Reporte guardado exitosamente');
      setTimeout(() => {
        navigate('/ConsultarEliminar');
      }, 2000);
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
      setSuccessMessage('❌ Error al guardar el reporte');
    }
  };

  const handleCancel = () => {
    navigate('/Principal');
  };

  return (
    <div className="form-container">
      <h2>Nuevo reporte</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <label>Dirección</label>
      <input
        type="text"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
      />

      <label>Fecha</label>
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        max={new Date().toISOString().split('T')[0]}
        onChange={handleChange}
      />

      <label>Tipo de reporte</label>
      <select name="tipoReporte" value={formData.tipoReporte} onChange={handleChange}>
        <option value="personal">Personal</option>
        <option value="comunitario">Comunitario</option>
      </select>

      <label>Nombre del afectado</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        disabled={formData.tipoReporte === 'comunitario'}
        placeholder={formData.tipoReporte === 'comunitario' ? 'No editable para comunitario' : ''}
      />

      <label>Representante</label>
      <input
        type="text"
        name="representante"
        value={formData.representante}
        onChange={handleChange}
        disabled={formData.tipoReporte === 'personal'}
        placeholder={formData.tipoReporte === 'personal' ? 'No editable para personal' : ''}
      />

      <label>Acontecimiento</label>
      <textarea
        name="acontecimiento"
        rows="4"
        value={formData.acontecimiento}
        onChange={handleChange}
      ></textarea>

      <label>
        Hacer público el reporte
        <input
          type="checkbox"
          name="publico"
          checked={formData.publico}
          onChange={handleChange}
        />
      </label>

      <div className="button-group">
        <button onClick={handleSubmit}>Finalizar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
