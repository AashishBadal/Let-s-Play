import { useState } from 'react';
import { FaUpload, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrganizerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    documentImage: null,
    holdingDocumentImage: null
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'documentImage' || name === 'holdingDocumentImage') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }
    if (!formData.documentImage) {
      newErrors.documentImage = 'Document image is required';
    }
    if (!formData.holdingDocumentImage) {
      newErrors.holdingDocumentImage = 'Photo holding document is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('documentImage', formData.documentImage);
      formDataToSend.append('holdingDocumentImage', formData.holdingDocumentImage);

      const response = await fetch('http://localhost:5000/api/organizers/register', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include' // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful!');
      navigate('/dashboard'); // Redirect to dashboard after successful registration
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-400">Organizer Registration</h1>
          <p className="mt-2 text-gray-400">Register to create and manage tournaments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>
          </div>

          {/* Contact Number Field */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300">
              Contact Number
            </label>
            <div className="mt-1">
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.contactNumber ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.contactNumber && <p className="mt-1 text-sm text-red-400">{errors.contactNumber}</p>}
            </div>
          </div>

          {/* Document Photo Upload */}
          <div>
            <label htmlFor="documentImage" className="block text-sm font-medium text-gray-300">
              Identity Document (Government ID, Passport, etc.)
            </label>
            <div className="mt-1">
              <label
                htmlFor="documentImage"
                className={`flex flex-col items-center justify-center w-full py-6 border-2 border-dashed ${errors.documentImage ? 'border-red-500' : 'border-gray-600'} rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors`}
              >
                <div className="flex flex-col items-center justify-center">
                  <FaUpload className="w-8 h-8 mb-2 text-purple-400" />
                  <p className="text-sm text-gray-300">
                    {formData.documentImage ? (
                      <span className="text-purple-300">{formData.documentImage.name}</span>
                    ) : (
                      <>
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                </div>
                <input
                  id="documentImage"
                  name="documentImage"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {errors.documentImage && <p className="mt-1 text-sm text-red-400">{errors.documentImage}</p>}
            </div>
          </div>

          {/* Photo Holding Document Upload */}
          <div>
            <label htmlFor="holdingDocumentImage" className="block text-sm font-medium text-gray-300">
              Photo of You Holding the Document
            </label>
            <div className="mt-1">
              <label
                htmlFor="holdingDocumentImage"
                className={`flex flex-col items-center justify-center w-full py-6 border-2 border-dashed ${errors.holdingDocumentImage ? 'border-red-500' : 'border-gray-600'} rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors`}
              >
                <div className="flex flex-col items-center justify-center">
                  <FaUpload className="w-8 h-8 mb-2 text-purple-400" />
                  <p className="text-sm text-gray-300">
                    {formData.holdingDocumentImage ? (
                      <span className="text-purple-300">{formData.holdingDocumentImage.name}</span>
                    ) : (
                      <>
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input
                  id="holdingDocumentImage"
                  name="holdingDocumentImage"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {errors.holdingDocumentImage && <p className="mt-1 text-sm text-red-400">{errors.holdingDocumentImage}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Register as Organizer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizerRegistrationForm;