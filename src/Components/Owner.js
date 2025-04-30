import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Nav,Navbar,Container,Table,Button } from 'react-bootstrap';
import { Dialog,DialogActions,DialogContent ,DialogTitle} from '@mui/material';

export default function Owner() {

    const[pass,setPass]=useState(false);
    const[password,setPassword]=useState('');
    const location=useLocation();
    const[data,setData]=useState([]);
    const handleClose=()=>{setPass(false)};
    
      useEffect(()=>{
            const state=location.state;
             setData(state.data);
             console.log(state.data);
         
      },[location.state]);
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
      const groupedData = data.reduce((acc, item) => {
        const existing = acc.find((entry) => entry.name === item.name);
        if (existing) {
          existing.ratings.push(item.rating);
        } else {
          acc.push({ name: item.name, address: item.address, ratings: [item.rating] });
        }
        return acc;
      }, []);
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
                               <h4>View Store</h4>
                             <Table striped bordered hover variant="light"  style={{marginTop:'20px'}}>
                               <thead>
                                   <tr>
                                   <th>Store Name</th>
                                   <th>Address</th>
                                   <th>Overating</th>
                                   <th>Average Rating</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {groupedData.map((d, index) =>{
                                   const avg =d.ratings.reduce((a, b) => a + Number(b), 0) / d.ratings.length;
                                   return(
                                       <tr key={index}>
                                       <td>{d.name}</td>
                                       <td>{d.address}</td>
                                       <td>{d.ratings.join(', ')}</td>
                                       <td>{avg.toFixed(1)}</td>
                                       </tr>
                                   )})}
                                   </tbody>
                               </Table>
                               </div>
                              
                                                
  )
}
