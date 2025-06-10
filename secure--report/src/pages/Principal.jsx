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

  return (
    <div className="principal-container">
      {/* ENCABEZADO COMPACTO */}
      <header className="principal-header">
        <h2>Bienvenido a Secure Report</h2>
      </header>

      <div className="principal-body">
        {/* MENÚ IZQUIERDO */}
        <aside className="menu-lateral">
          <button onClick={handleNuevoReporte}>Nuevo Reporte</button>
          <button onClick={handleConsultarEliminar}>Consultar / Eliminar Reportes</button>
          <button onClick={handleActualizar}>Actualizar Reporte</button>
        </aside>

        {/* CONTENIDO CENTRAL */}
        <main className="principal-contenido">
          <p>Selecciona una opción del menú lateral para continuar.</p>
        </main>
      </div>

      {/* NÚMEROS DE EMERGENCIA ABAJO */}
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
