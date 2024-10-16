import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import describeImage from '../assets/non_technical.jpeg'

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(
    "Observe the illustration been displayed on the screen and point out 3 key design philosophy."
  );
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [candidateName, setCandidateName] = useState("Sanjay");
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [interviewData, setInterviewData] = useState([]);
  const [timer, setTimer] = useState(90); // Timer state in seconds (90 seconds)
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null); // Reference to keep track of the timer interval
  const scrollContainerRef = useRef(null); // Reference to the scrollable container

  const startRecording = useCallback(() => {
    const handleAudioSubmission = async (audioBlob) => {
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

        handleGenerateNextQuestion(transcriptText); // Reference to handleGenerateNextQuestion here
      } catch (error) {
        console.error("Error handling audio submission:", error);
      }
    };

    // Reset timer when recording starts
    setTimer(90);
    clearInterval(timerRef.current); // Clear any existing timer
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
          await handleAudioSubmission(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);

        // Start the countdown timer
        timerRef.current = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              clearInterval(timerRef.current);
              stopRecording(); // Automatically stop recording when time runs out
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
      })
      .catch((error) => {
        console.error("Error accessing the microphone: ", error);
      });
  }, []);

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

        // Wait 5 seconds before starting the next recording
        setTimeout(() => {
          startRecording(); // Now startRecording is accessible
        }, 5000);
      } catch (error) {
        console.error("Error fetching next question:", error);
      }
    },
    [questionCount, candidateName, currentQuestion, startRecording]
  );

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    clearInterval(timerRef.current); // Stop the timer when recording stops
  }, [isRecording]);

  const handleNextClick = () => {
    stopRecording();
  };

  useEffect(() => {
    // Start the initial recording after 5 seconds
    const initialTimer = setTimeout(() => {
      startRecording();
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timerRef.current); // Clear any intervals when component unmounts
    };
  }, [startRecording]);

  useEffect(() => {
    if (currentAnswer && questionCount > 0) {
      // Call the API to store data in MongoDB
      axios.post("http://localhost:8000/store_interview", {
        candidate_name: candidateName,
        question: currentQuestion,
        answer: currentAnswer,
      });
    }
  }, [currentAnswer, currentQuestion, candidateName, questionCount]);

  // Auto-scroll to the bottom when new content is added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [interviewData, currentQuestion, currentAnswer]);

  const formatTimer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex h-screen">
      <img className="w-[70%] ml-10 mr-5 my-8 rounded-3xl" src={describeImage} />

      <div className="w-[30%] flex flex-col justify-between my-8 mr-10">
        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="h-[70%] p-4 bg-[#0F0F36] rounded-3xl flex flex-col justify-start overflow-y-hidden"
        >
          {/* Render interview history */}
          {interviewData.map((item, index) => (
            <div key={index} className="mb-4">
              {/* AI's question */}
              <div className="flex justify-end">
                <motion.div
                  key={`question-${index}`}
                  className="p-2 mb-4 w-72 rounded-3xl rounded-br-none bg-gradient-to-br from-[#002DBF] via-[#4396F7] to-[#FF9DB2] flex justify-end"
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
                >
                  <p className="text-white">{item.answer}</p>
                </motion.div>
              </div>
            </div>
          ))}

          {/* New question */}
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
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center mt-5 h-[30%]">
          <div className="w-full h-full flex">
            <div className="border border-gray-300 w-1/2 rounded-3xl mr-10"></div>
            <div>
              <p className="px-5 py-2 rounded-3xl flex items-center mb-5 text-[#0072DC]">
                <span className="w-3 h-3 bg-red-600 rounded inline-block mr-2"></span>
                {/* {isRecording ?  : "Paused"} */}Recording
              </p>
              <button
                onClick={handleNextClick}
                className="border border-[#0072DC] px-14 py-2 bg-[#0072DC] text-white font-semibold rounded-3xl"
              >
                Next
              </button>
              <p className="text-3xl text-gray-400 mt-8 ml-10">{formatTimer(timer)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;