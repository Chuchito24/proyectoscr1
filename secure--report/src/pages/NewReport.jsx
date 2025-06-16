import React, { useState } from 'react';
import '../Style/NewReport.css';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function NewReport() {
  const [formData, setFormData] = useState({
    id: '',
    direccion: '',
    fecha: '',
    nombre: '',
    acontecimiento: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'reportes'), {
        ...formData,
        usuarioId: auth.currentUser.uid,  // Guardar usuario dueño
        publico: false,                   // Privado por defecto
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

      <label>ID</label>
      <input type="text" name="id" value={formData.id} onChange={handleChange} />

      <label>Dirección</label>
      <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />

      <label>Fecha</label>
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />

      <label>Nombre del afectado</label>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />

      <label>Acontecimiento</label>
      <textarea name="acontecimiento" rows="4" value={formData.acontecimiento} onChange={handleChange}></textarea>

      <div className="button-group">
        <button onClick={handleSubmit}>Finalizar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
