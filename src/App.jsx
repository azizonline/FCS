import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminSoftwareForm from './pages/AdminSoftwareForm.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route - minimalist homepage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Admin routes - hidden from main navigation */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/software/add" element={<AdminSoftwareForm />} />
        <Route path="/admin/software/edit/:id" element={<AdminSoftwareForm />} />
        
        {/* 404 */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
