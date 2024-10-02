import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analyse from './pages/analyse';

export default function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Analyse />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
