import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const OrganizerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar - Dark Theme */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Organizer Dashboard</h2>
        
        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <NavLink 
                to="add-tournament"
                className={({ isActive }) => 
                  `block p-3 rounded-lg transition-all hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-blue-400 font-medium' : 'text-gray-300'}`
                }
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Tournament
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="view-tournaments"
                className={({ isActive }) => 
                  `block p-3 rounded-lg transition-all hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-blue-400 font-medium' : 'text-gray-300'}`
                }
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  View Tournaments
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="view-applicants/:id"
                className={({ isActive }) => 
                  `block p-3 rounded-lg transition-all hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-blue-400 font-medium' : 'text-gray-300'}`
                }
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  View Applicants
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Footer/User Info */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xs font-bold">OP</span>
            </div>
            <div>
              <p className="text-sm font-medium">Organizer Profile</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Dark Theme */}
      <div className="flex-1 p-6 overflow-auto bg-gray-900">
        <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default OrganizerDashboard