import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../pages/FireBase'; // Asegúrate que esta ruta sea correcta
import '../Style/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegresar = () => {
    navigate('/');
  };

  const handleIniciarsesion = () => {
    navigate('/register');
  };

  const handleContinuar = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Principal');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ color: '#3366ff' }}>Informe seguro</h2>

      <label>Usuario</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="button-group">
        <button onClick={handleRegresar}>Regresar</button>
        <button onClick={handleContinuar}>Continuar</button>
      </div>

      <p
        style={{ color: '#3366ff', cursor: 'pointer' }}
        onClick={handleIniciarsesion}
      >
        No tengo cuenta
      </p>
    </div>
  );
}
