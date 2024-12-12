import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Settingpage from './pages/Settingpage.jsx'
import Profilpage from './pages/Profilpage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
const App = () => {

  const { authUser, checkAuth, isChecking } = useAuthStore()
  console.log("hello")

  useEffect(() => {

    checkAuth()
  }, [checkAuth])
  console.log(authUser)
  if (isChecking && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <div className='loading loading-lg loading-dots bg-primary'>

      </div>

    </div>
  )

  return (
    <div>
      hi
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/setting' element={<Settingpage />} />
        <Route path='/profil' element={authUser ? <Profilpage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster position='top-center' />

    </div>
  )
}

export default App
