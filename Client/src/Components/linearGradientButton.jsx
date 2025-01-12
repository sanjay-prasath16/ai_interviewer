import React from "react";
import { useNavigate } from "react-router-dom";

const GradientTextConfig = {
  className: "shadow-lg",
  colors: ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed: 8,
  showBorder: true,
};

const LinearGradientButton = ({ innerText, redirectionPage }) => {
  const { className, colors, animationSpeed, showBorder } = GradientTextConfig;
  const navigate = useNavigate();

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  const handleClick = () => {
    navigate(redirectionPage);
  };

  return (
    <div
      className={`relative w-[90%] mt-10 items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 p-5 text-[25px] text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        { innerText }
      </div>
    </div>
  );
};

export default LinearGradientButton;