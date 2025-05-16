import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Registro</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
