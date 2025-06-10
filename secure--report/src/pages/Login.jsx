import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/login.css'; // Ruta CSS corregida

export default function Login() {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/');
  };
  const handleIniciarsesion = () => {
    navigate('/register');
  };

  const handleContinuar = () => {
    navigate('/Principal');
  };

  return (
    <div className="form-container">
      <h2 style={{ color: '#3366ff' }}>Informe seguro</h2>

      <label>Usuario</label>
      <input type="text" />

      <label>Contraseña</label>
      <input type="password" />

      <div className="button-group">
        <button onClick={handleRegresar}>Regresar</button>
        <button onClick={handleContinuar}>Continuar</button>
      </div>

      <p style={{ color: '#3366ff', cursor: 'pointer' }}onClick={handleIniciarsesion}>No tengo cuenta</p>
    </div>
  );
}
