import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(
    "Hey, I'm your AI interviewer. Can you please tell me about your specific topic or domain are you well-versed in?"
  );
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [candidateName, setCandidateName] = useState("Sanjay");
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [interviewData, setInterviewData] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerateNextQuestion = useCallback(
    async (transcript) => {
      if (questionCount >= 9) {
        setIsInterviewComplete(true);
        setCurrentQuestion("The interview is complete. Thank you!");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/generate_question",
          {
            topic: transcript,
            candidate_name: candidateName,
          }
        );

        const nextQuestion = response.data.question;

        setInterviewData((prevData) => [
          ...prevData,
          { question: currentQuestion, answer: transcript },
        ]);

        setCurrentQuestion(nextQuestion);
        setCurrentAnswer("");
        setQuestionCount((prevCount) => prevCount + 1);

        setTimeout(() => {
          startRecording();
          setShowControls(true);
        }, 5000);
      } catch (error) {
        console.error("Error fetching next question:", error);
      }
    },
    [questionCount, candidateName, currentQuestion]
  );

  const startRecording = useCallback(() => {
    const handleAudioSubmission = async (audioBlob, question) => {
      if (!audioBlob) return;

      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "user_audio.wav");

        const { data: transcribeResponse } = await axios.post(
          "http://localhost:5000/transcribe_audio",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const transcriptText = transcribeResponse.transcript;
        setCurrentAnswer(transcriptText);

        if (questionCount === 0) {
          await axios.post("http://localhost:8000/store_interview", {
            candidate_name: candidateName,
            question: question,
            answer: transcriptText,
          });
        }

        handleGenerateNextQuestion(transcriptText);
      } catch (error) {
        console.error("Error handling audio submission:", error);
      }
    };

    audioChunks.current = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          await handleAudioSubmission(audioBlob, currentQuestion);
        };

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing the microphone: ", error);
      });
  }, [
    currentQuestion,
    questionCount,
    handleGenerateNextQuestion,
    candidateName,
  ]);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setShowControls(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [interviewData, currentAnswer]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(true);
      startRecording();
    }, 5000);

    return () => clearTimeout(timer);
  }, [startRecording]);

  return (
    <div className="flex h-screen">
      <div className="w-[70%] ml-10 mr-5 my-8 bg-black rounded-3xl"></div>

      <div className="w-[30%] flex flex-col justify-between my-8 mr-10">
        {/* Scrollable container */}
        <div className="h-[70%] p-4 bg-[#0F0F36] rounded-3xl flex flex-col justify-start overflow-y-hidden">
          {/* Render interview history */}
          {interviewData.map((item, index) => (
            <div key={index} className="mb-4">
              {/* AI's question */}
              <div className="flex justify-end">
                <motion.div
                  key={`question-${index}`}
                  className="p-2 mb-4 w-72 rounded-3xl rounded-br-none bg-gradient-to-br from-[#002DBF] via-[#4396F7] to-[#FF9DB2] flex justify-end"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-white text-sm">{item.question}</p>
                </motion.div>
              </div>

              {/* Candidate's response */}
              <div className="justify-start">
                <p className="text-sm text-white mb-2">{candidateName}</p>
                <motion.div
                  key={`answer-${index}`}
                  className="p-4 border border-[#F59BD5] bg-transparent rounded-3xl rounded-bl-none w-72 text-sm flex justify-start"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-white">{item.answer}</p>
                </motion.div>
              </div>
            </div>
          ))}

          {/* New question (only this part should animate) */}
          <div className="flex justify-end mt-2">
            <motion.div
              key={`current-question-${questionCount}`}
              className="p-2 mb-4 w-72 rounded-3xl rounded-br-none bg-gradient-to-br from-[#002DBF] via-[#4396F7] to-[#FF9DB2] flex justify-end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white text-sm">{currentQuestion}</p>
            </motion.div>
          </div>

          {currentAnswer && (
            <>
              <p className="text-sm text-white mb-2">{candidateName}</p>
              <div className="flex justify-start">
                <motion.div
                  key={`current-answer-${questionCount}`}
                  className="p-4 border border-[#F59BD5] bg-transparent rounded-3xl rounded-bl-none w-72 text-sm flex justify-start"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white">{currentAnswer}</p>
                </motion.div>
              </div>
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center mt-5 h-[30%]">
          <div className="w-full h-full flex">
            <div className="border border-gray-300 w-1/2 rounded-3xl mr-10"></div>
            <div>
              {showControls && (
                <>
                  <p className="border border-black px-5 py-2 rounded-3xl flex items-center mb-5">
                    <span className="w-3 h-3 bg-red-500 rounded inline-block mr-2"></span>
                    {isRecording && "Recording..."}
                  </p>
                  <button
                    onClick={stopRecording}
                    className="border border-[#0072DC] px-14 py-2 bg-[#0072DC] text-white font-semibold rounded-3xl"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;