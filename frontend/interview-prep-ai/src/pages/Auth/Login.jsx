import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { IoClose } from "react-icons/io5";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      // Step 1: Login
      const response = await axiosInstance.post(API_PATHS.auth.login, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        // Step 2: Store token
        localStorage.setItem("token", token);

        // Step 3: Fetch full user profile
        const profileRes = await axiosInstance.get(API_PATHS.auth.getProfile);

        // Step 4: Update context with user + token
        updateUser({ ...profileRes.data, token });

        // Step 5: Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-white rounded-xl shadow-md text-black">
        {/* X button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={() => setCurrentPage(null)}
          aria-label="Close"
        >
          <IoClose className="w-6 h-6" />
        </button>
        <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login to your account.
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="satyam@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF9324] to-[#e99a4b] px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:scale-[1.02] hover:bg-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 cursor-pointer"
          >
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("signup")}
            >
              Signup
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
