import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import AuthScreen from './components/AuthScreen';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='' element={<AuthScreen />}>
      <Route path='' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      </Route>
      <Route path='/home' element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
