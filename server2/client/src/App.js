import React, { createContext, useReducer } from 'react'
import { BrowserRouter as Router, Rute, Routes, Route } from 'react-router-dom'
import Contact from './components/Contact'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
// import "./App.css";
import Signup from './components/Signup'
import Login from './components/Login'
import "bootstrap/dist/css/bootstrap.css";
import Errorpage from './components/Errorpage'
import Logout from './components/Logout'
import { initialState, reducer } from './reducer/UseReducer'


//1 context APi
export const UserContext = createContext(); // as we have exported this page so dont need to write everywhere



const App = () => {
   
   const [state, dispatch] = useReducer(reducer, initialState)
  return (
    
   <>
   <UserContext.Provider value={{state,dispatch}}>
   <Navbar/>
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route element={<Errorpage/>}/>
    </Routes>
    </UserContext.Provider>
   
   </>
  )
}

export default App
