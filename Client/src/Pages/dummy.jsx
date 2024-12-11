import { useState, useEffect } from "react";

const Dummy = () => {
  const [petalsVisible, setPetalsVisible] = useState(false);
  const [rotate, setRotate] = useState(false);

  const petalSizes = [83, 52, 83, 52, 83, 52];
  const radius = 120; // Radius for the petals around the center

  // Calculate petal position based on index
  const getPetalPosition = (index) => {
    const angle = index * (360 / petalSizes.length) * (Math.PI / 180);
    return {
      top: `${radius * Math.sin(angle) + 160}px`,
      left: `${radius * Math.cos(angle) + 160}px`,
    };
  };

  useEffect(() => {
    // Delay to show petals sequentially, followed by rotation
    const timeout1 = setTimeout(() => {
      setPetalsVisible(true); // Show all petals
    }, 1000);

    const timeout2 = setTimeout(() => {
      setRotate(true); // Start rotation
    }, 2000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur flex items-center justify-center z-50">
      {/* Main Container */}
      <div
        className="relative h-[320px] w-[320px] rounded-full flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #063678 0%, #420167 69%)",
        }}
      >
        {/* Center Circle */}
        <div
          id="center-circle"
          className={`h-[100px] w-[100px] bg-white rounded-full flex items-center justify-center z-10 shadow-lg transition-transform duration-1000 ${
            rotate ? "animate-spin-slow" : ""
          }`}
        >
          Center
        </div>

        {/* Petals */}
        {petalSizes.map((size, index) => (
          <div
            key={index}
            className={`absolute rounded-full bg-white transition-all duration-500 ${
              petalsVisible ? "" : "hidden"
            }`}
            style={{
              height: `${size}px`,
              width: `${size}px`,
              ...getPetalPosition(index),
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Dummy;