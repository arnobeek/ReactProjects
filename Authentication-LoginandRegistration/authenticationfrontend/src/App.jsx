import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import AuthScreen from './components/AuthScreen';
import Signup from './components/Signup';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='' element={<AuthScreen />}>
      <Route path='' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
