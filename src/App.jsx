import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Budget from './pages/Budget';
import Investments from './pages/Investments';
import Debt from './pages/Debt';
import Reports from './pages/Reports';
import './styles/globals.css';
import '../src/styles/style.css'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(prev => !prev)}
        />
        <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Navbar sidebarCollapsed={sidebarCollapsed} />
          <main className="page-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forget-pass" element={<ForgotPassword />} />


              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/debt" element={<Debt />} />
              <Route path="/reports" element={<Reports />} />

            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
