import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SimpleLogin = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Simple Login Page</h1>
      <p>This is a test page to verify navigation works.</p>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Test Navigation:</h3>
        
        {/* React Router Link */}
        <div style={{ margin: '10px 0' }}>
          <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
            Go to Register (React Router Link)
          </Link>
        </div>
        
        {/* useNavigate hook */}
        <div style={{ margin: '10px 0' }}>
          <button 
            onClick={() => navigate('/register')}
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            Go to Register (useNavigate)
          </button>
        </div>
        
        {/* Direct window.location */}
        <div style={{ margin: '10px 0' }}>
          <button 
            onClick={() => window.location.href = '/register'}
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'lightgreen' }}
          >
            Go to Register (window.location)
          </button>
        </div>
      </div>
      
      <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h4>Regular Login Form:</h4>
        <input type="email" placeholder="Email" style={{ margin: '5px', padding: '10px' }} /><br/>
        <input type="password" placeholder="Password" style={{ margin: '5px', padding: '10px' }} /><br/>
        <button style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
      </div>
    </div>
  )
}

export default SimpleLogin
