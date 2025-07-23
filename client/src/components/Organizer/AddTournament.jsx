import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TournamentCreationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    game: 'Valorant',
    description: '',
    startDate: null,
    endDate: null,
    prizePool: {
      total: 0,
      distribution: [{ position: 1, prize: 0, currency: 'USD' }]
    },
    entryFee: {
      amount: 0,
      currency: 'USD',
      perTeam: true
    },
    maxTeams: 16,
    registration: {
      status: 'open',
      startDate: null,
      endDate: null
    },
    rules: [{ title: '', description: '' }],
    format: 'single-elimination',
    platformRestrictions: [],
    minTeamSize: 1,
    maxTeamSize: 5
  });

  const games = [
    'Valorant', 'League of Legends', 'Dota 2', 
    'Counter-Strike 2', 'Fortnite', 'Rocket League', 'Other'
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'Other'];
  const formats = [
    'single-elimination', 'double-elimination', 
    'round-robin', 'swiss', 'custom'
  ];
  const platforms = ['PC', 'PlayStation', 'Xbox', 'Mobile', 'Switch'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handlePrizeDistributionChange = (index, field, value) => {
    const updatedDistributions = [...formData.prizePool.distribution];
    updatedDistributions[index][field] = field === 'position' || field === 'prize' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      prizePool: {
        ...prev.prizePool,
        distribution: updatedDistributions,
        total: updatedDistributions.reduce((sum, item) => sum + item.prize, 0)
      }
    }));
  };

  const addPrizeDistribution = () => {
    const nextPosition = formData.prizePool.distribution.length + 1;
    setFormData(prev => ({
      ...prev,
      prizePool: {
        ...prev.prizePool,
        distribution: [
          ...prev.prizePool.distribution,
          { position: nextPosition, prize: 0, currency: 'USD' }
        ]
      }
    }));
  };

  const removePrizeDistribution = (index) => {
    const updatedDistributions = formData.prizePool.distribution.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      prizePool: {
        ...prev.prizePool,
        distribution: updatedDistributions,
        total: updatedDistributions.reduce((sum, item) => sum + item.prize, 0)
      }
    }));
  };

  const handleRuleChange = (index, field, value) => {
    const updatedRules = [...formData.rules];
    updatedRules[index][field] = value;
    setFormData(prev => ({
      ...prev,
      rules: updatedRules
    }));
  };

  const addRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, { title: '', description: '' }]
    }));
  };

  const removeRule = (index) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const togglePlatform = (platform) => {
    setFormData(prev => {
      const newPlatforms = prev.platformRestrictions.includes(platform)
        ? prev.platformRestrictions.filter(p => p !== platform)
        : [...prev.platformRestrictions, platform];
      return {
        ...prev,
        platformRestrictions: newPlatforms
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tournament created:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">Create New Tournament</h1>
          <p className="mt-2 text-gray-400">Fill out the form below to set up your tournament</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Tournament Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="game" className="block text-sm font-medium text-gray-300 mb-1">
                  Game *
                </label>
                <select
                  id="game"
                  name="game"
                  value={formData.game}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  {games.map(game => (
                    <option key={game} value={game}>{game}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Start Date *
                </label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => setFormData({...formData, startDate: date})}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  End Date *
                </label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => setFormData({...formData, endDate: date})}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={formData.startDate}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Prize Pool */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Prize Pool</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="prizeTotal" className="block text-sm font-medium text-gray-300 mb-1">
                  Total Prize Pool
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-300">
                    $
                  </span>
                  <input
                    type="number"
                    id="prizeTotal"
                    value={formData.prizePool.total}
                    onChange={(e) => handleNestedChange('prizePool', 'total', Number(e.target.value))}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-300 mb-3">Prize Distribution</h3>
            {formData.prizePool.distribution.map((dist, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-gray-700 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Position</label>
                  <input
                    type="number"
                    value={dist.position}
                    onChange={(e) => handlePrizeDistributionChange(index, 'position', e.target.value)}
                    className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Prize Amount</label>
                  <div className="flex">
                    <select
                      value={dist.currency}
                      onChange={(e) => handlePrizeDistributionChange(index, 'currency', e.target.value)}
                      className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-300"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={dist.prize}
                      onChange={(e) => handlePrizeDistributionChange(index, 'prize', e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-600 border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removePrizeDistribution(index)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addPrizeDistribution}
              className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              Add Prize Position
            </button>
          </div>

          {/* Entry & Teams */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Entry & Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="entryFeeAmount" className="block text-sm font-medium text-gray-300 mb-1">
                  Entry Fee Amount
                </label>
                <div className="flex">
                  <select
                    value={formData.entryFee.currency}
                    onChange={(e) => handleNestedChange('entryFee', 'currency', e.target.value)}
                    className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-300"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    id="entryFeeAmount"
                    value={formData.entryFee.amount}
                    onChange={(e) => handleNestedChange('entryFee', 'amount', Number(e.target.value))}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="entryFeePerTeam"
                    checked={formData.entryFee.perTeam}
                    onChange={(e) => handleNestedChange('entryFee', 'perTeam', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="entryFeePerTeam" className="ml-2 block text-sm text-gray-300">
                    Fee is per team (not per player)
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="maxTeams" className="block text-sm font-medium text-gray-300 mb-1">
                  Maximum Teams *
                </label>
                <input
                  type="number"
                  id="maxTeams"
                  name="maxTeams"
                  value={formData.maxTeams}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="minTeamSize" className="block text-sm font-medium text-gray-300 mb-1">
                    Min Team Size
                  </label>
                  <input
                    type="number"
                    id="minTeamSize"
                    name="minTeamSize"
                    value={formData.minTeamSize}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="maxTeamSize" className="block text-sm font-medium text-gray-300 mb-1">
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    id="maxTeamSize"
                    name="maxTeamSize"
                    value={formData.maxTeamSize}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Registration */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Registration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Registration Start
                </label>
                <DatePicker
                  selected={formData.registration.startDate}
                  onChange={(date) => handleNestedChange('registration', 'startDate', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Registration End
                </label>
                <DatePicker
                  selected={formData.registration.endDate}
                  onChange={(date) => handleNestedChange('registration', 'endDate', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={formData.registration.startDate}
                  maxDate={formData.startDate}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="registrationStatus" className="block text-sm font-medium text-gray-300 mb-1">
                  Registration Status
                </label>
                <select
                  id="registrationStatus"
                  value={formData.registration.status}
                  onChange={(e) => handleNestedChange('registration', 'status', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tournament Format */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Tournament Format</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-gray-300 mb-1">
                  Tournament Format *
                </label>
                <select
                  id="format"
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  {formats.map(format => (
                    <option key={format} value={format}>{format.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Platform Restrictions */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Platform Restrictions</h2>
            <div className="flex flex-wrap gap-3">
              {platforms.map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={`px-4 py-2 rounded-md transition-colors ${formData.platformRestrictions.includes(platform) 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Tournament Rules</h2>
            {formData.rules.map((rule, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Rule Title</label>
                    <input
                      type="text"
                      value={rule.title}
                      onChange={(e) => handleRuleChange(index, 'title', e.target.value)}
                      className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      onClick={() => removeRule(index)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                      Remove Rule
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Rule Description</label>
                  <textarea
                    value={rule.description}
                    onChange={(e) => handleRuleChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addRule}
              className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              Add Rule
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-lg transition-colors"
            >
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentCreationForm;