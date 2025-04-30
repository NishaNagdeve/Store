import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div style={{textAlign:'center',marginTop:'250px',letterSpacing:'5px'}}>
      <h2>WELCOME</h2>
      <Link to='/login'><Button>Sign in</Button></Link>
    </div>
  )
}
