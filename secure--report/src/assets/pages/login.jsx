

import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <div className="form-container">
      <h1>Secure Report</h1>
      <label>Usuario</label>
      <input type="text" />
      <label>Contraseña</label>
      <input type="password" />

      <div className="form-buttons">
        <Link to="/">
          <button>Regresar</button>
        </Link>
        <button>Continuar</button>
      </div>

      <Link to="/register" className="form-link">
        No tengo cuenta
      </Link>
    </div>
  );
}
