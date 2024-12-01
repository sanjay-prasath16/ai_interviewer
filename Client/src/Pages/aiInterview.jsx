import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Ring from '../assets/ring.png';

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    "Hey, i am your AI interviewer. How are you"
    // सपोर्ट वेक्टर मशीन (SVM) का मुख्य लक्ष्य क्या होता है, और यह निर्णय सीमा कैसे बनाती है
  );
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [candidateName, setCandidateName] = useState("Sanjay");
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [interviewData, setInterviewData] = useState([]);
  const [timer, setTimer] = useState(90);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [showExpandingBorder, setShowExpandingBorder] = useState(false);
  const [pulseClass, setPulseClass] = useState(undefined);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing webcam: ", error);
        });
    };

    const checkPermissions = async () => {
      try {
        const audioPermission = await navigator.permissions.query({ name: "microphone" });
        const videoPermission = await navigator.permissions.query({ name: "camera" });

        if (audioPermission.state === "granted" && videoPermission.state === "granted") {
          setPermissionsGranted(true);
          startVideo();
        } else {
          setPermissionsGranted(false);
          alert("Please enable camera and microphone permissions in your browser settings and reload the page.");
        }

        audioPermission.onchange = () => {
          if (audioPermission.state === "granted" && videoPermission.state === "granted") {
            setPermissionsGranted(true);
            startVideo();
          }
        };

        videoPermission.onchange = () => {
          if (audioPermission.state === "granted" && videoPermission.state === "granted") {
            setPermissionsGranted(true);
            startVideo();
          }
        };
      } catch (error) {
        console.error("Error checking permissions:", error);
        alert("Error checking permissions. Please ensure they are enabled.");
      }
    };

    checkPermissions()
  }, []);

  useEffect(() => {
    speakText(currentQuestion);
  }, []);

  const speakText = async (text) => {
    try {
      const response = await axios.post("http://localhost:5000/speak", { text }, { responseType: 'blob' });
      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.onended = () => startRecording();
      await audio.play();
    } catch {
      startRecording();
    }
  };

  const handleAudioSubmission = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "user_audio.wav");
      const { data } = await axios.post("http://localhost:5000/transcribe_audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleGenerateNextQuestion(data.transcript);
    } catch (error) {
      console.error("Error handling audio submission:", error);
    }
  };

  const startRecording = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunks.current = [];
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);
        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const avgVolume = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setVolume(avgVolume);
          if (isRecording) requestAnimationFrame(updateVolume);
        };
        updateVolume();
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
          handleAudioSubmission(audioBlob);
          audioContext.close();
        };
        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch((error) => console.error("Error accessing the microphone:", error));
  }, [isRecording]);

  const getPulseClass = (volume) => {
    if (volume > 65) return "high";
    if (volume > 60) return "medium";
    if(volume > 55) return "low";
    return undefined;
  };

  const handleGenerateNextQuestion = async (transcript) => {
    if (questionCount >= 9) {
      setCurrentQuestion("The interview is complete. Thank you!");
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:5000/generate_question", {
        topic: transcript,
        candidate_name: candidateName,
      });
      setInterviewData((prevData) => [...prevData, { question: currentQuestion, answer: transcript }]);
      setCurrentQuestion(data.question);
      setCurrentAnswer("");
      setQuestionCount((prevCount) => prevCount + 1);
      setTimeout(() => speakText(data.question), 1000);
    } catch (error) {
      console.error("Error fetching next question:", error);
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    clearInterval(timerRef.current);
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  
    return () => clearInterval(timerRef.current);
  }, [isRecording, stopRecording]);
  
  const handleNextClick = () => {
    stopRecording();
    setTimer(90);
  };

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      startRecording();
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timerRef.current);
    };
  }, [startRecording]);

  useEffect(() => {
    if (currentAnswer && questionCount > 0) {
      axios.post("http://localhost:8000/store_interview", {
        candidate_name: candidateName,
        question: currentQuestion,
        answer: currentAnswer,
      });
    }
  }, [currentAnswer, currentQuestion, candidateName, questionCount]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
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

  useEffect(() => {
    const pulseClass = getPulseClass(volume);
    if (pulseClass !== undefined) {
      setShowExpandingBorder(true);
      setPulseClass(pulseClass);
      const timer = setTimeout(() => {
        setShowExpandingBorder(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [volume]);

  return (
    <div className="flex h-screen overflow-y-hidden regular3">
      <div className="w-[70%] ml-10 mr-5 my-8 bg-black rounded-3xl justify-center items-center flex">
        <div className={`pulse-container ${getPulseClass(volume)}`} style={{ transform: `scale(${1 + volume / 100})` }}>
          {showExpandingBorder && (
            <div className="expanding-border"></div>
          )}
          <img
            src={Ring}
            alt="Audio Party"
            className="w-28"
          />
        </div>
      </div>
      <div className="w-[30%] flex flex-col justify-between my-8 mr-10">
        <div
          ref={scrollContainerRef}
          className="h-[70%] p-4 bg-[#0F0F36] rounded-3xl flex flex-col justify-start overflow-y-hidden"
        >
          {interviewData.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-end">
                <motion.div
                  key={`question-${index}`}
                  className="p-2 mb-4 w-72 rounded-3xl rounded-br-none bg-gradient-to-br from-[#002DBF] via-[#4396F7] to-[#FF9DB2] flex justify-end"
                >
                  <p className="text-white text-sm">{item.question}</p>
                </motion.div>
              </div>
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
          <div className="flex justify-end mt-2">
            <motion.div
              key={`current-question-${questionCount}`}
              className="p-2 mb-4 w-72 rounded-full rounded-br-sm bg-question_gradient flex justify-end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white text-sm pl-2">{currentQuestion}</p>
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
        <div className="flex flex-col items-center mt-5 h-[30%]">
          <div className="w-full h-full flex">
            <div className="relative">
              <video
                ref={videoRef}
                className={`rounded-3xl`}
                autoPlay
                playsInline
                muted
              />
              <button
                className="absolute top-0 right-0 bg-white text-white border-4 border-white border-3xl w-[55px] h-[55px] cursor-pointer flex justify-center items-center rounded-3xl"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19.7814"
                    cy="19.7814"
                    r="19.7814"
                    fill="#0072DC"
                  />
                  <path
                    d="M19.6771 21.0651C19.6771 21.1346 19.6504 21.1961 19.5969 21.2496L16.9334 23.9131L18.0886 25.0684C18.1903 25.17 18.2411 25.2903 18.2411 25.4294C18.2411 25.5685 18.1903 25.6888 18.0886 25.7904C17.987 25.892 17.8667 25.9429 17.7276 25.9429H14.1334C13.9944 25.9429 13.874 25.892 13.7724 25.7904C13.6708 25.6888 13.62 25.5685 13.62 25.4294V21.8352C13.62 21.6962 13.6708 21.5758 13.7724 21.4742C13.874 21.3726 13.9944 21.3218 14.1334 21.3218C14.2725 21.3218 14.3928 21.3726 14.4945 21.4742L15.6497 22.6295L18.3133 19.9659C18.3668 19.9125 18.4283 19.8857 18.4978 19.8857C18.5673 19.8857 18.6288 19.9125 18.6823 19.9659L19.5969 20.8805C19.6504 20.934 19.6771 20.9955 19.6771 21.0651ZM25.9429 14.1334V17.7276C25.9429 17.8667 25.892 17.987 25.7904 18.0886C25.6888 18.1903 25.5685 18.2411 25.4294 18.2411C25.2903 18.2411 25.17 18.1903 25.0684 18.0886L23.9131 16.9334L21.2496 19.5969C21.1961 19.6504 21.1346 19.6771 21.0651 19.6771C20.9955 19.6771 20.934 19.6504 20.8805 19.5969L19.9659 18.6823C19.9125 18.6288 19.8857 18.5673 19.8857 18.4978C19.8857 18.4283 19.9125 18.3668 19.9659 18.3133L22.6295 15.6497L21.4742 14.4945C21.3726 14.3928 21.3218 14.2725 21.3218 14.1334C21.3218 13.9944 21.3726 13.874 21.4742 13.7724C21.5758 13.6708 21.6962 13.62 21.8352 13.62H25.4294C25.5685 13.62 25.6888 13.6708 25.7904 13.7724C25.892 13.874 25.9429 13.9944 25.9429 14.1334Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <div className="ml-5">
              <p className="px-5 py-2 rounded-3xl flex items-center mb-5 text-[#0072DC]">
                <span className="w-3 h-3 bg-red-600 rounded inline-block mr-2"></span>
                {/* {isRecording ?  : "Paused"} */}Recording...
              </p>
              <button
                onClick={handleNextClick}
                className="border border-[#0072DC] px-14 py-2 bg-[#0072DC] text-white font-semibold rounded-3xl"
              >
                Next
              </button>
              <p className="text-3xl text-gray-400 mt-8 ml-10">
                {formatTimer(timer)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;