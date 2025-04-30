import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState} from 'react';
import { Nav,Navbar,Form,FloatingLabel,Button,Container } from 'react-bootstrap';


export default function Register() {

    const[email,setEmail]=useState('');
    const[emailerror,setEmailerror]=useState('')
    const[name,setName]=useState('');
    const[nameerror,setNameerror]=useState('')
    const[addr,setaddr]=useState('');
    const[adderr,setAddrerr]=useState('');
    const[pass,setPass]=useState('');
    const[passerr,setPasserr]=useState([]);
    const[submit,setSubmit]=useState('');
    const[n,setn]=useState('');
    const[e,sete]=useState('');
    const[a,seta]=useState('');
    const[p,setp]=useState('');
    const[role,setRole]=useState('');
 
   const navigate=useNavigate();

    const validateName=(name)=>{
          if(name.length>=20 && name.length<=60 )
          {
             setName('Looks good!!')
             setn(name);
             setNameerror('');
          }
          else{
            setNameerror('Name should be <=20 and less than 60 character!!')
            setName('');
          }      
    }
    const validateEmail=(email)=>{
        if(email.includes('@gmail.com'))
        {
           setEmail('Looks good!!')
           sete(email);
           setEmailerror('');
        }
        else{
         setEmailerror('email should be in correct format!!')
         setEmail('');
        }      
  }
  const validateAddr=(add)=>{
            if(add.length<=400 && add.length>=40)
            {
                 setaddr('Looks good!!')
                 seta(add);
                 setAddrerr('');
            }
            else
            {
                 setAddrerr('Address should of 400 characters only!!')
                 setaddr('');
            }
  }
  const validatePass=(pass)=>{
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
      if(pass.match(password))
      {
         setPass('Looks good!!')
         setp(pass);
         setPasserr('');
      }
      else
      {
         setPasserr(['* Minimun length 8' ,'* Maximum length 16','* At least one uppercase letter','* At least one lowercase letter','* At least one special character'])
         setPass('');
        }
  }
  const handleSubmit=async()=>{
     if(name && addr && pass && email)
     {
        setSubmit("All condition satified!!");
        console.log(a);
        try
        {
             const user={
                 name:n,
                 email:e,
                 password:p,
                 address:a,
                 role:role

             }
             const res=await axios.post('http://localhost:3001/store/saveuser',user);
             if(res.status===200)
             {
                 alert(res.data);
                 navigate('/login');
             }
        }
        catch(err)
        {
            console.log(err);
        }

     }
     else{
         setSubmit("Clear all error first!!")
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
               <h3>Register</h3>
               <FloatingLabel controlId="floatingInput" label="Name"  style={{width:'500px'}} >
                    <Form.Control type="text" placeholder="Name" required onChange={(e)=>validateName(e.target.value)}/><br></br>
                </FloatingLabel>
                {name && <p style={{color:'green',marginTop:'-20px'}}>{name}</p>}
                {nameerror &&<p style={{color:'red',marginTop:'-20px'}}>{nameerror}</p>}
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                     style={{width:'500px'}}>
                    <Form.Control type="email" placeholder="name@example.com" required onChange={(e)=>validateEmail(e.target.value)}/>
                </FloatingLabel>
                {email && <p style={{color:'green',marginTop:'-20px'}}>{email}</p>}
                {emailerror && <p style={{color:'red',marginTop:'-20px'}}>{emailerror}</p>}
                <FloatingLabel controlId="floatingPassword" label="Password"  style={{width:'500px'}}>
                    <Form.Control type="password" placeholder="Password" required onChange={(e)=>validatePass(e.target.value)}/>
                </FloatingLabel>
                {pass &&<p style={{color:'green'}}>{pass}</p>}
                {passerr && passerr.map(p=>(
                     <p style={{color:'red'}}>{p}</p>
                ))}
                <br></br>
                <FloatingLabel controlId="floatingInput" label="Address" style={{width:'500px'}}>
                    <Form.Control type="Address" placeholder="Address" required onChange={(e)=>validateAddr(e.target.value)}/>
                </FloatingLabel>
                {addr && <p style={{color:'green'}}>{addr}</p>}
                {adderr && <p style={{color:'red'}}>{adderr}</p>}<br></br>
                <FloatingLabel controlId="floatingInput" label="Role" style={{width:'500px'}}>
                <Form.Select required onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        <option value="store owner">store owner</option>
                      </Form.Select>
                </FloatingLabel>
                <Button style={{marginTop:'20px',width:'500px'}} onClick={handleSubmit}>Login</Button>
                {submit &&<p>{submit}</p>}

              </div>
        </div>
  )
}
