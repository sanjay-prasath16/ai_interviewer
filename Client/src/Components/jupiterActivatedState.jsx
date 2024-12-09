import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Jupiter from "../assets/enlargedJupiter.png";
import Send from "../assets/send.svg";
import WhiteSend from "../assets/whiteSend.svg";
import Smile from "../assets/smile.svg";
import starConfetti from '../assets/Star confetti.svg';
import starConfetti2 from '../assets/Star confetti2.svg';
import PropTypes from "prop-types";

const JupiterActivatedState = ({ onEnlargedJupiterClick }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (userInput.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", text: userInput }]);
    setUserInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Here is the AI response to your message!" },
      ]);
    }, 1000);
  };

  return (
    <div className="h-full mr-10 pl-10">
      <div className="text-white border border-black h-[80%] bg-black rounded-3xl p-[10px] relative">
        <div className="flex justify-end">
          <img src={starConfetti} alt="" className="w-[29px] h-[29px] mt-[6%] animate-blink" />
          <p className="mt-[8%] h-16 items-center flex px-[19px] mr-10 bg-white text-black outline-2 w-[225px] outline-dashed outline-[#FFDB5B] rounded-full rounded-tr-md relative">
            Hello, I am Jupiter, am here to help you. Ask away your doubts!!
          </p>
          <img src={starConfetti2} alt="" className="w-[29px] h-[29px] mt-[12%] -ml-8 animate-blink" />
          <img
            src={Jupiter}
            alt="Jupiter"
            className="h-[120px] w-[120px] cursor-pointer"
            onClick={onEnlargedJupiterClick}
          />
        </div>
        <div className="w-full h-[70%] overflow-y-auto px-4 py-2 space-y-[18px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.type === "ai" ? "justify-end flex" : "justify-start flex"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className={`px-4 py-2 rounded-full ${
                  msg.type === "ai"
                    ? "bg-[#FFDB5B] text-right rounded-tr-md text-black"
                    : "border border-[#B65CFF] bg-transparent text-white rounded-br-md"
                }`}
                style={{
                  display: "inline-block",
                  maxWidth: "369px",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </motion.div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="relative h-[10%]">
        <div className="h-full mt-10 flex items-center relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="h-full w-full rounded-3xl outline-none pl-[45px] bg-[#3E3B41] text-white pr-[40px]"
            placeholder="Start Typing..."
          />
          <img
            src={Smile}
            alt="Smile Icon"
            className="absolute left-3 cursor-pointer"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
          <img
            src={userInput.trim() === "" ? Send : WhiteSend}
            alt="Send Icon"
            className="absolute right-3 cursor-pointer"
            onClick={handleSend}
          />
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-[calc(100%+10px)] left-0 w-full z-10">
            <Picker
              data={data}
              onEmojiSelect={(emoji) =>
                setUserInput((prev) => prev + emoji.native)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

JupiterActivatedState.propTypes = {
  onEnlargedJupiterClick: PropTypes.func.isRequired,
};

export default JupiterActivatedState;
