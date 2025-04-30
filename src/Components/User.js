import React, { useEffect, useState } from 'react';
import { Nav,Navbar,Container,Table,Button } from 'react-bootstrap';
import { Dialog,DialogActions,DialogContent ,DialogTitle} from '@mui/material';
import { useLocation } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';

export default function User() {
  
  const location=useLocation();
  const[data,setData]=useState([]);
  const[rate,setRate]=useState(false);
  const[rating,setRating]=useState(0);
  const[name,setName]=useState('');
  const[pass,setPass]=useState(false);
  const[password,setPassword]=useState('');

  useEffect(()=>{
        const state=location.state;
         setData(state.data);
     
  },[location.state]);
  const handleClose=()=>{setRate(false); setPass(false)};
  const saveRating=async()=>{
              try{
                const user={
                   rate:rating,
                   name:name
                }
                    const res=await axios.post('http://localhost:3001/store/rating',user);
                    if(res.status===200)
                    {
                      alert('Thanks for rating!!');
                      setRate(false);
                      const res1=await axios.post('http://localhost:3001/store/getstore');
                      setData(res1.data);
                    }
              }
              catch(err)
              {
                 console.log(err);
              }
  }
  const groupedData = data.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.name === item.name);
    if (existing) {
      existing.ratings.push(item.rating);
    } else {
      acc.push({ name: item.name, address: item.address, ratings: [item.rating] });
    }
    return acc;
  }, []);

  const savePassword=async()=>{
     try{
           const email=location.state.email;
           console.log(email);
           const user={
            email:email,
            pass:password
           }
          const res=await axios.post('http://localhost:3001/store/updatePass',user);
          if(res.status===200)
          {
             alert('password updated');
             setPass(false);
          }
     }
     catch(err)
     {
       console.log(err);
     }
  }
  return (
    <div style={{overflowX:'hidden'}}>
                <Navbar style={{backgroundColor:'#e0e0e0',height:'60px'}}>
                        <Container>
                          <Navbar.Brand href="/" style={{fontWeight:'bold',fontSize:'30px',color:'black',textDecoration:'none',marginLeft:'40px'}}>User Dashboard</Navbar.Brand>
                          <Nav style={{marginLeft:'700px',fontWeight:'bold',fontSize:'20px'}}>
                            <Nav.Link href="/login" style={{textDecoration:"none",color:'#039be5'}}>LogOut</Nav.Link>
                            <p style={{marginLeft:'25px',textDecoration:'none',color:'#039be5',paddingTop:'7px'}} onClick={()=>setPass(true)}>Password</p>
                          </Nav>
                        </Container>
                      </Navbar>
                      <div style={{textAlign:'center'}}>
                      <input type='text' placeholder='Search by Name' style={{marginTop:'40px',width:"400px",borderRadius:'30px',height:'40px'}}></input>
                      <input type='text' placeholder='Search by Address' style={{marginTop:'40px',width:"400px",borderRadius:'30px',height:'40px',marginLeft:'20px'}}></input>
                      </div>
                      <div>
                        <h4>View All Stores</h4>
                      <Table striped bordered hover variant="light"  style={{marginTop:'20px'}}>
                        <thead>
                            <tr>
                            <th>Store Name</th>
                            <th>Address</th>
                            <th>Overating</th>
                            <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedData.map((d, index) => (
                                <tr key={index}>
                                <td>{d.name}</td>
                                <td>{d.address}</td>
                                <td>{d.ratings.join(', ')}</td>
                                <td><Button onClick={()=>{setRate(true);setName(d.name)}}>Submit Rating</Button></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                      </div>
        <Dialog open={rate} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Give Rating</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", alignItems: "center", borderBottom: "2px solid #03a9f4", paddingBottom: "5px" }}>
             <input type='number' max={5} min={1} style={{ width:'400px'}} onChange={(e)=>setRating(e.target.value)}/>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#03a9f4" ,backgroundColor:'white'}}>Cancel</Button>
        <Button onClick={saveRating} style={{ color: "#03a9f4", fontWeight: "bold",backgroundColor:'white' }} >Save</Button>
      </DialogActions>
    </Dialog>

    <Dialog open={pass} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", alignItems: "center",paddingBottom: "5px" }}>
             <input type='Password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#03a9f4" ,backgroundColor:'white'}}>Cancel</Button>
        <Button onClick={savePassword} style={{ color: "#03a9f4", fontWeight: "bold",backgroundColor:'white' }} >Save</Button>
      </DialogActions>
    </Dialog>
    </div>
                     
  
  )
}
