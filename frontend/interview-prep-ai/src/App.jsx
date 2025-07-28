import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep.jsx";
import UserProvider from "./context/userContext.jsx"; // ✅ Only import UserProvider

const App = () => {
  return (
    <UserProvider> {/* ✅ Correctly wrapping the entire app */}
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Interview Prep Route */}
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
