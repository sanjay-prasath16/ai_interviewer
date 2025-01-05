import { useState, useRef, useEffect } from 'react';

const RotatingSkillScore = () => {
  const [showSkillScore, setShowSkillScore] = useState(false);
  const gradientRef = useRef(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    let animationFrame;

    const rotateGradient = () => {
      if (gradientRef.current && showSkillScore) {
        rotationRef.current = (rotationRef.current - 1) % 360;
        gradientRef.current.style.transform = `translateY(10%) rotate(${rotationRef.current}deg)`;
      }
    };

    if (showSkillScore) {
      animationFrame = requestAnimationFrame(function animate() {
        rotateGradient();
        animationFrame = requestAnimationFrame(animate);
      });
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showSkillScore]);

  const handleSkillScoreClick = () => {
    setShowSkillScore(!showSkillScore);
  };

  const getScoreBackground = (score) => {
    const hue = Math.min(score, 100) * 1.2;
    return `linear-gradient(to right, hsl(${hue}, 100%, 50%), hsl(${hue}, 100%, 30%))`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-[600px]">
        {showSkillScore && (
          <div className="absolute inset-0 overflow-hidden rounded-[32px]">
            <div
              ref={gradientRef}
              className="absolute inset-[-620%] origin-center"
              style={{
                background: `conic-gradient(from 270deg, #C9FFFC 0%, #002DBF 25%, #4396F7 50%, #FF9BD2 75%, #C9FFFC 100%)`,
                transform: "translateY(10%)",
              }}
            />
          </div>
        )}
        <div className="absolute inset-0 rounded-[32px] bg-white/70 backdrop-blur-sm" />
        <div className="relative flex flex-col w-full p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <h2 className="text-lg font-semibold">candidate.name</h2>
                <p className="text-sm text-gray-600">tit</p>
              </div>
            </div>
            <button
              onClick={handleSkillScoreClick}
              className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              {showSkillScore ? "Hide Skill Score" : "Show Skill Score"}
            </button>
          </div>
          {showSkillScore && (
            <div className="mt-4">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${50}%`,
                    background: getScoreBackground(50),
                  }}
                />
              </div>
              <p className="mt-2 text-center font-semibold">
                Skill Score: 50
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RotatingSkillScore;

{/* <div
            className="border border-white p-4 rounded-lg flex justify-between items-center h-[46%]"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="ml-1 text-[16px] font-semibold">Total Cost</h3>
              <p className="ml-1 text-[14px] text-[#A09E9E]">
                Post duration - 27 Days
              </p>
            </div>
            <div className="">
              <p className="text-[36px] font-semibold justify-center flex">
                ₹3.5k
              </p>
              <span className="text-[12px] font-medium text-[#858585] bg-[#E5F6D2] px-2 py-1 rounded-md">
                Open 5 Aug - Close 2 Sep
              </span>
            </div>
          </div> */}