import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ViewTournaments = () => {
  // Sample tournament data - replace with your actual data
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: 'Summer Championship',
      game: 'Valorant',
      startDate: '2023-08-15',
      endDate: '2023-08-20',
      status: 'Upcoming',
      participants: 24,
      prizePool: '$5,000'
    },
    {
      id: 2,
      name: 'Winter Showdown',
      game: 'League of Legends',
      startDate: '2023-12-10',
      endDate: '2023-12-17',
      status: 'Ongoing',
      participants: 32,
      prizePool: '$10,000'
    },
    {
      id: 3,
      name: 'Spring Invitational',
      game: 'Dota 2',
      startDate: '2023-04-05',
      endDate: '2023-04-12',
      status: 'Completed',
      participants: 16,
      prizePool: '$7,500'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || tournament.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const deleteTournament = (id) => {
    setTournaments(tournaments.filter(tournament => tournament.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-400">Your Tournaments</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search tournaments..."
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <Link
            to="../add-tournament"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white text-center transition-colors"
          >
            Create New
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Game</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prize Pool</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{tournament.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{tournament.game}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {tournament.startDate} to {tournament.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tournament.status === 'Upcoming' ? 'bg-yellow-500/10 text-yellow-400' :
                      tournament.status === 'Ongoing' ? 'bg-green-500/10 text-green-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {tournament.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {tournament.participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {tournament.prizePool}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link
                        to={`/organizer-dashboard/edit-tournament/${tournament.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTournament(tournament.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-400">
                  No tournaments found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination would go here */}
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div>Showing {filteredTournaments.length} of {tournaments.length} tournaments</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewTournaments