import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import SimpleRegister from './components/SimpleRegister'
import SimpleLogin from './components/SimpleLogin'
import Dashboard from './components/Dashboard'
import AuthSuccess from './components/auth/AuthSuccess'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            
            {/* Simple test routes */}
            <Route path="/test-register" element={<SimpleRegister />} />
            <Route path="/test-login" element={<SimpleLogin />} />
            
            {/* Original routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
