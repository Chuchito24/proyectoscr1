import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import '../Style/register.css';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validarCorreo = (email) => email.includes('@');
  const validarPassword = (pass) => /^\d{6}$/.test(pass);

  const handleContinuar = async () => {
    setError('');
    if (!usuario || !correo || !password) {
      setError('Necesita llenar todos los campos');
      return;
    }
    if (!validarCorreo(correo)) {
      setError('El correo debe contener un "@"');
      return;
    }
    if (!validarPassword(password)) {
      setError('La contraseña debe ser 6 números');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      console.log('Usuario creado:', user.uid, correo);

      await setDoc(doc(db, 'users', user.uid), {
        usuario,
        correo,
      });

      setError('');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Error al registrar: ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Secure Report</h1>

      <label>Usuario</label>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Nombre de usuario"
      />

      <label>Correo</label>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo electrónico"
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="6 números"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="form-buttons">
        <button onClick={() => navigate('/')}>Regresar</button>
        <button onClick={handleContinuar}>Continuar</button>
      </div>
    </div>
  );
}
