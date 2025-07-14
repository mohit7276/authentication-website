import React from 'react'

const SimpleRegister = () => {

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Simple Register Page</h1>
      <p>This is a test page to verify navigation works.</p>
      
      <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h4>Regular Registration Form:</h4>
        <input type="text" placeholder="Name" style={{ margin: '5px', padding: '10px' }} /><br/>
        <input type="email" placeholder="Email" style={{ margin: '5px', padding: '10px' }} /><br/>
        <input type="password" placeholder="Password" style={{ margin: '5px', padding: '10px' }} /><br/>
        <button style={{ margin: '10px', padding: '10px 20px' }}>Register</button>
      </div>
    </div>
  )
}

export default SimpleRegister
