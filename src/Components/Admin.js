import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Col,Row,Nav,Navbar,Container, Button,Modal,Form,FloatingLabel,Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function Admin() {

    const[modal,setModal]=useState(false);
    const[open,setOpen]=useState(false);
    const[storename,setStorename]=useState('');
    const[storeemail,setStoreemail]=useState('');
    const[storeaddr,setStoreaddr]=useState('');
    const[name,setname]=useState('');
    const[addr,setAddr]=useState('');
    const[pass,setPass]=useState('');
    const[email,setEmail]=useState('');
    const[role,setRole]=useState('');
    const[data,setData]=useState([]);
    const[viewtable,setViewtable]=useState(false);
    const[viewstore,setViewstore]=useState(false);
    const[totaluser,setTotaluser]=useState(0);
    const[totalstore,setTotalstore]=useState(0);
    const[rating,setRating]=useState(0);
    const location=useLocation();
    const handleClose=()=>{
        setModal(false);
        setOpen(false);
    }
    const addStore=async()=>{
        setModal(true);
    }
   
    useEffect(()=>{
            const state=location.state;
             setTotaluser(state.total);
             setTotalstore(state.stores);
             setRating(state.rating);
    },[location.state])

    const viewUsers=async()=>{
        setData([]);
        setViewstore(false);
         try{
                  const res=await axios.post('http://localhost:3001/store/getusers');
                  if(res.status===200)
                  {
                     const data=res.data;
                     setViewtable(true);
                     setData(res.data);
                  }
         }
         catch(err)
         {
             console.error(err);
         }

     }
    const viewStore=async()=>{
        setData([]);
        setViewtable(false);
        try{
            const res=await axios.post('http://localhost:3001/store/getstore');
            if(res.status===200)
            {
               setViewstore(true);
               setData(res.data);
            }
   }
   catch(err)
   {
       console.error(err);
   }
    }
    
    const addUser=()=>{setOpen(true)};
    const saveStore=async()=>{
        try{
                const store={
                     name:storename,
                     email:storeemail,
                     address:storeaddr
                }
                const res=await axios.post('http://localhost:3001/store/savestore',store);
                const res1=await axios.post('http://localhost:3001/store/totalstores');
                if(res.status===200)
                {
                     alert('Store saved');
                     const totalstores=res1.data[0]['count(id)'];
                     const totalrating=res1.data[0]['count(rating)'];
                     setRating(totalrating)
                     setTotalstore(totalstores);
                     setModal(false);
                }
                else
                {
                     alert('error saving store');
                     setModal(false);
                }
        }
        catch(err)
        {
             console.error(err);
        }
    }
    const saveUser=async()=>{
            try{
                 const user={
                     name:name,
                     email:email,
                     password:pass,
                     address:addr,
                     role:role
                 }
                 const res=await axios.post('http://localhost:3001/store/saveuser',user);
                 const res1=await axios.post('http://localhost:3001/store/totalusers');
                 if(res.status===200)
                 {
                     alert('User saved');
                     const totalUsers = res1.data[0]['count(id)']; 
                     setTotaluser(totalUsers);
                     setOpen(false);
                 }
            }
            catch(err)
            {
                 console.error(err);
            }
    }

  return (
    <div style={{overflowX:'hidden'}}>
            <Navbar style={{backgroundColor:'#e0e0e0',height:'60px'}}>
                    <Container>
                      <Navbar.Brand href="/" style={{fontWeight:'bold',fontSize:'30px',color:'black',textDecoration:'none',marginLeft:'60px'}}>Admin Dashboard</Navbar.Brand>
                      <Nav style={{marginLeft:'700px',fontWeight:'bold',fontSize:'20px'}}>
                        <Nav.Link href="/login" style={{textDecoration:"none",color:'#039be5'}}>Login</Nav.Link>
                        <Nav.Link href="/register" style={{marginLeft:'25px',textDecoration:'none',color:'#039be5'}}>Register</Nav.Link>
                      </Nav>
                    </Container>
                  </Navbar>
                    <Row style={{marginTop:'40px',marginLeft:'80px'}}>
                        <Col><div style={{height:'150px',width:'300px',backgroundColor:'#039be5',borderRadius:'25px',color:'white',fontSize:'25px',paddingTop:'40px',fontWeight:"bold",paddingLeft:'20px'}}>Total Users<br></br><span>{totaluser}</span></div></Col>
                        <Col><div style={{height:'150px',width:'300px',backgroundColor:'#039be5',borderRadius:'25px',color:'white',fontSize:'25px',paddingTop:'40px',fontWeight:"bold",paddingLeft:'20px'}}>Total Stores<br></br><span>{totalstore}</span></div></Col>
                        <Col><div style={{height:'150px',width:'300px',backgroundColor:'#039be5',borderRadius:'25px',color:'white',fontSize:'25px',paddingTop:'40px',fontWeight:"bold",paddingLeft:'20px'}}>Total Ratings<br></br><span>{rating}</span></div></Col>
                    </Row>
                    <Row>
                        <Col><Button onClick={viewUsers} style={{width:'230px',color:'black',backgroundColor:'white',marginTop:'20px',marginLeft:'60px'}}>View Users</Button></Col>
                        <Col><Button onClick={viewStore} style={{width:'230px',color:'black',backgroundColor:'white',marginTop:'20px',marginLeft:'60px'}}>View Stores</Button></Col>
                        <Col><Button onClick={addUser} style={{width:'230px',color:'black',backgroundColor:'white',marginTop:'20px',marginLeft:'60px'}}>Add new Users</Button></Col>
                        <Col><Button onClick={addStore} style={{width:'230px',color:'black',backgroundColor:'white',marginTop:'20px',marginLeft:'60px'}}>Add Store</Button></Col>
                    </Row>
                   {data && viewtable &&
                   <>
                   <h3  style={{marginTop:'50px'}}>User List</h3>
                   <Table striped bordered hover variant="light"  style={{marginTop:'20px'}}>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, index) => (
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.address}</td>
                                <td>{d.role}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        </>
                        }

              {data && viewstore &&
                   <>
                   <h3  style={{marginTop:'50px'}}>Store List</h3>
                   <Table striped bordered hover variant="light"  style={{marginTop:'20px'}}>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, index) => (
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.address}</td>
                                <td>{d.rating}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        </>
                        }
                        

                    <Modal show={modal} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add store</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Store name"
                            className="mb-3"
                            >
                    <Form.Control type="text" placeholder="Store Name" onChange={(e)=>setStorename(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Email" >
                        <Form.Control type="email" placeholder="email" onChange={(e)=>setStoreemail(e.target.value)} />
                    </FloatingLabel><br></br>
                    <FloatingLabel controlId="floatingPassword" label="Address" >
                        <Form.Control type="text" placeholder="Address" onChange={(e)=>setStoreaddr(e.target.value)} />
                    </FloatingLabel>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={saveStore}>
                            Save Changes 
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={open} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                            >
                    <Form.Control type="text" placeholder=" Name" onChange={(e)=>setname(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Email" >
                        <Form.Control type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
                    </FloatingLabel><br></br>
                    <FloatingLabel controlId="floatingPassword" label="Address" onChange={(e)=>setAddr(e.target.value)}>
                        <Form.Control type="text" placeholder="Address"  />
                    </FloatingLabel><br></br>
                    <FloatingLabel controlId="floatingPassword" label="Password" onChange={(e)=>setPass(e.target.value)}>
                        <Form.Control type="password" placeholder="Password"  />
                    </FloatingLabel><br></br>
                    <FloatingLabel controlId="floatingPassword" label="Role" onChange={(e)=>setRole(e.target.value)}>
                       <Form.Select required onChange={(e) => setRole(e.target.value)}>
                                                <option value="">Select Role</option>
                                                <option value="user">user</option>
                                                <option value="admin">admin</option>
                                                <option value="store owner">store owner</option>
                      </Form.Select>
                    </FloatingLabel>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={saveUser}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>


    </div>
  )
}
