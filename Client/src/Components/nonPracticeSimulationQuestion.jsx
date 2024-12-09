import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Send from "../assets/send.svg";
import WhiteSend from "../assets/whiteSend.svg";
import Smile from "../assets/smile.svg";
import PropTypes from "prop-types";
import smallJupitericon from "../assets/smallJupiter.png";

const NonPracticeSimulationQuestion = ({
  onSmallJupiterClick,
  onUserMessageSend,
}) => {
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

    setMessages((prev) => [...prev, { text: userInput }]);
    setUserInput("");
    onUserMessageSend();
  };

  return (
    <div className="h-[95%] mr-10 pl-10 flex flex-col">
      <div className="p-5 pl-10 rounded-[30px] questionBox relative overflow-hidden h-full flex flex-col">
        <div className="absolute inset-0 rounded-[30px] bg-black opacity-[50%] cutout-box"></div>
        <div className="relative z-10 flex flex-col h-full">
          <div className="absolute -top-5 -right-5 flex items-end">
            <img
              className="relative h-[60px] w-[60px] cursor-pointer"
              src={smallJupitericon}
              alt=""
              onClick={onSmallJupiterClick}
            />
          </div>
          <div className="text-[24px] pb-4 font-bold text-white">
            <h1>Question.</h1>
          </div>
          <div className="text-justify text-white mb-4">
            <p className="text-[14px]">{`What are your thoughts on the branding of the 3D model incorporated showcased in the image? How do you think we can enhance our brand's appeal and messaging to better connect with our target audience?`}</p>
            <br />
            <p className="text-[14px] mt-[2%] pb-[5%] border-b-2 border-[#9D9D9D]">
              Mention your answer precisely in 3 or more points.
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 items-end flex flex-col">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="px-4 py-2 rounded-[15px] bg-[#7403D0] text-white mt-4"
                style={{
                  display: "inline-block",
                  maxWidth: "369px",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
      <div className="relative mt-5">
        <div className="h-full flex items-center relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="h-[50px] w-full rounded-3xl outline-none pl-[45px] bg-[#3E3B41] text-white pr-[40px]"
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

NonPracticeSimulationQuestion.propTypes = {
  onSmallJupiterClick: PropTypes.func.isRequired,
  onUserMessageSend: PropTypes.func.isRequired,
};

export default NonPracticeSimulationQuestion;
