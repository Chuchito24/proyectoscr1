import '../Style/App.css'; // Ruta CSS relativa correcta
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      {/* Contenido principal */}
      <div className="content">
        <div className="left horizontal-group">
          <img src="/imagen.png" alt="SR Logo" className="logo-large" />
          <h1 className="welcome-text">Bienvenido a 
            Secure Report</h1>
        </div>

        <div className="right info-box">
          <h2>Información</h2>
          <h3>
            ¿Perdiste algo por causa de la delincuencia? <br />
            ¿Alguien cercano está desaparecido? <br /><br />
            Esta plataforma está diseñada para ayudarte. Aquí podrás realizar reportes de manera rápida y sencilla, compartir información con tu comunidad y recibir alertas que pueden marcar la diferencia. <br /><br />
            Nuestro objetivo es hacer que encontrar personas u objetos desaparecidos sea más fácil, conectando a los ciudadanos con las autoridades y entre sí. <br /><br />
            <strong>Juntos, podemos construir un entorno más seguro y solidario.</strong>
          </h3>

          <div className="action-buttons">
            <Link to="/login">
              <button className="header-button">Iniciar sesión</button>
            </Link>
            <Link to="/register">
              <button className="header-button">Crear cuenta</button>
            </Link>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default App;
