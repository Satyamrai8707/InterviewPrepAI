import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { IoClose } from "react-icons/io5";
import ProfilePhotoSelector from "../../components/Input/profilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // TODO: Implement signup logic here

    let profileImgUrl = "";
    if (!fullname) {
      setError("Please enter your full name.");
      return;
    }
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("");

    // Call your signup API here
    try {
      //upload profile image if exists
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic); 
        profileImgUrl = imgUploadRes.imageUrl || "";
        const uploadResponse = await axiosInstance.post(API_PATHS.auth.register,{
          name : fullname,
          email,
          password,
          profileImageUrl: profileImgUrl,
        }
        );
        const {token} = uploadResponse.data;
        // Store the token in localStorage or cookies
        if (token) {
          localStorage.setItem("token", token);
          // Update user context
          updateUser(uploadResponse.data);
          navigate("/dashboard");
        }

      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-white rounded-xl shadow-md text-black">
        {/* X Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={() => setCurrentPage(null)}
          aria-label="Close"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="satyam@gmail.com"
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
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
