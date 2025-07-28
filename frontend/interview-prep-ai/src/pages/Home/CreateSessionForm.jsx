import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    topicToFocusOn: "",
    experience: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, topicToFocusOn, experience, description } = formData;

    if (!role || !topicToFocusOn || !experience || !description) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      console.log("Request payload for AI:", {
        role,
        experience,
        topicToFocusOn,
        numberOfQuestions: 10,
        description,
      });

      const aiRes = await axiosInstance.post(API_PATHS.ai.generateQuestions, {
        role,
        experience,
        topicToFocusOn,
        numberOfQuestions: 10,
        description,
      });

      console.log("AI response:", aiRes.data);

      const generatedQuestions = aiRes.data;

      if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error("AI did not return any questions");
      }

      console.log("Final session payload:", {
        ...formData,
        questions: generatedQuestions,
      });

      const sessionRes = await axiosInstance.post(API_PATHS.sessions.create, {
        ...formData,
        questions: generatedQuestions,
      });

      console.log("Session creation response:", sessionRes.data);

      if (sessionRes.data?.response?._id) {
        toast.success("Session created successfully!");
        navigate(`/interview-prep/${sessionRes.data.response._id}`);
      } else {
        throw new Error("Session created but response format is unexpected");
      }
    } catch (err) {
      console.error("Error creating session:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Failed to create session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] max-w-[500px] p-6 bg-white rounded-lg shadow-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-2">New Interview Session</h3>
      <p className="text-sm text-gray-600 mb-4">Provide details to generate your interview prep.</p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-4">
        <Input
          label="Role"
          placeholder="e.g. Frontend Developer"
          type="text"
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
        />

        <Input
          label="Years of Experience"
          placeholder="e.g. 2"
          type="number"
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
        />

        <Input
          label="Topics to Focus On"
          placeholder="e.g. React, Node"
          type="text"
          value={formData.topicToFocusOn}
          onChange={({ target }) => handleChange("topicToFocusOn", target.value)}
        />

        <Input
          label="Description"
          placeholder="Brief description for prompt"
          type="text"
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="relative flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader size="sm" />}
          <span>{isLoading ? "Creating..." : "Create Session"}</span>
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
