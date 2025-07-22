import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ForgotPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify'
import OrganizerRegistrationForm from './pages/BeAOrganizer'
import OrganizerDashboard from './pages/OrganizerDashboard'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/be-an-organizer" element={<OrganizerRegistrationForm />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard  />} />
      </Routes>
    </div>
  )
}

export default App