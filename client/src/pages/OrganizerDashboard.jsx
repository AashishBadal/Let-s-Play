import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUsers, FaCheck, FaTimes, FaSearch, FaCalendarAlt, FaMoneyBillWave, FaTrophy } from 'react-icons/fa';

const OrganizerDashboard = () => {
  // Sample data - replace with API calls in real implementation
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      title: 'Valorant Championship',
      game: 'Valorant',
      date: '2023-11-15',
      prize: '$10,000',
      status: 'active',
      applicants: [
        { id: 101, name: 'Team Phoenix', status: 'pending' },
        { id: 102, name: 'Team Hydra', status: 'accepted' },
        { id: 103, name: 'Team Titans', status: 'rejected' }
      ]
    },
    {
      id: 2,
      title: 'CS:GO Open',
      game: 'CS:GO',
      date: '2023-12-05',
      prize: '$5,000',
      status: 'upcoming',
      applicants: [
        { id: 201, name: 'Team Elite', status: 'pending' },
        { id: 202, name: 'Team Vortex', status: 'pending' }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState('tournaments');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTournament, setCurrentTournament] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    date: '',
    prize: '',
    description: '',
    rules: '',
    maxTeams: '',
    entryFee: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Filter tournaments based on search
  const filteredTournaments = tournaments.filter(tournament =>
    tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create new tournament
  const handleCreateTournament = (e) => {
    e.preventDefault();
    const newTournament = {
      id: tournaments.length + 1,
      title: formData.title,
      game: formData.game,
      date: formData.date,
      prize: formData.prize,
      status: 'upcoming',
      applicants: [],
      ...formData
    };
    setTournaments([...tournaments, newTournament]);
    setShowCreateModal(false);
    setFormData({
      title: '',
      game: '',
      date: '',
      prize: '',
      description: '',
      rules: '',
      maxTeams: '',
      entryFee: ''
    });
  };

  // Edit tournament
  const handleEditTournament = (e) => {
    e.preventDefault();
    const updatedTournaments = tournaments.map(tournament =>
      tournament.id === currentTournament.id ? { ...tournament, ...formData } : tournament
    );
    setTournaments(updatedTournaments);
    setShowEditModal(false);
  };

  // Delete tournament
  const handleDeleteTournament = (id) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      setTournaments(tournaments.filter(tournament => tournament.id !== id));
    }
  };

  // Set up edit form
  const setupEditForm = (tournament) => {
    setCurrentTournament(tournament);
    setFormData({
      title: tournament.title,
      game: tournament.game,
      date: tournament.date,
      prize: tournament.prize,
      description: tournament.description || '',
      rules: tournament.rules || '',
      maxTeams: tournament.maxTeams || '',
      entryFee: tournament.entryFee || ''
    });
    setShowEditModal(true);
  };

  // Handle applicant status change
  const handleApplicantStatus = (tournamentId, applicantId, status) => {
    const updatedTournaments = tournaments.map(tournament => {
      if (tournament.id === tournamentId) {
        const updatedApplicants = tournament.applicants.map(applicant => {
          if (applicant.id === applicantId) {
            return { ...applicant, status };
          }
          return applicant;
        });
        return { ...tournament, applicants: updatedApplicants };
      }
      return tournament;
    });
    setTournaments(updatedTournaments);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">Organizer Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tournaments..."
                className="bg-gray-700 text-white px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center">
              <FaPlus className="mr-2" /> New Tournament
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`${activeTab === 'tournaments' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Tournaments
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`${activeTab === 'applications' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${activeTab === 'analytics' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Tournaments Tab */}
        {activeTab === 'tournaments' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-300">Your Tournaments</h2>
              <button
                onClick={() => {
                  setShowCreateModal(true);
                  setFormData({
                    title: '',
                    game: '',
                    date: '',
                    prize: '',
                    description: '',
                    rules: '',
                    maxTeams: '',
                    entryFee: ''
                  });
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaPlus className="mr-2" /> Create Tournament
              </button>
            </div>

            {filteredTournaments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No tournaments found. Create your first tournament!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTournaments.map(tournament => (
                  <div key={tournament.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white">{tournament.title}</h3>
                          <p className="text-gray-400">{tournament.game}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tournament.status === 'active' ? 'bg-green-900 text-green-300' :
                          tournament.status === 'upcoming' ? 'bg-blue-900 text-blue-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {tournament.status}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center text-gray-400">
                        <FaCalendarAlt className="mr-2" />
                        <span>{new Date(tournament.date).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-2 flex items-center text-gray-400">
                        <FaMoneyBillWave className="mr-2" />
                        <span>{tournament.prize}</span>
                      </div>
                      <div className="mt-2 flex items-center text-gray-400">
                        <FaUsers className="mr-2" />
                        <span>{tournament.applicants.length} applicants</span>
                      </div>
                      <div className="mt-6 flex justify-between">
                        <button
                          onClick={() => setupEditForm(tournament)}
                          className="text-gray-300 hover:text-purple-400 flex items-center"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTournament(tournament.id)}
                          className="text-gray-300 hover:text-red-400 flex items-center"
                        >
                          <FaTrash className="mr-1" /> Delete
                        </button>
                        <button
                          onClick={() => {
                            setCurrentTournament(tournament);
                            setActiveTab('applications');
                          }}
                          className="text-purple-400 hover:text-purple-300 flex items-center"
                        >
                          <FaUsers className="mr-1" /> View Applicants
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-300">
                {currentTournament ? `${currentTournament.title} Applicants` : 'Tournament Applications'}
              </h2>
              {currentTournament && (
                <button
                  onClick={() => setCurrentTournament(null)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ← Back to all tournaments
                </button>
              )}
            </div>

            {currentTournament ? (
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white">{currentTournament.title}</h3>
                    <div className="flex items-center mt-2 text-gray-400">
                      <FaCalendarAlt className="mr-2" />
                      <span>{new Date(currentTournament.date).toLocaleDateString()}</span>
                      <FaMoneyBillWave className="ml-4 mr-2" />
                      <span>{currentTournament.prize}</span>
                    </div>
                  </div>

                  {currentTournament.applicants.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No applicants yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Team Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          {currentTournament.applicants.map(applicant => (
                            <tr key={applicant.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-white">{applicant.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  applicant.status === 'accepted' ? 'bg-green-900 text-green-300' :
                                  applicant.status === 'rejected' ? 'bg-red-900 text-red-300' :
                                  'bg-gray-700 text-gray-300'
                                }`}>
                                  {applicant.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleApplicantStatus(currentTournament.id, applicant.id, 'accepted')}
                                    className={`${applicant.status === 'accepted' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'} flex items-center`}
                                    disabled={applicant.status === 'accepted'}
                                  >
                                    <FaCheck className="mr-1" /> Accept
                                  </button>
                                  <button
                                    onClick={() => handleApplicantStatus(currentTournament.id, applicant.id, 'rejected')}
                                    className={`${applicant.status === 'rejected' ? 'text-red-400' : 'text-gray-400 hover:text-red-400'} flex items-center`}
                                    disabled={applicant.status === 'rejected'}
                                  >
                                    <FaTimes className="mr-1" /> Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map(tournament => (
                  <div key={tournament.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white">{tournament.title}</h3>
                          <p className="text-gray-400">{tournament.game}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tournament.status === 'active' ? 'bg-green-900 text-green-300' :
                          tournament.status === 'upcoming' ? 'bg-blue-900 text-blue-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {tournament.status}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center text-gray-400">
                        <FaUsers className="mr-2" />
                        <span>{tournament.applicants.length} applicants</span>
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={() => setCurrentTournament(tournament)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center"
                        >
                          <FaUsers className="mr-2" /> Manage Applicants
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-6">Tournament Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Total Tournaments</h3>
                <p className="text-3xl font-bold text-purple-400">{tournaments.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Total Applicants</h3>
                <p className="text-3xl font-bold text-purple-400">
                  {tournaments.reduce((acc, tournament) => acc + tournament.applicants.length, 0)}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Active Tournaments</h3>
                <p className="text-3xl font-bold text-purple-400">
                  {tournaments.filter(t => t.status === 'active').length}
                </p>
              </div>
            </div>
            <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-gray-300 mb-4">Tournament Performance</h3>
              <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                [Chart Placeholder - Implement with Chart.js or similar]
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create Tournament Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Create New Tournament</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleCreateTournament}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tournament Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Game</label>
                    <input
                      type="text"
                      name="game"
                      value={formData.game}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Prize Pool</label>
                    <input
                      type="text"
                      name="prize"
                      value={formData.prize}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Entry Fee</label>
                    <input
                      type="text"
                      name="entryFee"
                      value={formData.entryFee}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Max Teams</label>
                    <input
                      type="number"
                      name="maxTeams"
                      value={formData.maxTeams}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Rules</label>
                    <textarea
                      name="rules"
                      value={formData.rules}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                  >
                    Create Tournament
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tournament Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Edit Tournament</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleEditTournament}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tournament Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Game</label>
                    <input
                      type="text"
                      name="game"
                      value={formData.game}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Prize Pool</label>
                    <input
                      type="text"
                      name="prize"
                      value={formData.prize}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Entry Fee</label>
                    <input
                      type="text"
                      name="entryFee"
                      value={formData.entryFee}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Max Teams</label>
                    <input
                      type="number"
                      name="maxTeams"
                      value={formData.maxTeams}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Rules</label>
                    <textarea
                      name="rules"
                      value={formData.rules}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;