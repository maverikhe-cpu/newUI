import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DataAdmin from './pages/DataAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin" element={<DataAdmin />} />
    </Routes>
  );
}

export default App;
