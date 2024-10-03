import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analyse from './pages/Analyse';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Analyse />}></Route>
        <Route path="/dashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
