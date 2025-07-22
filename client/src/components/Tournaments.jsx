import { useState } from 'react';

// Mock data for 30 tournaments
const tournaments = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Tournament ${i + 1}`,
  game: ['Dota 2', 'CS:GO', 'Valorant', 'League of Legends', 'Fortnite'][Math.floor(Math.random() * 5)],
  prize: `$${(Math.floor(Math.random() * 90) + 10) * 1000}`,
  startDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  participants: Math.floor(Math.random() * 500) + 50,
  status: ['Upcoming', 'Ongoing', 'Completed'][Math.floor(Math.random() * 3)],
  image: `https://picsum.photos/300/200?random=${i + 1}`
}));

const TournamentCard = ({ tournament }) => {
  const getStatusColor = () => {
    switch (tournament.status) {
      case 'Upcoming': return 'bg-blue-500';
      case 'Ongoing': return 'bg-green-500';
      case 'Completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img 
          src={tournament.image} 
          alt={tournament.name} 
          className="w-full h-40 object-cover"
        />
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
          {tournament.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
        <div className="flex items-center text-gray-300 mb-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>{tournament.game}</span>
        </div>
        <div className="flex items-center text-gray-300 mb-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Starts: {tournament.startDate}</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center text-yellow-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tournament.prize}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{tournament.participants}</span>
          </div>
        </div>
        <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

const TournamentGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const tournamentsPerPage = 6;

  // Calculate pagination
  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = tournaments.slice(indexOfFirstTournament, indexOfLastTournament);
  const totalPages = Math.ceil(tournaments.length / tournamentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Upcoming Tournaments
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Compete with the best and win amazing prizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
      </div>
    </div>
  );
};

export default TournamentGrid;