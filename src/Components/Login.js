import React, { useState } from 'react';
import { Navbar,Nav,Container, Button } from 'react-bootstrap';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function Login() {

     const[pass,setPass]=useState('');
     const[email,setEmail]=useState('');
     const navigate=useNavigate();
    const handleLogin=async()=>{

        try{
               const user={email:email,password:pass};
               const res=await axios.post('http://localhost:3001/store/validate',user);
               if(res.status===200)
               {

                 alert('User validation succefull');
                 const user= res.data;
                 console.log(user.data);
                 if(user.role==="admin")
                 {
                   const res=await axios.post('http://localhost:3001/store/totalusers');
                   const res1=await axios.post('http://localhost:3001/store/totalstores');
                   const totalUsers = res.data[0]['count(id)']; 
                   const totalstores=res1.data[0]['count(id)'];
                   const totalrating=res1.data[0]['count(rating)'];
                   console.log(res1);
                   navigate('/admin',{state:{total:totalUsers,stores:totalstores,rating:totalrating}});
                 }
                 else if(user.role==="store owner")
                 {
                  const res=await axios.post('http://localhost:3001/store/getstore');
                  console.log(res.data);
                  navigate('/owner',{state:{data:res.data,email:email}});
                 } 
                 else
                 {
                   const res=await axios.post('http://localhost:3001/store/getstore');
                   navigate('/user',{state:{data:res.data,email:email}});
                 }
               }
               else{
                 alert('Oops!!email or Password is Invalid');
               }
        }
        catch(err)
        {
             console.log(err);
        }
    }
  return (
    <div>
            <Navbar style={{backgroundColor:'#e0e0e0',height:'60px',}}>
        <Container>
          <Navbar.Brand href="/" style={{fontWeight:'bold',fontSize:'30px',color:'black',textDecoration:'none',marginLeft:'100px'}}>Login</Navbar.Brand>
          <Nav style={{marginLeft:'700px',fontWeight:'bold',fontSize:'20px'}}>
            <Nav.Link href="/login" style={{textDecoration:"none",color:'#039be5'}}>Login</Nav.Link>
            <Nav.Link href="/register" style={{marginLeft:'25px',textDecoration:'none',color:'#039be5'}}>Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
           <h3>Login</h3>
                <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
                 style={{width:'500px'}}>
                <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password"  style={{width:'500px'}}>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)} />
            </FloatingLabel>
            <Button style={{marginTop:'20px',width:'500px'}} onClick={handleLogin}>Login</Button>
          </div>
    </div>
  )
}
