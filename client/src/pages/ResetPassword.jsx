import axios from 'axios';
import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const ForgotPassword = () => {
  const {backendUrl} = useContext(AppContext);
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
  const inputRefs = useRef([]);

  // Focus the first input when step changes to OTP
  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers and limit to 1 character
    if (/^\d*$/.test(value)) {
      const newOtp = formData.otp.split('');
      newOtp[index] = value;
      setFormData(prev => ({
        ...prev,
        otp: newOtp.join('')
      }));
      
      // Auto focus to next input if a digit was entered
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
    
    // Handle backspace
    if (!value && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Handle backspace when input is empty
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const pasteArray = pasteData.split('');
      pasteArray.forEach((digit, i) => {
        if (i < 6 && inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
          const newOtp = formData.otp.split('');
          newOtp[i] = digit;
          setFormData(prev => ({
            ...prev,
            otp: newOtp.join('')
          }));
        }
      });
      // Focus the last input if paste was successful
      if (pasteArray.length > 0 && pasteArray.length < 6 && inputRefs.current[pasteArray.length]) {
        inputRefs.current[pasteArray.length].focus();
      }
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email:formData.email })
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setStep(2);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    const otp = otpArray.join('');
    setStep(3);
  }

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendUrl}/api/auth/reset-password`,{email: formData.email, otp: formData.otp, newPassword: formData.newPassword, confirmPassword: formData.confirmPassword});
      if (data.success) {
        toast.success(data.message);
        setStep(4); // Move to success step
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      
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
              <div className="flex justify-between space-x-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={formData.otp[index] || ''}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handlePaste}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-12 h-12 text-center text-xl bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ))}
              </div>
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