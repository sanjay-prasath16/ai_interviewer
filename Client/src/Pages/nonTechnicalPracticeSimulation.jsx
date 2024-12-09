import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JupiterActivatedState from "../Components/jupiterActivatedState";
import NonPracticeSimulationQuestion from "../Components/nonPracticeSimulationQuestion";
import Timer from "../assets/Timer.svg";
import PracticeSimulationImage from '../assets/nonTechnicalPracticeImage.png';

const NonTechnicalPracticeSimulation = () => {
  const [timer, setTimer] = useState(15 * 60);
  const [isFlipped, setIsFlipped] = useState(false);
  const [messageCount, setMessageCount] = useState(0); // Tracks the number of user messages sent

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleUserMessageSend = () => {
    setMessageCount((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="relative h-screen w-screen bg-[#0E0E0E] overflow-hidden">
      <div className="absolute -left-[5%] top-[60%] -translate-y-1/2 w-[35%] h-[70%] rounded-full bg-gradient-radial from-blue-400/50 via-blue-500/70 to-transparent blur-2xl" />
      <div className="absolute -right-[5%] top-[40%] -translate-y-1/2 w-[35%] h-[70%] rounded-full bg-gradient-radial from-purple-500/50 via-purple-600/70 to-transparent blur-2xl" />
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative h-full flex">
        <div className="w-[50%] h-[80%] ml-10 mr-5 my-8 rounded-3xl p-5 relative">
          <img src={PracticeSimulationImage} alt="" className="h-full w-full" />
          <div className="flex justify-end">
            <span className="text-white border border-[#FFFFFF] rounded-full p-3 px-5 text-[20px] font-medium flex absolute top-12 right-12">
              <img src={Timer} alt="" className="w-[23px] h-[24px] mt-1 mr-2" />
              Timer: {formatTimer(timer)}
            </span>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center relative">
          <motion.div
            className="w-full h-[90%] relative rounded-3xl"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Front Side: PracticeSimulationQuestion */}
            <div
              className={`absolute w-full h-[90%] backface-hidden ${
                isFlipped ? "hidden" : "block"
              }`}
            >
              <NonPracticeSimulationQuestion
                onSmallJupiterClick={handleToggle}
                onUserMessageSend={handleUserMessageSend} // Callback to track messages
              />
            </div>

            {/* Back Side: JupiterActivatedState */}
            <div
              className={`absolute w-full h-[90%] backface-hidden ${
                isFlipped ? "block" : "hidden"
              }`}
              style={{ transform: "rotateY(180deg)" }}
            >
              <JupiterActivatedState onEnlargedJupiterClick={handleToggle} />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10">
        <button
          disabled={messageCount < 0}
          className={`rounded-full px-10 py-2 text-white text-[14px] font-medium shadow-lg ${
            messageCount >= 1
              ? "bg-[#7403D0] cursor-pointer"
              : "bg-[#CC8DFF] cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NonTechnicalPracticeSimulation;