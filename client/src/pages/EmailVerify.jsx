import axios from 'axios';
import { useState, useRef, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);
  const {backendUrl,isloggedIn,userData,getUserData }= useContext(AppContext)

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (isNaN(pasteData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    // Focus the last input with value
    const lastFilledIndex = pasteData.length - 1;
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1].focus();
    } else {
      inputRefs.current[5].focus();
    }
  };

  // Handle form submission
 const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e=>e.value)
    const otp = otpArray.join('');
    const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp }, {
      withCredentials: true
    });
    if (data.success) {
      toast.success(data.message);
      getUserData();
      navigate('/') // Fetch user data after successful verification
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    
  }
 }

  // Handle resend OTP
  const handleResend = () => {
    console.log('Resending OTP...');
    setIsResendDisabled(true);
    setResendTimer(30);
    // Add your resend logic here
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  useEffect(() => {
     isloggedIn && userData && userData.isAccountVerified && navigate('/');
  }, [isloggedIn, userData, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          We've sent a 6-digit code to your email
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                Enter OTP
              </label>
              <div className="mt-2 flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 bg-gray-700 border border-gray-600 rounded-md text-center text-white text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            <div>
              <button 
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                Verify
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={isResendDisabled}
                className={`font-medium ${isResendDisabled ? 'text-gray-500 cursor-not-allowed' : 'text-purple-400 hover:text-purple-300'}`}
              >
                {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;