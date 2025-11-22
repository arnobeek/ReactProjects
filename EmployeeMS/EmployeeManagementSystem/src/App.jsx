import { useState } from 'react'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Employee from './components/Employee'
import Category from './components/Category'
import Profile from './components/Profile'
import Add_Category from './components/Add_Category'
import Add_Employee from './components/Add_Employee'
import EditEmployee from './components/EditEmployee'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard />}>
      <Route path='/dashboard' element={<Home />}></Route>
      <Route path='/dashboard/employee' element={<Employee />}></Route>
      <Route path='/dashboard/category' element={<Category />}></Route>
      <Route path='/dashboard/profile' element={<Profile />}></Route>
      <Route path='/dashboard/add_category' element={<Add_Category />}></Route>
      <Route path='/dashboard/add_employee' element={<Add_Employee />}></Route>
      <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
      </Route>

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
