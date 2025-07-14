import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null
}

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER'
}

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      }
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

// Configure axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
axios.defaults.baseURL = API_BASE_URL

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        setAuthToken(token)
        
        try {
          const response = await axios.get('/auth/verify')
          
          if (response.data.success) {
            dispatch({
              type: AUTH_ACTIONS.LOGIN_SUCCESS,
              payload: {
                user: response.data.user,
                token
              }
            })
          } else {
            dispatch({ type: AUTH_ACTIONS.LOGOUT })
            setAuthToken(null)
          }
        } catch (error) {
          console.error('Token verification failed:', error)
          dispatch({ type: AUTH_ACTIONS.LOGOUT })
          setAuthToken(null)
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      }
    }

    loadUser()
  }, [])

  // Register
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

      const response = await axios.post('/auth/register', userData)

      if (response.data.success) {
        const { token, user } = response.data
        setAuthToken(token)
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user, token }
        })

        return { success: true, message: response.data.message }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: message
      })
      return { success: false, message }
    }
  }

  // Login
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

      const response = await axios.post('/auth/login', credentials)

      if (response.data.success) {
        const { token, user } = response.data
        setAuthToken(token)
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user, token }
        })

        return { success: true, message: response.data.message }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: message
      })
      return { success: false, message }
    }
  }

  // Logout
  const logout = async () => {
    try {
      await axios.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setAuthToken(null)
      dispatch({ type: AUTH_ACTIONS.LOGOUT })
    }
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

      const response = await axios.put('/users/profile', userData)

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.UPDATE_USER,
          payload: response.data.user
        })
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })

        return { success: true, message: response.data.message }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: message
      })
      return { success: false, message }
    }
  }

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  }

  const value = {
    ...state,
    register,
    login,
    logout,
    updateProfile,
    clearError
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
