import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ActivateCard from './pages/ActivateCard';
import CustomerDashboard from './pages/CustomerDashboard'; // <--- استدعاء شاشة العميل الجديدة

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
        <h1 style={{ color: '#2c3e50', marginTop: '30px' }}>نظام AMT للبطاقات الذكية 🚀</h1>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activate/:shortCode" element={<ActivateCard />} />
          {/* هذا هو رابط لوحة تحكم العميل */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;