import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ForgotPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify'
import OrganizerRegistrationForm from './pages/BeAOrganizer'
import OrganizerDashboard from './pages/OrganizerDashboard'
import TournamentCreationForm from './components/Organizer/AddTournament'
import ViewTournaments from './components/Organizer/ViewTournaments'
import ViewApplicants from './components/Organizer/ViewApplicants'
import EditTournament from './components/Organizer/EditTournament'

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
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />}>
          <Route index element={<ViewTournaments />} /> {/* Default child route */}
          <Route path="add-tournament" element={<TournamentCreationForm />} />
          <Route path="view-tournaments" element={<ViewTournaments />} />
          <Route path="view-applicants/:tournamentId" element={<ViewApplicants />} />
          <Route path="edit-tournament/:id" element={<EditTournament />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App