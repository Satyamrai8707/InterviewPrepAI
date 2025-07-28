import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {AnimatePresence,motion} from 'framer-motion';
import { LuCircleAlert,LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import {toast} from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import RoleInfoHeader from '../../components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import QuestionCard from '../../components/Cards/QuestionCard';

const InterviewPrep = () => {
    const { sessionId } = useParams();
    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);

    // Fetch session details by ID
    const fetchSessionDetailsById = async () => {
        try {
          const res = await axiosInstance.get(API_PATHS.sessions.getOne(sessionId));
          console.log("API Response:", res.data);
      
          if (res.data && res.data._id) {
            setSessionData(res.data);
          } else {
            setErrorMsg("No session found.");
          }
        } catch (error) {
          console.error("Error fetching session:", error);
          toast.error("Failed to fetch session");
          setErrorMsg("Something went wrong.");
        } finally {
          setIsLoading(false);
        }
      };

    // Generate questions explanation using AI
    const generateQuestionsExplanation = async (question) => {
    }

    // Pin or unpin a question
    const pinOrUnpinQuestion = async (questionId) => {
      try{
        const response = await axiosInstance.post(API_PATHS.questions.pin(questionId)) 
        console.log(response);
        if(response.data && response.data.question){
          fetchSessionDetailsById()
        }
      }
      catch(error){
        console.error("Error" ,error);
      }
    }

    // Add more question to session
    const addMoreQuestion = async () => {
    }

    useEffect(() => {
        if (sessionId) {
            fetchSessionDetailsById();
        }
        return ()=>{}
    }, []);

    return (
      <DashboardLayout>
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

        <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
          <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>
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
                    <>
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateQuestionsExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => pinOrUnpinQuestion(data._id)}
                    />
                    </>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DashboardLayout>
    ) 
}

export default InterviewPrep;
