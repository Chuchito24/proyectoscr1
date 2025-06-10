import React from 'react';
import '../Style/register.css'; // Puedes crear uno específico o reutilizar el de register/login

export default function NewReport() {
  return (
    <div className="form-container">
      <h2>Nuevo reporte</h2>

      <label>ID</label>
      <input type="text" />

      <label>Dirección</label>
      <input type="text" />

      <label>Fecha</label>
      <input type="date" />

      <label>Nombre del afectado</label>
      <input type="text" />

      <label>Acontecimiento</label>
      <textarea rows="4"></textarea>

      <div className="button-group">
        <button>Finalizar</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
}
