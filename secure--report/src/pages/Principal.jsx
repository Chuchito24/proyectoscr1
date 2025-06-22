import React, { useEffect, useState } from 'react';
import "../Style/Principal.css";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Principal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Estados para modales
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalRedirectLogin, setErrorModalRedirectLogin] = useState(false);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleNuevoReporte = () => navigate('/NewReport');
  const handleConsultarEliminar = () => navigate('/ConsultarEliminar');
  const handleActualizar = () => navigate('/Actualizar');
  const handleVerPublicos = () => navigate('/PublicReports');
  const handleCerrarSesion = () => navigate('/');

  // Al dar click en "Eliminar cuenta", mostrar modal de confirmación
  const iniciarEliminacion = () => {
    setShowConfirmModal(true);
  };

  // Al confirmar "Sí, eliminar", cerrar confirmación y abrir modal para contraseña
  const handleConfirmarEliminarClick = () => {
    setShowConfirmModal(false);
    setPasswordInput("");
    setShowPasswordModal(true);
  };

  // Manejar la eliminación cuando se ingresa la contraseña
  const confirmarEliminacion = async () => {
    if (!user) return;
    if (!passwordInput) return;

    try {
      // Reautenticación
      const credential = EmailAuthProvider.credential(user.email, passwordInput);
      await reauthenticateWithCredential(user, credential);

      const uid = user.uid;

      // Eliminar reportes del usuario
      const reportesRef = collection(db, "reportes");
      const q = query(reportesRef, where("usuarioId", "==", uid));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map((docu) =>
        deleteDoc(doc(db, "reportes", docu.id))
      );
      await Promise.all(deletePromises);

      // Eliminar cuenta
      await deleteUser(user);

      setShowPasswordModal(false);
      setModalMessage("✅ Cuenta eliminada exitosamente.");
      setErrorModalRedirectLogin(false);

      setTimeout(() => {
        setModalMessage("");
        navigate("/");
      }, 2500);

    } catch (error) {
      console.error("Error al eliminar cuenta:", error);

      setShowPasswordModal(false);
      setModalMessage("❌ Error: Verifica tu contraseña o vuelve a iniciar sesión.");
      setErrorModalRedirectLogin(true);
    }
  };

  // Cerrar modal de mensaje, y redirigir si es error de sesión
  const handleCerrarModalMensaje = () => {
    setModalMessage("");
    if (errorModalRedirectLogin) {
      navigate("/"); // redirige a login
      setErrorModalRedirectLogin(false);
    }
  };

  return (
    <div className="principal-container">
      <header className="principal-header">
        <h2>Bienvenido a Secure Report</h2>
        <div>
          <button className="cerrar-sesion-btn" onClick={handleCerrarSesion}>Cerrar sesión</button>
          <button className="eliminar-cuenta-btn" onClick={iniciarEliminacion}>❌ Eliminar cuenta</button>
        </div>
      </header>

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
            <div className="modal-buttons">
              <button className="modal-button confirm" onClick={handleConfirmarEliminarClick}>Sí, eliminar</button>
              <button className="modal-button cancel" onClick={() => setShowConfirmModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ingresar contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Por seguridad, ingresa tu contraseña para eliminar tu cuenta:</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
              placeholder="Contraseña"
            />
            <div className="modal-buttons" style={{ marginTop: "10px" }}>
              <button className="modal-button confirm" onClick={confirmarEliminacion}>Confirmar</button>
              <button className="modal-button cancel" onClick={() => setShowPasswordModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Mensaje con botón Aceptar */}
      {modalMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <div className="modal-buttons">
              <button className="modal-button confirm" onClick={handleCerrarModalMensaje}>Aceptar</button>
            </div>
          </div>
        </div>
      )}

      <div className="principal-body">
        <aside className="menu-lateral">
          <button onClick={handleNuevoReporte}>Nuevo Reporte</button>
          <button onClick={handleConsultarEliminar}>Consultar / Eliminar Reportes</button>
          <button onClick={handleActualizar}>Actualizar Reporte</button>
          <button onClick={handleVerPublicos}>📢 Ver reportes públicos</button>
        </aside>

        <main className="principal-contenido">
          <p>Selecciona una opción del menú lateral para continuar.</p>
         <h3 className="subtitulo-centros">CENTROS DE ATENCIÓN Y APOYO</h3>

          <section className="centros-ayuda-grid">
            <a href="https://www.fgjcdmx.gob.mx/nuestros-servicios/ADEVI" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>ADEVI - FGJCDMX</h3>
              <p>Atención a víctimas del delito en la Ciudad de México.</p>
            </a>

            <a href="https://www.mucd.org.mx/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>MUCd - México Unido Contra la Delincuencia</h3>
              <p>Organización dedicada a la seguridad y justicia en México.</p>
            </a>

            <a href="https://www.mucd.org.mx/atencion-a-victimas-del-delito/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>Atención a Víctimas del Delito - MUCd</h3>
              <p>Recursos y apoyo para víctimas del delito.</p>
            </a>

            <a href="https://www.fgjcdmx.gob.mx/nuestros-servicios/en-linea" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>Servicios en Línea - FGJCDMX</h3>
              <p>Consulta y realiza trámites en línea.</p>
            </a>

            <a href="https://www.ssc.cdmx.gob.mx/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>SSC CDMX</h3>
              <p>Secretaría de Seguridad Ciudadana de la Ciudad de México.</p>
            </a>

            <a href="https://www.cndh.org.mx/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>CNDH</h3>
              <p>Comisión Nacional de los Derechos Humanos.</p>
            </a>
            
             <a href="https://www.profeco.gob.mx/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>Profeco</h3>
              <p>Quejas por gas, agua, luz, vivienda e Infonavit.</p>
             </a>
           <a href="https://www.funcionpublica.gob.mx/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>SIDEC – SFP</h3>
             <p>Denuncias contra servidores públicos.</p>
             </a>
              <a href="https://www.coneval.org.mx/OR/Paginas/Quejas-Denuncias-Peticiones.aspx" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
               <h3>CONEVAL</h3>
               <p>Quejas sobre programas y servicios públicos.</p>
              </a>
             <a href="https://queja.net/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
              <h3>Queja.net</h3>
              <p>Orientación para quejas en energía, agua, gas, combustibles.</p>
                </a>
             <a href="https://micreditoinfonavit.mx/contacto-infonavit/infonatel/" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
               <h3>Infonatel – INFONAVIT</h3>
              <p>Soporte y denuncias sobre créditos y construcción.</p>
            </a>
            <a href="https://www.tlachinollan.org.mx" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
             <h3>Tlachinollan</h3>
           <p>Asesoría en desaparición, tortura y violaciones graves en Guerrero.</p>
          </a>
           <a href="https://comiteeureka.org.mx" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
         <h3>Comité ¡Eureka!</h3>
           <p>Acompañamiento para la localización de desaparecidos.</p>
           </a>
         <a href="https://centroprodh.org.mx" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
         <h3>Centro ProDH</h3>
         <p>Defensa legal en desapariciones, tortura y agresión.</p>
         </a>
       <a href="https://brigadaanimal.com" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
         <h3>Brigada Animal</h3>
       <p>Denuncias y rescates por maltrato y violencia contra animales.</p>
        </a>
   

       <a href="https://saptel.org.mx" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
        <h3> SAPTEL</h3>
        <p>Línea 24/7 para crisis emocionales, autolesiones y adicciones.</p>
       </a>
       <a href="https://consejociudadanomx.org" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
       <h3> Consejo Ciudadano</h3>
          <p>Asistencia emocional y primeros auxilios psicológicos 24/7.</p>
          </a>
      <a href="https://www.gob.mx/conadic" target="_blank" rel="noopener noreferrer" className="ayuda-card-link">
       <h3> Línea de la Vida</h3>
       <p>Atención 24/7 en crisis, adicciones y salud mental.</p>
    </a>
            
            
          </section>
          
        </main>
      </div>

      <footer className="footer-ayuda">
        <p className="ayuda-texto">¿Necesitas ayuda? Aquí tienes algunos contactos importantes:</p>
        <div className="ayuda-cards">
          <div className="ayuda-card">🚑 <strong>Ambulancia:</strong> 911</div>
          <div className="ayuda-card">🚓 <strong>Policía:</strong> 911</div>
          <div className="ayuda-card">📞 <strong>Min. Seguridad:</strong> 01‑800‑00‑SEGURIDAD</div>
          <div className="ayuda-card">📱 <strong>Línea de apoyo:</strong> 800‑AYUDA</div>
        </div>
      </footer>
    </div>
  );
}
