import { useEffect, useState } from "react";

const Dummy = () => {
  const petalPositions = [
    { size: "large", rotation: 20 },
    { size: "small", rotation: 80 },
    { size: "large", rotation: 140 },
    { size: "small", rotation: 200 },
    { size: "large", rotation: 260 },
    { size: "small", rotation: 320 },
  ];

  const [animationStage, setAnimationStage] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(false);

  useEffect(() => {
    const timings = [1000, 1500, 2000, 2500, 3000, 3500];

    setTimeout(() => {
      setAnimationStage(1);
    }, timings[0]);

    for (let i = 1; i < petalPositions.length; i++) {
      setTimeout(() => {
        setAnimationStage(i + 1);
      }, timings[0] + i * 500);
    }

    setTimeout(() => {
      setAnimationStage(6);
      setTimeout(() => {
        setShouldRotate(true);
      }, 0.1);
    }, timings[0] + petalPositions.length * 500 + 1000);
  }, [petalPositions.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur flex items-center justify-center z-50">
      {/* Main Container */}
      <div
        className="relative h-[85%] w-[80%] flex items-center justify-center rounded-[36px]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #063678 0%, #420167 69%)",
        }}
      >
        {/* Petals */}
        <div
          className={`absolute h-full w-full flex items-center justify-center ${
            shouldRotate ? "rotate-petals" : ""
          }`}
        >
          {petalPositions.map((petal, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-[1500ms] ease-out ${
                petal.size === "large" ? "h-[103px] w-[103px]" : "h-[92px] w-[92px]"
              } rounded-full bg-[#D9D9D9]`}
              style={{
                transform:
                  animationStage <= index
                    ? `rotate(20deg) translateY(0) scale(0)`
                    : animationStage === index + 1
                    ? `rotate(${petal.rotation}deg) translateY(-110px) scale(1)`
                    : `rotate(${petal.rotation}deg) translateY(-110px) rotate(-${petal.rotation}deg)`,
                transitionDelay: animationStage <= index ? `${index * 0.2}s` : "0s",
                zIndex: animationStage <= index ? 6 - index : 0,
              }}
            />
          ))}
        </div>

        {/* Center Circle (Pistil) */}
        <div className="absolute h-[176px] w-[176px] rounded-full z-10 bg-white" />
      </div>
    </div>
  );
};

export default Dummy;