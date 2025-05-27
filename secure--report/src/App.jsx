import './App.css';
import logo from '/logopequeño.png'; // ruta desde carpeta public

function App() {
  return (
    <div className="main-container">
      <div className="decor-left"></div>
      <div className="decor-right"></div>

      <div className="content">
        <h1>"SECURE REPORT"</h1>
        <img src={logo} alt="logo" className="logo" />
        <button className="btn">BIENVENIDO</button>
      </div>
    </div>
  );
}

export default App;
