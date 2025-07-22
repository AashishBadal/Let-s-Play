import { useState } from 'react';
import TournamentRegisterModal from './RegisterForTournament';

// Mock data for 30 tournaments
const tournaments = Array.from({ length: 30 }, (_, i) => {
  const status = ['Upcoming', 'Ongoing', 'Completed'][Math.floor(Math.random() * 3)];
  const maxParticipants = Math.floor(Math.random() * 100) + 50;
  const currentParticipants = Math.floor(Math.random() * maxParticipants);
  const isFilled = currentParticipants >= maxParticipants;
  const isAccepting = status === 'Upcoming' && !isFilled;
  
  return {
    id: i + 1,
    name: `Tournament ${i + 1}`,
    game: ['Dota 2', 'CS:GO', 'Valorant', 'League of Legends', 'Fortnite'][Math.floor(Math.random() * 5)],
    prize: `$${(Math.floor(Math.random() * 90) + 10) * 1000}`,
    startDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    endDate: new Date(Date.now() + (Math.floor(Math.random() * 30) + 3) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    maxParticipants,
    currentParticipants,
    entryFee: Math.random() > 0.3 ? `$${Math.floor(Math.random() * 50) + 5}` : 'Free',
    status,
    isFilled,
    isAccepting
  };
});

const TournamentCard = ({ tournament }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const getStatusColor = () => {
    switch (tournament.status) {
      case 'Upcoming': return tournament.isAccepting ? 'bg-blue-500' : 'bg-gray-500';
      case 'Ongoing': return 'bg-green-500';
      case 'Completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-700">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
            {tournament.isFilled ? 'Filled' : tournament.status}
          </span>
        </div>
        
        <div className="flex items-center text-gray-300 mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>{tournament.game}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-300">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="text-xs text-gray-400">Starts</div>
              <div>{tournament.startDate}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-300">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="text-xs text-gray-400">Ends</div>
              <div>{tournament.endDate}</div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Slots: {tournament.currentParticipants}/{tournament.maxParticipants}</span>
            {tournament.isFilled && <span className="text-red-400">Filled</span>}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-indigo-500 h-2 rounded-full" 
              style={{ width: `${(tournament.currentParticipants / tournament.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-yellow-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tournament.prize}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{tournament.entryFee}</span>
          </div>
        </div>
        
        <button 
        onClick={() => setShowRegisterModal(true)}
        className={`w-full mt-4 py-2 px-4 rounded-md transition-colors duration-300 ${
          tournament.isAccepting 
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
        }`}
        disabled={!tournament.isAccepting}
      >
        {tournament.status === 'Completed' 
          ? 'View Results' 
          : tournament.isAccepting 
            ? 'Register Now' 
            : 'Registration Closed'}
      </button>
        {showRegisterModal && (
        <TournamentRegisterModal 
          tournament={tournament} 
          onClose={() => setShowRegisterModal(false)} 
        />
      )}
      </div>
    </div>
  );
};

const TournamentGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'open', 'ongoing', 'completed'

  const tournamentsPerPage = 6;

  const filteredTournaments = tournaments.filter(tournament => {
    if (statusFilter === 'open') return tournament.isAccepting;
    if (statusFilter === 'ongoing') return tournament.status === 'Ongoing';
    if (statusFilter === 'completed') return tournament.status === 'Completed';
    return true; // 'all'
  });

  // Calculate pagination
  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);
  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Tournaments
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Find and join competitive gaming tournaments
          </p>
        </div>

        {/* Simplified Status Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                statusFilter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Tournaments
            </button>
            <button
              onClick={() => setStatusFilter('open')}
              className={`px-4 py-2 text-sm font-medium ${
                statusFilter === 'open' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Open for Registration
            </button>
            <button
              onClick={() => setStatusFilter('ongoing')}
              className={`px-4 py-2 text-sm font-medium ${
                statusFilter === 'ongoing' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                statusFilter === 'completed' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {currentTournaments.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentTournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &larr; Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next &rarr;
                </button>
              </nav>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">No tournaments match your current filter</p>
            <button 
              onClick={() => setStatusFilter('all')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Show All Tournaments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentGrid;