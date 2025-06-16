import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Login() {
  const navigate = useNavigate();
  const [usuarioCorreo, setUsuarioCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validarPassword = (pass) => /^\d{6}$/.test(pass);

  const handleContinuar = async () => {
    setError('');
    if (!usuarioCorreo || !password) {
      setError('Necesita llenar los campos');
      return;
    }
    if (!validarPassword(password)) {
      setError('La contraseña debe ser 6 números');
      return;
    }

    try {
      let emailToUse = usuarioCorreo;

      if (!usuarioCorreo.includes('@')) {
        const q = query(collection(db, 'users'), where('usuario', '==', usuarioCorreo));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Usuario no encontrado');
          return;
        }

        // Solo tomamos el primer resultado para evitar problemas si hay duplicados
        emailToUse = querySnapshot.docs[0].data().correo;
      }

      console.log('Intentando login con email:', emailToUse);

      await signInWithEmailAndPassword(auth, emailToUse, password);

      setError('');
      navigate('/Principal');
    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrectos: ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ color: '#3366ff' }}>Informe seguro</h2>

      <label>Usuario o Correo</label>
      <input
        type="text"
        value={usuarioCorreo}
        onChange={(e) => setUsuarioCorreo(e.target.value)}
        placeholder="Usuario o correo electrónico"
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="6 números"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="button-group">
        <button onClick={() => navigate('/')}>Regresar</button>
        <button onClick={handleContinuar}>Continuar</button>
      </div>

      <p
        style={{ color: '#3366ff', cursor: 'pointer' }}
        onClick={() => navigate('/register')}
      >
        No tengo cuenta
      </p>
    </div>
  );
}
