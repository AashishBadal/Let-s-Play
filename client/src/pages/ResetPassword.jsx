import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to install react-router-dom if not already

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (formData.otp.length !== 6) {
        throw new Error('OTP must be 6 digits');
      }
      setStep(3);
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (formData.newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(4); // Move to success step
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmitEmail} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoFocus
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 disabled:opacity-50"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          </form>
        );
      
      case 2:
        return (
          <form onSubmit={handleSubmitOTP} className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-4">
                We've sent a 6-digit OTP to <span className="font-medium text-gray-300">{formData.email}</span>
              </p>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                maxLength="6"
                pattern="\d{6}"
                inputMode="numeric"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoFocus
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Change Email
              </button>
              
              <button
                type="button"
                onClick={handleSubmitEmail}
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Resend OTP
              </button>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        );
      
      case 3:
        return (
          <form onSubmit={handleSubmitNewPassword} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoFocus
              />
              <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 disabled:opacity-50"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        );
      
      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900/30">
              <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-white">Password reset successfully!</h3>
            <p className="text-sm text-gray-400">
              You can now login with your new password.
            </p>
            
            <button
              onClick={() => navigate('/login')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
            >
              Return to Login
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            {step !== 4 ? 'Reset Your Password' : 'Success!'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {step === 1 && 'Enter your email to receive a verification code'}
            {step === 2 && 'Enter the 6-digit code sent to your email'}
            {step === 3 && 'Create a new password for your account'}
            {step === 4 && 'Your password has been updated successfully'}
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-gray-800 py-8 px-4 shadow-lg rounded-lg sm:px-10">
          {renderStep()}
        </div>

        {step !== 4 && (
          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;