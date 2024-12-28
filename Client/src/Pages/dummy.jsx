import { useEffect, useState } from "react";
import Javascript from "../assets/javascript.png";
import Technical from "../assets/technical.png";
import DigitalMarketing from "../assets/digitalMarketing.png";
import UIUX from "../assets/UIUX.png";
import AIInterview from "../assets/AIInterview.png";
import CSS from "../assets/CSS.png";
import Course from "../assets/CourseDescription.png";
import Save from "../assets/save.svg";
import Arrow from "../assets/right.svg";
import Chain from '../assets/BlockChain.png';

const SkillMap = () => {
  const petalPositions = [
    {
      size: "large",
      rotation: 20,
      color: "#F76376",
      image: Javascript,
      text: "Javascript Course",
      description:
        "In the JavaScript course, Min excelled in both theory and practical applications, gaining a strong grasp of core concepts like DOM manipulation, asynchronous programming, and ES6 features. Min showcased a passion for coding by completing several hands-on projects, including a dynamic web application. By the course's conclusion, Min achieved an average score of 90% and was commended for creativity and problem-solving skills.",
      weaknesses: 2,
      CourseName: "Javascript Course",
      Lessons: "5 Lessons . 44 hrs",
      skillStackScore: 35,
    },
    {
      size: "small",
      rotation: 80,
      color: "#2AAC7E",
      image: Technical,
      text: "Technical Interview",
      description:
        "Min participated in mock technical interviews, improving their problem-solving abilities and communication skills. During the sessions, Min demonstrated proficiency in algorithms, data structures, and system design, impressing evaluators with logical reasoning and code efficiency. With thorough preparation and consistent effort, Min gained the confidence to tackle real-world technical interviews effectively.",
      weaknesses: 4,
      CourseName: "Technical Interview",
      Lessons: "8 Lessons . 50 hrs",
      skillStackScore: 20,
    },
    {
      size: "large",
      rotation: 140,
      color: "#17C9FF",
      image: DigitalMarketing,
      text: "Digital Marketing Course",
      description:
        "In the digital marketing course, Min demonstrated remarkable progress and engagement, ultimately boosting their skill stack score by 25%. Throughout the sessions, Min actively participated in discussions, showcasing a keen understanding of key concepts such as SEO, social media strategies, and content marketing. By the end of the course, Min had successfully completed all assignments, earning an impressive average of 92% and receiving positive feedback from instructors.",
      weaknesses: 3,
      CourseName: "Digital Marketing Course",
      Lessons: "7 Lessons . 72 hrs",
      skillStackScore: 40,
    },
    {
      size: "small",
      rotation: 200,
      color: "#AD3DED",
      image: UIUX,
      text: "UI/UX Design Course",
      description:
        "Min exhibited exceptional creativity and analytical skills during the UI/UX Design course. By mastering design principles, wireframing, and prototyping tools, Min created user-centric designs that enhanced usability and aesthetics. The final project, a mobile app design, received praise for its intuitive navigation and innovative features. Min's average course score was 95%, reflecting their dedication and talent.",
      weaknesses: 5,
      CourseName: "UI/UX Design Course",
      Lessons: "3 Lessons . 22 hrs",
      skillStackScore: 45,
    },
    {
      size: "large",
      rotation: 260,
      color: "#FF9500",
      image: AIInterview,
      text: "AI Interview",
      description:
        "Through the AI Interview sessions, Min showcased a strong aptitude for engaging with AI-driven systems. They answered complex, scenario-based questions with poise and accuracy. Min's ability to adapt to dynamic question patterns, coupled with their thoughtful responses, earned recognition from peers and instructors. This experience enhanced Min's readiness for next-generation AI-based interview platforms.",
      weaknesses: 1,
      CourseName: "AI Interview",
      Lessons: "4 Lessons . 30 hrs",
      skillStackScore: 25,
    },
    {
      size: "small",
      rotation: 320,
      color: "#AD3DED",
      image: CSS,
      text: "CSS Course",
      description:
        "During the CSS course, Min demonstrated proficiency in crafting visually appealing web pages using advanced styling techniques. They mastered CSS Grid, Flexbox, animations, and responsive design, creating a portfolio that stood out for its creativity and precision. Min's projects consistently received high marks, with a final course average of 93%, showcasing their attention to detail and design expertise.",
      weaknesses: 2,
      CourseName: "CSS Course",
      Lessons: "10 Lessons . 120 hrs",
      skillStackScore: 40,
    },
  ];

  const [animationStage, setAnimationStage] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [pistilTextVisible, setPistilTextVisible] = useState(false);
  const [petalInfoVisible, setPetalInfoVisible] = useState(
    Array(petalPositions.length).fill(false)
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [clickedPetalIndex, setClickedPetalIndex] = useState(null);
  const [isReversing, setIsReversing] = useState(false);
  const [showAdditionalPetals, setShowAdditionalPetals] = useState(false);
  const [additionalPetalsVisible, setAdditionalPetalsVisible] = useState(false);

  useEffect(() => {
    const timings = [1000, 1500, 2000, 2500, 3000, 3500];

    // Initial petal positioning
    setTimeout(() => {
      setAnimationStage(1);
    }, timings[0]);

    for (let i = 1; i < petalPositions.length; i++) {
      setTimeout(() => {
        setAnimationStage(i + 1);
      }, timings[0] + i * 500);
    }

    // Show pistil text
    setTimeout(() => {
      setPistilTextVisible(true);
    }, timings[0] + petalPositions.length * 500);

    // Reveal petal information
    petalPositions.forEach((_, index) => {
      setTimeout(() => {
        setPetalInfoVisible((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, timings[0] + petalPositions.length * 500 + (index + 1) * 500);
    });

    // Start rotation
    setTimeout(() => {
      setAnimationStage(petalPositions.length);
      setTimeout(() => {
        setShouldRotate(true);
      }, 100);
    }, timings[0] + petalPositions.length * 500 + petalPositions.length * 500 + 1000);
  }, []);

  const handlePetalClick = (index) => {
    setSelectedColor(petalPositions[index].color);
    setClickedPetalIndex(index);
    setIsReversing(true);
    setShouldRotate(false);
    setShowAdditionalPetals(false);
    setAdditionalPetalsVisible(false);

    // Start reverse animation
    setTimeout(() => {
      setPistilTextVisible(false);
      setPetalInfoVisible(Array(petalPositions.length).fill(false));
    }, 500);

    // Animate petals back to pistil
    setTimeout(() => {
      setAnimationStage(0);
    }, 1000);
  };

  const handlePistilClick = () => {
    if (clickedPetalIndex !== null && !showAdditionalPetals) {
      setShowAdditionalPetals(true);
      setTimeout(() => {
        setAdditionalPetalsVisible(true);
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur flex flex-col items-center justify-center z-50">
      <div
        className="relative h-[95%] w-[80%] flex flex-col items-center justify-center rounded-[36px]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #063678 0%, #420167 69%)",
        }}
      >
        {/* Background Circles */}
        <div
          className="absolute h-[522px] w-[522px] rounded-full border transition-colors duration-300 ease-in-out"
          style={{ borderColor: selectedColor || "white" }}
        ></div>
        <div
          className="absolute h-[472px] w-[472px] rounded-full transition-colors duration-300 ease-in-out"
          style={{
            backgroundColor: selectedColor || "white",
            opacity: 0.14,
          }}
        ></div>
        <div
          className="absolute h-[432px] w-[432px] rounded-full transition-colors duration-300 ease-in-out"
          style={{
            backgroundColor: selectedColor || "white",
            opacity: 0.14,
          }}
        ></div>

        {/* Rotating Petals */}
        <div
          className={`absolute h-full w-full flex items-center justify-center ${
            shouldRotate ? "rotate-petals" : ""
          }`}
        >
          {petalPositions.map((petal, index) => (
            <div
              key={index}
              className={`absolute flex items-center justify-center transition-all duration-[1500ms] ease-out cursor-pointer ${
                petal.size === "large"
                  ? "h-[133px] w-[133px]"
                  : "h-[122px] w-[122px]"
              }`}
              style={{
                transform:
                  isReversing && clickedPetalIndex !== index
                    ? `rotate(20deg) translateY(0) scale(0)`
                    : isReversing && clickedPetalIndex === index
                    ? `rotate(20deg) translateY(0) scale(1)`
                    : animationStage <= index
                    ? `rotate(20deg) translateY(0) scale(0)`
                    : animationStage === index + 1
                    ? `rotate(${petal.rotation}deg) translateY(-117px) scale(1)`
                    : `rotate(${petal.rotation}deg) translateY(-117px) rotate(-${petal.rotation}deg)`,
                transitionDelay: `${index * 0.2}s`,
                zIndex:
                  isReversing && clickedPetalIndex === index ? 10 : 6 - index,
              }}
              onClick={() => handlePetalClick(index)}
            >
              <div
                className="absolute h-[80%] w-[80%] rounded-full transition-opacity duration-500"
                style={{
                  border: `2px dashed ${petal.color}`,
                  opacity: petalInfoVisible[index] ? 1 : 0,
                }}
              ></div>
              <div className="flex flex-col items-center justify-center rounded-full bg-white p-[14px] h-[calc(100%-14px)] w-[calc(100%-14px)]">
                <img
                  src={petal.image}
                  alt={petal.text}
                  className="h-[50%] w-[50%] object-contain transition-opacity duration-500"
                  style={{ opacity: petalInfoVisible[index] ? 1 : 0 }}
                />
                <p
                  className="text-center text-black transition-opacity duration-500"
                  style={{ opacity: petalInfoVisible[index] ? 1 : 0 }}
                >
                  {petal.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Petals */}
        {showAdditionalPetals && (
          <>
            {/* Left Petal */}
            <div
              className={`absolute left-[28%] top-[45%] -translate-y-1/2 transition-all duration-1000 ${
                additionalPetalsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transform: "translateY(-50%)",
              }}
            >
              <div className="bg-white rounded-full p-4 w-32 h-32 flex items-center justify-center">
                <p className="text-center text-black font-medium">
                  {petalPositions[clickedPetalIndex].Lessons.split(" . ")[0]}
                </p>
              </div>
              <div
                className="absolute top-[55%] left-full h-0 w-[160px]"
                style={{
                  borderTop: `2px dashed ${petalPositions[clickedPetalIndex].color}`,
                  transform: "translateY(-50%) rotate(15deg)",
                  transformOrigin: "left",
                }}
              ></div>
            </div>

            {/* Top Petal */}
            <div
              className={`absolute top-[10%] left-[45%] -translate-x-1/2 transition-all duration-1000 ${
                additionalPetalsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div 
                className="rounded-full p-4 w-32 h-32 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #B6947E 0%, #8F6959 20%, #F8DAC8 47%, #AC836E 67%, #B6947E 83%, #F8DCCB 100%)"
                }}
              >
                <p className="text-center text-black text-lg font-medium">
                  Block Chain Secure
                </p>
              </div>
              <img src={Chain} alt="" className="absolute top-[90%] left-1/2 h-[120px] z-40" />
            </div>

            {/* Right Petal */}
            <div
              className={`absolute right-[35%] top-[28%] -translate-y-1/2 transition-all duration-1000 ${
                additionalPetalsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transform: "translateY(-50%)",
              }}
            >
              <div className="bg-white rounded-full p-4 w-32 h-32 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-black text-2xl font-bold">
                    +{petalPositions[clickedPetalIndex].skillStackScore}
                  </p>
                  <p className="text-black text-sm">
                    Total Skill Stack Score Impact
                  </p>
                </div>
              </div>
              <div
                className="absolute top-[70%] right-full h-0 w-[100px]"
                style={{
                  borderTop: `2px dashed ${petalPositions[clickedPetalIndex].color}`,
                  transform: "translateY(-50%) rotate(-65deg)",
                  transformOrigin: "right",
                }}
              ></div>
            </div>
          </>
        )}

        {/* Pistil (Center) */}
        <div
          className={`absolute h-[146px] w-[146px] rounded-full z-20 bg-white flex items-center justify-center ${clickedPetalIndex!==null && "cursor-pointer"}`}
          onClick={handlePistilClick}
          style={{
            boxShadow: `
            inset 0px 4px 4px rgba(0, 0, 0, 0.25),
            0px 4px 4px rgba(0, 0, 0, 0.25)
          `,
          }}
        >
          {clickedPetalIndex === null ? (
            <p
              className="text-center text-black text-[20px] font-bold transition-opacity duration-500"
              style={{ opacity: pistilTextVisible ? 1 : 0 }}
            >
              Skill Map
            </p>
          ) : (
            <div className="flex flex-col w-full h-full p-[10px]">
              <div
                className={`items-center rounded-full w-full h-full justify-center flex flex-col p-[10px]`}
                style={{
                  border: `2px dashed ${petalPositions[clickedPetalIndex].color}`,
                }}
              >
                <img
                  src={petalPositions[clickedPetalIndex].image}
                  alt={petalPositions[clickedPetalIndex].text}
                  className="h-[50%] w-[50%] object-contain"
                />
                <p className="text-center text-black text-[12px]">
                  {petalPositions[clickedPetalIndex].text}
                </p>
              </div>
            </div>
          )}
        </div>
        {clickedPetalIndex !== null && (
          <div className="bg-[#282828] w-[95%] h-[35%] mt-[35%] z-50 rounded-[16px] flex transition-all duration-500 ease-out translate-y-full opacity-0 animate-slide-in">
            <div className="w-[65%] px-[20px] py-[25px]">
              <p className="text-[#D9D9D9] text-[14px] text-justify leading-[32px]">
                {petalPositions[clickedPetalIndex].description}
              </p>
            </div>
            <div className="relative w-[35%] py-[10px] px-[14px]">
              <img src={Course} alt="" className="h-[30%] w-full" />
              <img
                src={Save}
                alt="Save Icon"
                className="absolute top-6 right-6 w-[12px] h-[18px]"
              />
              <div className="absolute top-[23%] right-[14px]">
                <p
                  className="text-[26px] font-bold"
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, rgba(255, 187, 105, 1) 17%, rgba(228, 168, 94, 0.74) 54%, rgba(195, 143, 80, 0.41) 84%, rgba(153, 112, 63, 0) 100%)",
                  }}
                >
                  +{petalPositions[clickedPetalIndex].skillStackScore}
                </p>
              </div>
              <div className="flex flex-col justify-between h-[70%]">
                <div>
                  <div className="flex mt-1">
                    {[
                      ...Array(petalPositions[clickedPetalIndex].weaknesses),
                    ].map((_, index) => (
                      <p
                        key={index}
                        className="border border-[#FF3239] bg-[#FF3239] mt-1 h-[12px] w-[12px] rounded-full mr-1"
                      ></p>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-[#8E8E8E]">
                      {petalPositions[clickedPetalIndex].weaknesses} weaknesses
                      found
                    </p>
                    <p className="Inter text-[#8E8E8E]">
                      Skill Stack score impact up to
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#0072DC] Inter text-medium">Business</p>
                  <p className="text-bold text-white">
                    {petalPositions[clickedPetalIndex].CourseName}
                  </p>
                  <p className="text-[#8E8E8E]">
                    {petalPositions[clickedPetalIndex].Lessons}
                  </p>
                </div>
                <div className="flex justify-between h-[20%] w-full">
                  <p className="text-[#B4B4B4] border-b border-[#B4B4B4] items-end flex">
                    Overview
                  </p>
                  <div className="flex border-[#606060] bg-[#606060] h-full w-[45%] text-white items-center rounded-[20px]">
                    <p className="ml-[5%]">Start your lesson</p>
                    <div className="w-[31%] flex h-full justify-end items-end">
                      <p className="border border-black bg-black rounded-full w-[60%] h-full ml-1 flex items-center justify-center">
                        <img src={Arrow} alt="" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillMap;