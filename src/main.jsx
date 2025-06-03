import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Login from './Login/Login.jsx'
import Register from './Register/Register.jsx'
import Dashboard from './Dashboard.jsx'
import Favs from './Favs.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setup" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favs" element={<Favs />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
