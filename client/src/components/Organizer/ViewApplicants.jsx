import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ViewApplicants = () => {
  const { tournamentId } = useParams()
  const [applicants, setApplicants] = useState([])
  const [tournament, setTournament] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  // Sample data - replace with API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Simulate API calls
        setTimeout(() => {
          setTournament({
            id: tournamentId,
            name: 'Valorant Summer Championship',
            game: 'Valorant',
            status: 'Registration Open'
          })
          
          setApplicants([
            {
              id: 1,
              teamName: 'Phoenix Rising',
              captain: 'player1@example.com',
              members: 5,
              appliedDate: '2023-07-15',
              status: 'Pending',
              contact: '+1234567890'
            },
            {
              id: 2,
              teamName: 'Shadow Strike',
              captain: 'player2@example.com',
              members: 4,
              appliedDate: '2023-07-16',
              status: 'Approved',
              contact: '+1987654321'
            },
            {
              id: 3,
              teamName: 'Neon Blaze',
              captain: 'player3@example.com',
              members: 5,
              appliedDate: '2023-07-17',
              status: 'Rejected',
              contact: '+1122334455'
            },
            {
              id: 4,
              teamName: 'Viper Squad',
              captain: 'player4@example.com',
              members: 3,
              appliedDate: '2023-07-18',
              status: 'Pending',
              contact: '+1567890123'
            }
          ])
          setIsLoading(false)
        }, 800)
      } catch (error) {
        toast.error(error.message || 'Failed to load applicants')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [tournamentId])

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         applicant.captain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || applicant.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const updateStatus = (applicantId, newStatus) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
    ))
    toast.success(`Status updated to ${newStatus}`)
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
      {/* Tournament Info Header */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">{tournament?.name || 'Tournament'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
          <span>Game: {tournament?.game}</span>
          <span>Status: <span className={`font-medium ${
            tournament?.status === 'Registration Open' ? 'text-green-400' : 'text-yellow-400'
          }`}>{tournament?.status}</span></span>
          <span>Total Applicants: {applicants.length}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-white">Team Applications</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search teams..."
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Captain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Members</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Applied Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-white">{applicant.teamName}</div>
                    <div className="text-xs text-gray-400">{applicant.contact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {applicant.captain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {applicant.members}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {applicant.appliedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      applicant.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                      applicant.status === 'Rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => updateStatus(applicant.id, 'Approved')}
                        className="text-green-400 hover:text-green-300"
                        disabled={applicant.status === 'Approved'}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(applicant.id, 'Rejected')}
                        className="text-red-400 hover:text-red-300"
                        disabled={applicant.status === 'Rejected'}
                      >
                        Reject
                      </button>
                      <Link
                        to={`/team-details/${applicant.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-400">
                  No applicants found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stats and Export */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4">
        <div className="text-sm text-gray-400">
          Showing {filteredApplicants.length} of {applicants.length} applicants
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white">
            Export to CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white">
            Send Bulk Message
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewApplicants