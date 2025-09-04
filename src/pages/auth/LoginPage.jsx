import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginlogo from "../../assets/images/Group 1000004714.png";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import FancyButton from "../../components/common/FancyButton";
import { LoginIllustration } from "../../assets/utils/icon";

const LoginPage = () => {
  const {
    login,
    auth,
    validateEmail,
    setClientRegister,
    clientRegister,
    loginData,
    LawyerRegister,
    setLawyerRegister,
    setVerifyOtpData,
    VerifyOtpData,
    loading,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Reset LawyerRegister on mount
  useEffect(() => {
    if (LawyerRegister) {
      setLawyerRegister(false);
    }
  }, [LawyerRegister]);

  // Reset clientRegister
  useEffect(() => {
    if (clientRegister) {
      setClientRegister("");
    }
  }, [clientRegister]);

  // Reset VerifyOtpData
  useEffect(() => {
    if (VerifyOtpData?.status === 200) {
      setVerifyOtpData(null);
    }
  }, [VerifyOtpData]);

  // Redirect if already logged in
  useEffect(() => {
    if (auth?.token) {
      navigate("/");
    }
  }, [auth, navigate]);

  // Save token to localStorage
  useEffect(() => {
    if (loginData?.token) {
      localStorage.setItem("legal_user_token", JSON.stringify(loginData));
    }
  }, [loginData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserObj((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!userObj.email || !validateEmail(userObj.email)) {
      return false;
    }
    if (!userObj.password) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      login({
        email: userObj.email,
        password: userObj.password,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden font-poppins">
      {/* Left Side - Login Form */}
      <div className="flex-1  p-10 bg-white h-screen overflow-y-auto">
        {/* Logo */}
        <div className="mb-10">
          <Link to="/">
            <img src={loginlogo} alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h1
            id="get-start-text"
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Get Started Now
          </h1>
          <p id="access-account-text" className="text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-6">
            {/* Email Field */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example123@gmail.com"
                value={userObj.email}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={userObj.password}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff size={20} /> // 🔓 EyeOff when password is visible
                  ) : (
                    <Eye size={20} /> // 🔒 Eye when password is hidden
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-2">
              <FancyButton
                type="submit"
                loading={loading?.login}
                onClick={(e) => {
                  // Optional: extra safety
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                Login Now
              </FancyButton>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <h4 id="dont-account-text" className="text-sm text-gray-700">
                I don’t have an account:{" "}
                <strong>
                  <Link to="/auth/signup" className="text-blue-600 hover:underline">
                    {" "}
                    Signup Now
                  </Link>
                </strong>
              </h4>
            </div>

            {/* Copyright */}
            <div className="text-center mt-6">
              <p id="copyright-text" className="text-xs text-gray-500">
                @ Copyright Legal Helpline. All rights reserved
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Right Side - Illustration (Visible on large screens) */}
      <div className="hidden lg:flex  bg-legal-blue h-screen justify-center items-center p-10 w-[59%]">
        <div className="text-center text-white max-w-lg">
          <h3 className="text-2xl md:text-3xl font-bold">
            The Simplest Way to Manage Your Workforce!
          </h3>
          <p className="text-blue-100 mt-2">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg h-4/5 max-h-[70vh] w-full overflow-hidden">
          <LoginIllustration />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
