import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TournamentForm = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rules: '',
    startDate: '',
    endDate: '',
    slots: '',
    prizePool: '',
    firstPrize: '',
    secondPrize: '',
    thirdPrize: '',
    entryFee: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const payload = {
        ...formData,
        slots: Number(formData.slots),
        prizePool: Number(formData.prizePool),
        firstPrize: Number(formData.firstPrize),
        secondPrize: Number(formData.secondPrize),
        thirdPrize: Number(formData.thirdPrize),
        entryFee: Number(formData.entryFee),
      };

      const { data } = await axios.post(
        `${backendUrl}/api/tournaments`,
        payload,
        config
      );

      // Success - redirect or show success message
      navigate(`/tournaments/${data.tournament._id}`); // Redirect to tournament page
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to create tournament'
      );
      console.error('Error creating tournament:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-400">Create New Tournament</h1>
          <p className="mt-2 text-gray-400">Fill out the form to set up your tournament</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-900 text-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Tournament Title *
            </label>
            <div className="mt-1">
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter tournament title"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description *
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Describe your tournament"
              />
            </div>
          </div>

          {/* Rules and Regulations */}
          <div>
            <label htmlFor="rules" className="block text-sm font-medium text-gray-300">
              Rules & Regulations *
            </label>
            <div className="mt-1">
              <textarea
                id="rules"
                name="rules"
                rows={6}
                required
                value={formData.rules}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                placeholder="List all tournament rules and regulations"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">Be specific about allowed strategies, behavior, and disqualification criteria</p>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
                Start Date *
              </label>
              <div className="mt-1">
                <input
                  id="startDate"
                  name="startDate"
                  type="datetime-local"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">
                End Date *
              </label>
              <div className="mt-1">
                <input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  required
                  value={formData.endDate}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Slots and Entry Fee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="slots" className="block text-sm font-medium text-gray-300">
                Available Slots *
              </label>
              <div className="mt-1">
                <input
                  id="slots"
                  name="slots"
                  type="number"
                  min="1"
                  required
                  value={formData.slots}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Number of participants"
                />
              </div>
            </div>

            <div>
              <label htmlFor="entryFee" className="block text-sm font-medium text-gray-300">
                Entry Fee ($)
              </label>
              <div className="mt-1">
                <input
                  id="entryFee"
                  name="entryFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.entryFee}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Prize Pool */}
          <div>
            <label htmlFor="prizePool" className="block text-sm font-medium text-gray-300">
              Total Prize Pool ($)
            </label>
            <div className="mt-1">
              <input
                id="prizePool"
                name="prizePool"
                type="number"
                min="0"
                step="0.01"
                value={formData.prizePool}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Total prize money"
              />
            </div>
          </div>

          {/* Prize Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="firstPrize" className="block text-sm font-medium text-gray-300">
                1st Place Prize ($)
              </label>
              <div className="mt-1">
                <input
                  id="firstPrize"
                  name="firstPrize"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.firstPrize}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Prize amount"
                />
              </div>
            </div>

            <div>
              <label htmlFor="secondPrize" className="block text-sm font-medium text-gray-300">
                2nd Place Prize ($)
              </label>
              <div className="mt-1">
                <input
                  id="secondPrize"
                  name="secondPrize"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.secondPrize}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Prize amount"
                />
              </div>
            </div>

            <div>
              <label htmlFor="thirdPrize" className="block text-sm font-medium text-gray-300">
                3rd Place Prize ($)
              </label>
              <div className="mt-1">
                <input
                  id="thirdPrize"
                  name="thirdPrize"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.thirdPrize}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Prize amount"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting
                  ? 'bg-purple-800 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors`}
            >
              {isSubmitting ? 'Creating...' : 'Create Tournament'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentForm;