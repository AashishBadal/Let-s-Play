import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditTournament = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Sample tournament data - replace with API call
  const sampleTournaments = [
    {
      id: 1,
      name: 'Summer Championship',
      game: 'Valorant',
      startDate: '2023-08-15',
      endDate: '2023-08-20',
      status: 'Upcoming',
      format: 'Single Elimination',
      prizePool: '5000',
      description: 'Annual summer tournament for Valorant teams',
      rules: 'Standard competitive rules apply',
      maxTeams: 16,
      registrationDeadline: '2023-08-10'
    },
    // Add more sample tournaments as needed
  ]

  const [tournament, setTournament] = useState({
    name: '',
    game: '',
    startDate: '',
    endDate: '',
    status: 'Upcoming',
    format: 'Single Elimination',
    prizePool: '',
    description: '',
    rules: '',
    maxTeams: '',
    registrationDeadline: ''
  })

  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState(['Valorant', 'League of Legends', 'Dota 2', 'CS:GO', 'Fortnite'])

  useEffect(() => {
    // Simulate API fetch
    const fetchTournament = () => {
      setTimeout(() => {
        const foundTournament = sampleTournaments.find(t => t.id === parseInt(id))
        if (foundTournament) {
          setTournament(foundTournament)
        } else {
          toast.error('Tournament not found')
          navigate('/organizer-dashboard/view-tournaments')
        }
        setIsLoading(false)
      }, 500)
    }
    
    fetchTournament()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTournament(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API update
    setTimeout(() => {
      toast.success('Tournament updated successfully!')
      setIsLoading(false)
      navigate('/organizer-dashboard/view-tournaments')
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">Edit Tournament</h1>
        <button
          onClick={() => navigate('/organizer-dashboard/view-tournaments')}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition-colors"
        >
          Back to Tournaments
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tournament Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Tournament Name</label>
            <input
              type="text"
              name="name"
              value={tournament.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          {/* Game Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Game</label>
            <select
              name="game"
              value={tournament.game}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            >
              <option value="">Select a game</option>
              {games.map((game, index) => (
                <option key={index} value={game}>{game}</option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={tournament.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">End Date</label>
            <input
              type="date"
              name="endDate"
              value={tournament.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          {/* Tournament Format */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Tournament Format</label>
            <select
              name="format"
              value={tournament.format}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            >
              <option value="Single Elimination">Single Elimination</option>
              <option value="Double Elimination">Double Elimination</option>
              <option value="Round Robin">Round Robin</option>
              <option value="Swiss">Swiss</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <select
              name="status"
              value={tournament.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Prize Pool */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Prize Pool ($)</label>
            <input
              type="number"
              name="prizePool"
              value={tournament.prizePool}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              min="0"
              required
            />
          </div>

          {/* Max Teams */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Max Teams</label>
            <input
              type="number"
              name="maxTeams"
              value={tournament.maxTeams}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              min="2"
              required
            />
          </div>

          {/* Registration Deadline */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Registration Deadline</label>
            <input
              type="date"
              name="registrationDeadline"
              value={tournament.registrationDeadline}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            name="description"
            value={tournament.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        {/* Rules */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Rules</label>
          <textarea
            name="rules"
            value={tournament.rules}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/organizer-dashboard/view-tournaments')}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTournament