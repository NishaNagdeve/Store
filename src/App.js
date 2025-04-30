import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Admin from './Components/Admin';
import Owner from './Components/Owner';
import User from './Components/User';
import Welcome from './Components/Welcome';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' to element={<Admin/>}/>
        <Route path='/owner' to element={<Owner/>}/>
        <Route path='/user' to element={<User/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
