// src/App.js
import React from 'react';
import './App.css';
import Users from './components/Users';  // Importa el componente de usuarios


const App = () => {
  return (
    <div className="App">
      <h1>Gestión de Usuarios</h1>
      <Users />  {/* Agrega el componente de usuarios */}
    </div>
  );
};

export default App;
