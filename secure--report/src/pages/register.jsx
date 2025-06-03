

import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
    const navigate = useNavigate();
     const handleContinuar = () => {
    navigate('/login');
    const handleRegresar = () => {
    navigate('/');
  };
  };
  return (
    <div className="form-container">
      <h1>Secure Report</h1>
      <label>Usuario</label>
      <input type="text" />
      <label>Correo</label>
      <input type="email" />
      <label>Contraseña</label>
      <input type="password" />

      <div className="form-buttons">
        
       <button onClick={handleRegresar}>Regresar</button>
      
        <button onClick={handleContinuar}>Continuar</button>
      </div>

      <Link to="/login" className="form-link">
        Ya tengo cuenta
      </Link>
    </div>
  );
}
