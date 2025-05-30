import './App.css';
import logo from '/logopequeño.png'; 

function App() {
  return (
    <div className="container">
      <div className="header">
        <button className="header-button">Iniciar sesión</button>
        <button className="header-button">Crear cuenta</button>
      </div>

      <div className="content">
        <div className="left">
          <h2>Bienvenido a Secure Report</h2>
          <p>
¿Perdiste algo por causa de la delincuencia? ¿Alguien cercano está desaparecido? Esta plataforma está diseñada para ayudarte. 
Aquí podrás realizar reportes de manera rápida y sencilla, compartir información con tu comunidad y recibir alertas que pueden marcar la diferencia. 
Nuestro objetivo es hacer que encontrar personas u objetos desaparecidos sea más fácil, conectando a los ciudadanos con las autoridades y entre sí. 
Juntos, podemos construir un entorno más seguro y solidario.</p>
        </div>

        <div className="center">
          <h1 className="sr-logo">SR</h1>
        </div>

        <div className="right">
          <h2>Información</h2>
          <p>Datos relevantes...</p>
        </div>
      </div>

      <div className="footer">
      
        <img src="/imagen.png" alt="SR Logo" className="logo" />
      </div>
    </div>
  );
}

export default App;
