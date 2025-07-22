import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const TournamentRegisterModal = ({ tournament, onClose }) => {
  const { userData, isloggedIn, backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    esewaNumber: '',
    esewaName: '',
    paymentScreenshot: null
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.esewaNumber) newErrors.esewaNumber = 'eSewa number is required';
    if (!formData.esewaName) newErrors.esewaName = 'eSewa account name is required';
    if (!formData.paymentScreenshot) newErrors.paymentScreenshot = 'Payment screenshot is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('esewaNumber', formData.esewaNumber);
      formDataToSend.append('esewaName', formData.esewaName);
      formDataToSend.append('paymentScreenshot', formData.paymentScreenshot);
      formDataToSend.append('tournamentId', tournament.id);

      const response = await axios.post(
        `${backendUrl}/api/tournaments/register`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success('Registration successful! Your payment is being verified.');
        onClose();
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error registering for tournament');
    } finally {
      setLoading(false);
    }
  };

  if (!isloggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-bold text-white mb-4">Login Required</h3>
          <p className="text-gray-300 mb-6">You need to be logged in to register for this tournament.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Register for {tournament.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <h4 className="font-bold text-white mb-2">Payment Information</h4>
          <p className="text-gray-300 mb-1">Entry Fee: {tournament.entryFee}</p>
          <p className="text-gray-300 mb-1">eSewa Number: 9801234567</p>
          <p className="text-gray-300">eSewa Name: GamerTournaments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
              placeholder="98XXXXXXXX"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Your eSewa Number</label>
            <input
              type="tel"
              name="esewaNumber"
              value={formData.esewaNumber}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
              placeholder="98XXXXXXXX"
            />
            {errors.esewaNumber && <p className="text-red-400 text-sm mt-1">{errors.esewaNumber}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Your eSewa Account Name</label>
            <input
              type="text"
              name="esewaName"
              value={formData.esewaName}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
              placeholder="As registered in eSewa"
            />
            {errors.esewaName && <p className="text-red-400 text-sm mt-1">{errors.esewaName}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Payment Screenshot</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
              {previewImage ? (
                <div className="mb-2">
                  <img 
                    src={previewImage} 
                    alt="Payment screenshot preview" 
                    className="max-h-40 mx-auto mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData({...formData, paymentScreenshot: null});
                    }}
                    className="text-red-400 text-sm"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    name="paymentScreenshot"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    id="paymentScreenshot"
                  />
                  <label 
                    htmlFor="paymentScreenshot" 
                    className="cursor-pointer block"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-400">Click to upload payment screenshot</p>
                      <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </label>
                </>
              )}
            </div>
            {errors.paymentScreenshot && <p className="text-red-400 text-sm mt-1">{errors.paymentScreenshot}</p>}
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentRegisterModal;