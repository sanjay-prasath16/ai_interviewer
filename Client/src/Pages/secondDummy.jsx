import { useRef, useEffect } from "react";
import Search from "../assets/blueSearch.svg";

const Dummy = () => {
  const gradientRef = useRef(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const rotateGradient = () => {
      if (gradientRef.current) {
        rotationRef.current = (rotationRef.current - 1) % 360;
        gradientRef.current.style.transform = `translateY(10%) rotate(${rotationRef.current}deg)`;
      }
    };

    const animationFrame = requestAnimationFrame(function animate() {
      rotateGradient();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-[600px]">
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
        <div className="absolute inset-0 rounded-full bg-gray-800/70 backdrop-blur-sm" />
        <div className="flex max-w-[657px]">
          <img src={Search} alt="" className="z-50 ml-5" />
          <input
            type="text"
            placeholder="Search amongst the best talent"
            className="w-full px-6 py-4 text-[#c3c3ea] bg-transparent rounded-[32px] outline-none placeholder-gray-400 relative z-10 placeholder:text-[#c3c3ea] text-lg font-normal"
            aria-label="Search amongst the best talent"
          />
        </div>
      </div>
    </div>
  );
};

export default Dummy;