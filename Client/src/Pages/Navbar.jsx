import { useState } from "react";
import Liyla from "../assets/Type=Layila.svg";

const Navbar = () => {
  const [liylaStatus, setLiylaStatus] = useState(false);

  const toggleLiylaStatus = async () => {
    setLiylaStatus((prev) => !prev);
    // if(!liylaStatus) {
    //   const conversationId = await conversation.startSession({
    //     agentId: import.meta.env.VITE_APP_ELEVENLABS,
    //   });
    //   console.log("11 labs activated: ", conversationId);
    // } else {
    //   await conversation.endSession();
    // }
  };

  return (
    <>
      {liylaStatus ? (
        <div>
          <img src={Liyla} className="w-[86px] h-[86px] mt-[81px] mr-[31px]" />
          <p className="border border-white mt-[20px] px-[24px] py-[20px] text-justify">
            Hi,I’m Liyla. What can I do for you today?
          </p>
          <p className="mt-[8px] bg-[#0F0F36] opacity-[30%]">
            Post a job for UI/UX designer 
          </p>
        </div>
      ) : (
        <Navbar assistant={Liyla} onLiylaActivate={toggleLiylaStatus} />
      )}
    </>
  );
};

export default Navbar;
