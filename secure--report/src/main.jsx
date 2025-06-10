import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './pages/App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/register.jsx';
import NewReport from './pages/NewReport.jsx';
import Principal from './pages/Principal.jsx';
// import ConsultarEliminar from './pages/ConsultarEliminar.jsx';
// import Actualizar from './pages/Actualizar.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/NewReport" element={<NewReport />} />
        <Route path="/Principal" element={<Principal />} />
        {/* <Route path="/ConsultarEliminar" element={<ConsultarEliminar />} /> */}
        {/* <Route path="/Actualizar" element={<Actualizar />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
