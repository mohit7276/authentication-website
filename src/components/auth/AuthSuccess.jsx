import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const AuthSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  useEffect(() => {
    const handleAuthSuccess = async () => {
      const params = new URLSearchParams(location.search)
      const token = params.get('token')

      if (token) {
        // Store token and redirect to dashboard
        localStorage.setItem('token', token)
        
        // Set axios header for future requests
        if (window.axios && window.axios.defaults) {
          window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }

        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } else {
        // No token found, redirect to login with error
        navigate('/login?error=auth_failed')
      }
    }

    handleAuthSuccess()
  }, [location, navigate])

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-body" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaCheckCircle 
              style={{ 
                fontSize: '64px', 
                color: '#38a169', 
                marginBottom: '24px' 
              }} 
            />
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#333', 
              marginBottom: '12px' 
            }}>
              Authentication Successful!
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '16px',
              marginBottom: '24px'
            }}>
              You have been successfully logged in. Redirecting to your dashboard...
            </p>
            <div className="loading-spinner" style={{ 
              margin: '0 auto',
              width: '32px',
              height: '32px',
              borderWidth: '3px'
            }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthSuccess
