import React, { useState } from "react";
import loginlogo from "../../assets/images/Group 1000004714.png";
import userIcon from "../../assets/images/boy(2) 1.png";
import lawyerIcon from "../../assets/images/lawyer 1.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginIllustration } from "../../assets/utils/icon";
import FancyButton from "../../components/common/FancyButton";

const SignupMainPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (selectedOption === "user") {
      navigate("/auth/signup-user");
    } else if (selectedOption === "lawyer") {
      navigate("/auth/signup-lawyer");
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="formLogo mb-8 text-center">
            <Link to="/">
              <img src={loginlogo} alt="Logo" className="inline-block" />
            </Link>
          </div>

          {/* Text */}
          <div className="login-text text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Account
            </h1>
            <p className="text-gray-500 mt-2">Select one of these.</p>
          </div>

          {/* Account Options */}
          <div className="selectforaccount flex gap-6 mb-10">
            {/* User Option */}
            <div
              className={`flex-1 h-38 p-5 bg-white border-2 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200
                ${
                  selectedOption === "user"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-500"
                }`}
              onClick={() => setSelectedOption("user")}
            >
              <img
                src={userIcon}
                alt="User Icon"
                className="w-16 h-16 object-contain"
              />
              <p className="text-lg text-gray-700 font-normal">
                Sign Up as a User
              </p>
            </div>

            {/* Lawyer Option */}
            <div
              className={`flex-1 h-38 p-5 bg-white border-2 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200
                ${
                  selectedOption === "lawyer"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-500"
                }`}
              onClick={() => setSelectedOption("lawyer")}
            >
              <img
                src={lawyerIcon}
                alt="Lawyer Icon"
                className="w-16 h-16 object-contain"
              />
              <p className="text-lg text-gray-700 font-normal">
                Sign Up as a Lawyer
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="formInputs space-y-6">
            <div
              className="loginBtn w-full"
              onClick={handleNavigate}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleNavigate();
              }}
            >
              <FancyButton disabled={!selectedOption}>Next</FancyButton>
            </div>

            {/* Login Link */}
            <div className="singnow text-center">
              <h4 className="text-sm text-gray-600">
                I have an account:{" "}
                <strong>
                  <Link
                    to="/auth/login"
                    className="text-blue-600 hover:underline"
                  >
                    Login Now
                  </Link>
                </strong>
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Right Illustration Section */}
      <div className="hidden lg:flex flex-1 bg-legal-blue p-12 items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="rightBoxtext mb-8">
            <h3 className="text-2xl font-semibold text-white">
              The Simplest Way to Manage Your Workforce!
            </h3>
            <p className="text-white mt-2">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="chart-container mt-6 flex justify-center">
            <LoginIllustration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupMainPage;
