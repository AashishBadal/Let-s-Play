import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TeamDetails = () => {
  const navigate = useNavigate();
  
  // Dummy data with dark theme styling
  const [team, setTeam] = useState({
    id: 1,
    teamName: 'Phoenix Rising',
    logo: 'https://via.placeholder.com/150/1a202c/FFFFFF?text=TR',
    status: 'Pending',
    captain: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 123-4567'
    },
    members: [
      { id: 1, name: 'Alex Johnson', role: 'Captain' },
      { id: 2, name: 'Sam Wilson', role: 'Entry Fragger' }
    ],
    registration: {
      date: '2023-07-15 14:30',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 123-4567',
      esewaNumber: '9801234567',
      esewaName: 'Alex Johnson',
      paymentProof: 'https://via.placeholder.com/600x300/1a202c/FFFFFF?text=Payment+Proof',
      verified: false,
      fee: 'Rs. 1000'
    },
    tournament: {
      name: 'Valorant Summer Championship',
      game: 'Valorant',
      dates: 'Aug 15-20, 2023'
    }
  });

  const updateStatus = (newStatus) => {
    setTeam({...team, status: newStatus});
    toast.success(`Status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6 text-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-400">{team.tournament.name}</h1>
        <div className="flex flex-wrap gap-3 mt-2 text-sm">
          <span className="bg-gray-800 px-3 py-1 rounded-full">{team.tournament.game}</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full">{team.tournament.dates}</span>
          <span className={`px-3 py-1 rounded-full ${
            team.status === 'Approved' ? 'bg-green-900 text-green-300' :
            team.status === 'Rejected' ? 'bg-red-900 text-red-300' :
            'bg-yellow-900 text-yellow-300'
          }`}>
            {team.status}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Team Profile */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-4 mb-5">
            <img 
              src={team.logo} 
              alt="Team logo" 
              className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">{team.teamName}</h2>
              <p className="text-gray-400 text-sm">Registered: {team.registration.date}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Captain</h3>
              <p>{team.captain.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Contact</h3>
              <p>{team.captain.email}</p>
              <p>{team.captain.phone}</p>
            </div>
          </div>
        </div>

        {/* Registration Details */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <h2 className="text-xl font-bold mb-5">Registration Details</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Full Name</h3>
              <p>{team.registration.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Email</h3>
              <p>{team.registration.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Phone</h3>
              <p>{team.registration.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">eSewa Number</h3>
              <p>{team.registration.esewaNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">eSewa Name</h3>
              <p>{team.registration.esewaName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Entry Fee</h3>
              <p>{team.registration.fee}</p>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Payment Proof</h3>
            <a 
              href={team.registration.paymentProof} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src={team.registration.paymentProof} 
                alt="Payment proof" 
                className="h-24 rounded border border-gray-600 hover:border-blue-400 transition"
              />
            </a>
            <p className={`mt-2 text-sm ${
              team.registration.verified ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {team.registration.verified ? '✓ Verified' : 'Pending verification'}
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <h2 className="text-xl font-bold mb-5">Team Members ({team.members.length})</h2>
          
          <div className="space-y-3">
            {team.members.map(member => (
              <div key={member.id} className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p>{member.name}</p>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          Back to List
        </button>
        {team.status !== 'Approved' && (
          <button
            onClick={() => updateStatus('Approved')}
            className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition"
          >
            Approve Team
          </button>
        )}
        {team.status !== 'Rejected' && (
          <button
            onClick={() => updateStatus('Rejected')}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition"
          >
            Reject Team
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;