import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "../../components/AIResponsePreview";
import Drawer from "../../components/Loader/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session by ID
  const fetchSessionDetailsById = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.sessions.getOne(sessionId));
      if (res.data && res.data._id) {
        setSessionData(res.data);
      } else {
        setErrorMsg("No session found.");
      }
    } catch (error) {
      toast.error("Failed to fetch session");
      setErrorMsg("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate explanation using AI
  const generateQuestionsExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.ai.generateExplanations,
        { question }
      );

      if (
        response.data &&
        response.data.length > 0 &&
        response.data[0].explanation
      ) {
        setExplanation(response.data[0]);
      } else {
        setErrorMsg("No explanation found.");
      }
    } catch (error) {
      setExplanation(null);
      if (error.response) {
        setErrorMsg(error.response.data?.message || "Server error.");
      } else if (error.request) {
        setErrorMsg("No response from server.");
      } else {
        setErrorMsg("Failed to generate explanation.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Pin/unpin question
  const pinOrUnpinQuestion = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.questions.pin(questionId)
      );
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add more questions logic here if needed
  const addMoreQuestion = async () => {
    try {setIsUpdateLoader(true)

      const aiResponse = await axiosInstance.post(API_PATHS.ai.generateQuestions,
        {
          role: sessionData?.role,
          experience : sessionData?.experience,
          topicToFocusOn : sessionData?.topicToFocusOn,
          numberOfQuestions: 10
        }
      )
      const generatedQuestions = aiResponse.data
      const response = await axiosInstance.post(API_PATHS.questions.add_to_session,{
        sessionId,
        questions: generatedQuestions
      })
      if(response.data){
        toast.success("Added More Q&A !")
        fetchSessionDetailsById()
      }
      
    } catch (error) {
      if(error.response && error.response.data.message){
        setErrorMsg("Something ent wrong . Please try again !")
      }
      
    }
    finally{
      setIsUpdateLoader(false)
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  return (
    <DashboardLayout>
      {/* Header */}
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicToFocusOn={sessionData?.topicToFocusOn || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-0 py-4">
        <h2 className="text-lg font-semibold">Interview Q & A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 15,
                  }}
                  layout
                  layoutId={`question-${data._id || index}`}
                  className="mb-4"
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() =>
                      generateQuestionsExplanation(data.question)
                    }
                    isPinned={data?.isPinned}
                    onTogglePin={() => pinOrUnpinQuestion(data._id)}
                  />
                  {/* Load More Button */}
                  {!isLoading &&
                    sessionData?.questions?.length === index + 1 && (
                      <div className="flex justify-center mt-5">
                        <button
                          className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-gray-300 bg-white hover:bg-black hover:text-white transition rounded-md"
                          onClick={addMoreQuestion}
                          disabled={isLoading || isUpdateLoader}
                        >
                          {isUpdateLoader ? (
                            <SpinnerLoader />
                          ) : (
                            <>
                              <LuListCollapse className="text-lg" />
                              Load More
                            </>
                          )}
                        </button>
                      </div>
                    )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Learn More Drawer */}
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-amber-600 font-medium">
              <LuCircleAlert className="mt-1" /> {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
