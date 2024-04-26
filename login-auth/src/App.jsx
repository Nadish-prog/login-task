import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from "./Login.jsx";
import './App.css';
import Register from './Register.jsx';
import Dashboard from './Dashboard.jsx';
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Profile from './profile.jsx';
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
