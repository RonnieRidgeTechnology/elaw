import React, { useEffect, useState } from "react";
import loginlogo from "../../assets/images/Group 1000004714.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Globe,
  MapPin,
  Home,
  Hash,
} from "lucide-react";
import { LoginIllustration } from "../../assets/utils/icon";
import { useAuth } from "../../contexts/AuthContext";

const SignupPageAsaUser = () => {
  const navigate = useNavigate();
  const {
    RegisterClient,
    auth,
    validateEmail,
    AllCountries,
    getAllCountries,
    AllStatesById,
    getAllStatesById,
    getAllDistricsByStateId,
    AllDistrictsByStateId,
    clientRegister,
  } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [userObj, setUserObj] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    address: "",
    country_id: "",
    state_id: "",
    city_id: "",
    zip_code: "",
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
  });

  const [errors, setErrors] = useState({});

  // Fetch countries on mount
  useEffect(() => {
    getAllCountries();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (auth?.token) {
      navigate("/");
    }
  }, [auth, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserObj((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Real-time password criteria check
    if (name === "password") {
      const criteria = {
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSymbol: /[^A-Za-z0-9]/.test(value),
      };
      setPasswordCriteria(criteria);
    }
  };

  // Validate single field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "first_name":
        if (!value.trim()) error = "First name is required.";
        break;
      case "last_name":
        if (!value.trim()) error = "Last name is required.";
        break;
      case "phone":
        if (!value) error = "Phone number is required.";
        else if (!/^\d{10,15}$/.test(value))
          error = "Enter a valid phone number.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!validateEmail(value)) error = "Enter a valid email.";
        break;
      case "password":
        if (value.length < 8) error = "Password must be at least 8 characters.";
        break;
      case "password_confirmation":
        if (value !== userObj.password) error = "Passwords do not match.";
        break;
      case "gender":
        if (!value) error = "Please select a gender.";
        break;
      case "address":
        if (!value.trim()) error = "Address is required.";
        break;
      case "country_id":
        if (!value) error = "Please select a country.";
        break;
      case "state_id":
        if (!value) error = "Please select a state.";
        break;
      case "city_id":
        if (!value) error = "Please select a city.";
        break;
      case "zip_code":
        if (!value) error = "Zip code is required.";
        break;
      default:
        break;
    }

    return error;
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    Object.keys(userObj).forEach((key) => {
      const error = validateField(key, userObj[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateForm()) {
      RegisterClient(userObj);
      // Optionally reset form
      // setUserObj({ ...initialState });
    }
  };

  // Auto redirect after successful registration
  useEffect(() => {
    if (clientRegister) {
      navigate("/login");
    }
  }, [clientRegister, navigate]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 h-screen">
      {/* Left Form Section */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-white max-w-full lg:max-w-md mx-auto lg:mx-0">
        <div className="formLogo mb-8 text-center">
          <Link to="/">
            <img src={loginlogo} alt="Logo" className="inline-block h-12" />
          </Link>
        </div>

        <div className="login-text mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Account
          </h1>
          <p className="text-gray-500 mt-2">
            Enter your credentials to create an account
          </p>
        </div>

        <div className="formInputs space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <User size={16} className="mr-1 text-gray-500" /> First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userObj.first_name}
                onChange={handleInputChange}
                placeholder="John"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.first_name && (
                <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <User size={16} className="mr-1 text-gray-500" /> Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userObj.last_name}
                onChange={handleInputChange}
                placeholder="Doe"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.last_name && (
                <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <Phone size={16} className="mr-1 text-gray-500" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userObj.phone}
              onChange={handleInputChange}
              placeholder="1234567890"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <Mail size={16} className="mr-1 text-gray-500" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={userObj.email}
              onChange={handleInputChange}
              placeholder="example@domain.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <Lock size={16} className="mr-1 text-gray-500" /> Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={userObj.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}

            {/* Password Strength */}
            <ul className="mt-2 space-y-1 text-xs">
              <li
                className={
                  passwordCriteria.hasUppercase
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                Uppercase (A-Z)
              </li>
              <li
                className={
                  passwordCriteria.hasLowercase
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                Lowercase (a-z)
              </li>
              <li
                className={
                  passwordCriteria.hasNumber ? "text-green-600" : "text-red-500"
                }
              >
                Number (0-9)
              </li>
              <li
                className={
                  passwordCriteria.hasSymbol ? "text-green-600" : "text-red-500"
                }
              >
                Symbol (!@#$)
              </li>
            </ul>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password_confirmation"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <Lock size={16} className="mr-1 text-gray-500" /> Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="password_confirmation"
                value={userObj.password_confirmation}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password_confirmation
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {confirmPasswordVisible ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={userObj.gender}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country_id"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <Globe size={16} className="mr-1 text-gray-500" /> Country
            </label>
            <select
              name="country_id"
              value={userObj.country_id}
              onChange={(e) => {
                handleInputChange(e);
                getAllStatesById(e.target.value);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.country_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" hidden>
                Select a Country
              </option>
              {AllCountries?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.country_id && (
              <p className="mt-1 text-xs text-red-500">{errors.country_id}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state_id"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <MapPin size={16} className="mr-1 text-gray-500" /> State
            </label>
            <select
              name="state_id"
              value={userObj.state_id}
              onChange={(e) => {
                handleInputChange(e);
                getAllDistricsByStateId(e.target.value);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.state_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" hidden>
                Select a State
              </option>
              {AllStatesById?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.state_id && (
              <p className="mt-1 text-xs text-red-500">{errors.state_id}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city_id"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <MapPin size={16} className="mr-1 text-gray-500" /> City
            </label>
            <select
              name="city_id"
              value={userObj.city_id}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.city_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" hidden>
                Select a City
              </option>
              {AllDistrictsByStateId?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.city_id && (
              <p className="mt-1 text-xs text-red-500">{errors.city_id}</p>
            )}
          </div>

          {/* Zip Code */}
          <div>
            <label
              htmlFor="zip_code"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <Hash size={16} className="mr-1 text-gray-500" /> Zip Code
            </label>
            <input
              type="text"
              name="zip_code"
              value={userObj.zip_code}
              onChange={handleInputChange}
              placeholder="12345"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.zip_code ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.zip_code && (
              <p className="mt-1 text-xs text-red-500">{errors.zip_code}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <Home size={16} className="mr-1 text-gray-500" /> Address
            </label>
            <input
              type="text"
              name="address"
              value={userObj.address}
              onChange={handleInputChange}
              placeholder="123 Street, Area"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none"
            >
              Create Account
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login Now
              </Link>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-400">
              @ Copyright Legal Helpline. All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Right Illustration (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 bg-legal-blue p-12 items-center justify-center">
               <div className="text-center max-w-lg">
                 <div className="rightBoxtext mb-8">
                   <h3 className="text-2xl font-semibold text-white">
                     The Simplest Way to Manage Your Workforce!
                   </h3>
                   <p className="text-white mt-2">Enter your credentials to access your account</p>
                 </div>
                 <div className="chart-container mt-6 flex justify-center">
                   <LoginIllustration />
                 </div>
               </div>
             </div>
    </div>
  );
};

export default SignupPageAsaUser;
