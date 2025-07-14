import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading, error, isAuthenticated, clearError } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [rememberMe, setRememberMe] = useState(false)

  // Get query params for error messages
  const searchParams = new URLSearchParams(location.search)
  const authError = searchParams.get('error')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  // Clear errors when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const result = await login(formData)

    if (result.success) {
      navigate('/dashboard')
    }
  }

  const handleSocialAuth = (provider) => {
    try {
      // Check if running in development
      const isDev = window.location.hostname === 'localhost';
      if (isDev) {
        console.log(`Attempting ${provider} OAuth...`);
        window.location.href = `http://localhost:5000/api/auth/${provider}`;
      } else {
        // Production would use your actual domain
        window.location.href = `/api/auth/${provider}`;
      }
    } catch (error) {
      console.error('Social auth error:', error);
      alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication is not configured yet. Please check the OAUTH_SETUP.md file for setup instructions.`);
    }
  }

  const getErrorMessage = () => {
    if (authError === 'google_auth_failed') {
      return 'Google authentication failed. Please try again.'
    }
    if (authError === 'facebook_auth_failed') {
      return 'Facebook authentication failed. Please try again.'
    }
    return error
  }

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <motion.h1 
            className="auth-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            className="auth-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to your account to continue
          </motion.p>
        </div>

        <div className="auth-body">
          {(error || authError) && (
            <motion.div 
              className="alert alert-error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {getErrorMessage()}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="form-label">
                <FaEnvelope className="form-icon" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${formErrors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                disabled={loading}
              />
              {formErrors.email && <div className="form-error">{formErrors.email}</div>}
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="form-label">
                <FaLock className="form-icon" />
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.password && <div className="form-error">{formErrors.password}</div>}
            </motion.div>

            <motion.div 
              className="form-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </motion.div>

            <motion.button
              type="submit"
              className={`btn btn-primary auth-btn ${loading ? 'btn-disabled' : ''}`}
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="loading-spinner" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <motion.div 
            className="divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Or sign in with
          </motion.div>

          <motion.div 
            className="social-auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <motion.button
              className="btn btn-social btn-google"
              onClick={() => handleSocialAuth('google')}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGoogle />
              Google
            </motion.button>
            <motion.button
              className="btn btn-social btn-facebook"
              onClick={() => handleSocialAuth('facebook')}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFacebook />
              Facebook
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ 
            position: 'relative',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
        >
          <p style={{ marginBottom: '15px' }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="auth-link"
              style={{ 
                color: '#667eea',
                textDecoration: 'underline',
                fontWeight: 'bold'
              }}
            >
              Create one here
            </Link>
          </p>
          
          {/* Single navigation button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              type="button"
              onClick={() => {
                console.log('Go to Register button clicked');
                window.location.href = '/register';
              }}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Go to Register
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Animation */}
      <div className="auth-background">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`shape shape-${i + 1}`}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Login
