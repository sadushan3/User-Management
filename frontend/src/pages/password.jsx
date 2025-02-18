import React, { useState } from "react";
import './Nav.css';
import backgroundVideo from '../assets/mp.mp4';

function Password() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    // Validate password
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    // Check if passwords match
    if (password !== repassword) {
      setGeneralError("Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch("http://localhost:2020/router/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password reset successfully! You can now log in with your new password.");
        setEmail("");
        setPassword("");
        setRepassword("");
      } else {
        throw new Error(data.error || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setGeneralError("An error occurred. Please try again.");
    }
  };

  return (

    <div>
      <video
      className="absolute top-0 left-0 -z-10"
      src={backgroundVideo}
      loop
      autoPlay
      muted
      
      
      />
    <div className=" flex justify-center justify-items-center p-10 m-10">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-10 shadow-lg w-[400px] md:w-[450px] m-10 ">

        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email and new password below.
        </p>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 border border-green-200 text-sm">
            {successMessage}
          </div>
        )}

        {generalError && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4 border border-red-200 text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
            />
            {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
            />
            {passwordError && <p className="text-red-500 text-xs mt-2">{passwordError}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="reenterPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              id="reenterPassword"
              name="reenterPassword"
              placeholder="Re-enter your password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold text-sm py-3 rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:outline-none transition"
          >
            Reset Password
          </button>
        </form>
      </div>
      </div>
      </div>
    
  );
}

export default Password;
