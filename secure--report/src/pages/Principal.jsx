import React from 'react';
import "../Style/Principal.css";
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const navigate = useNavigate();

  const handleNuevoReporte = () => {
    navigate('/NewReport');
  };

  const handleConsultarEliminar = () => {
    navigate('/ConsultarEliminar');
  };

  const handleActualizar = () => {
    navigate('/Actualizar');
  };

  const handleVerPublicos = () => {
    navigate('/PublicReports');
  };

  const handleCerrarSesion = () => {
    navigate('/');  // ruta login
  };

  return (
    <div className="principal-container">
      <header className="principal-header">
        <h2>Bienvenido a Secure Report</h2>
        <button className="cerrar-sesion-btn" onClick={handleCerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      <div className="principal-body">
        <aside className="menu-lateral">
          <button onClick={handleNuevoReporte}>Nuevo Reporte</button>
          <button onClick={handleConsultarEliminar}>Consultar / Eliminar Reportes</button>
          <button onClick={handleActualizar}>Actualizar Reporte</button>
          <button onClick={handleVerPublicos}>📢 Ver reportes públicos</button>
        </aside>

        <main className="principal-contenido">
          <p>Selecciona una opción del menú lateral para continuar.</p>
        </main>
      </div>

      <footer className="footer-ayuda">
        <p className="ayuda-texto">
          ¿Necesitas ayuda? Aquí tienes algunos contactos importantes:
        </p>
        <ul className="lista-contactos">
          <li>🚑 Ambulancia: 911</li>
          <li>🚓 Policía: 911</li>
          <li>📞 Ministerio de Seguridad: 01-800-00-SEGURIDAD</li>
          <li>📱 Línea de apoyo: 800-AYUDA</li>
        </ul>
      </footer>
    </div>
  );
}
