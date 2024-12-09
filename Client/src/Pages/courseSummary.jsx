import { motion } from "framer-motion";
import { useState } from "react";
import Background from "../assets/courseSummay.png";
import clock from "../assets/clock.svg";
import level from "../assets/level.svg";
import Play from "../assets/PlayButton.png";
import chatSection from "../assets/chatSection.png";
import badges from "../assets/Badges.png";
import summarizeIcon from "../assets/summarizeIcon.svg";
import vector from "../assets/coolingGlass.svg";
import { FaClock } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";

import slide_image_1 from "../assets/carousel1.png";
import slide_image_2 from "../assets/carousel2.png";
import slide_image_3 from "../assets/carousel3.png";
import slide_image_4 from "../assets/carousel4.png";
import slide_image_5 from "../assets/carousel5.png";

const CourseSummary = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineData = [
    {
      label: "Limitations of AI",
      id: 1,
      hoverText:
        "You have noticeable weaknesses in understanding the limitations of AI. This often results in difficulties when trying to implement AI solutions effectively. Your grasp of the tools and methodologies needed is not strong enough, which can cause setbacks and slow down project progress. Improving in this area is essential for boosting your performance in AI initiatives.",
      hoverColor: "#FF9D9D",
    },
    {
      label: "Bias and Fairness in AI",
      id: 2,
      hoverText:
        "You demonstrate a noticeable lack of understanding regarding bias and fairness in AI systems. Your approach often overlooks the importance of equitable data representation, which can lead to skewed outcomes. This gap in knowledge raises concerns about your ability to develop AI solutions that are just and impartial, ultimately affecting the integrity of the technology you work with.",
      hoverColor: "#FFEC5C",
    },
    {
      label: "Explainability of AI Models",
      id: 3,
      hoverText:
        "You have noticeable weaknesses in understanding the limitations of AI. This often results in difficulties when trying to implement AI solutions effectively. Your grasp of the tools and methodologies needed is not strong enough, which can cause setbacks and slow down project progress. Improving in this area is essential for boosting your performance in AI initiatives.",
      hoverColor: "#FF8AC3",
    },
    {
      label: "Deployment of AI models",
      id: 4,
      hoverText:
        "You often struggle with the deployment of AI models, finding it challenging to integrate them into existing systems. Your understanding of the necessary tools and processes is limited, which can lead to delays and inefficiencies in project timelines. This area requires further development to enhance your overall effectiveness in AI projects.",
      hoverColor: "#FFB32F",
    },
    {
      label: "Ethical Implications",
      id: 5,
      hoverText:
        "You have noticeable weaknesses in understanding the limitations of AI. This often results in difficulties when trying to implement AI solutions effectively. Your grasp of the tools and methodologies needed is not strong enough, which can cause setbacks and slow down project progress. Improving in this area is essential for boosting your performance in AI initiatives.",
      hoverColor: "#E8FF8A",
    },
  ];

  return (
    <div className="mx-10 my-5 regular3">
      <div>
        <img src={Background} alt="" />
      </div>
      <div className="mt-20 mb-40">
        <p className="mb-24 flex justify-center font-semibold text-xl">
          The weaknesses that will be addressed
        </p>
        <div className="flex justify-center">
          <div className="relative flex w-full max-w-[80%] mx-[10px] justify-between">
            {/* Horizontal Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="absolute h-0.5 bg-black top-1/2 transform -translate-y-1/2"
            ></motion.div>

            {/* Circles and Labels */}
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className="relative flex flex-col items-center"
              >
                {/* Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.5, duration: 0.3 }}
                  className={`w-5 h-5 border-2 rounded-full ${
                    hoveredId === item.id ? "bg-red-500" : "bg-white"
                  } border-red-500 shadow-md`}
                ></motion.div>

                {/* Label */}
                <motion.button
                  initial={{ opacity: 0, y: index % 2 === 0 ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5 + 0.3, duration: 0.5 }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`absolute ${
                    index % 2 === 0 ? "top-8" : "-top-12"
                  } text-center transform -translate-x-1/2 px-3 py-2 bg-white rounded-full border border-black whitespace-nowrap hover:bg-[#D3D3D3] hover:border-[#D3D3D3]`}
                  style={{
                    top: index % 2 === 0 ? "calc(100% + 10px)" : "auto",
                    bottom: index % 2 !== 0 ? "calc(100% + 10px)" : "auto",
                  }}
                >
                  {item.label}
                </motion.button>

                {/* Hover Text Box */}
                {hoveredId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute z-10 w-[419px] p-4 text-sm text-black rounded-lg shadow-lg`}
                    style={{
                      backgroundColor: item.hoverColor,
                      top: index % 2 === 0 ? "calc(100% + 70px)" : "auto",
                      bottom: index % 2 !== 0 ? "calc(100% + 70px)" : "auto",
                      left: index == 0 ? "-300%" : "auto",
                      right: index == 4 ? "-300%" : "auto",
                    }}
                  >
                    {item.hoverText}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-between">
        {/* First Section */}
        <div className="w-1/2 mr-20 bg-black p-6 rounded-3xl text-white">
          <p className="text-white text-lg text-[20px] font-normal pt-2 tracking-wide">
            Basics of AI Engineering (Practice Simulation)
          </p>
          <p className="text-sm mb-4 pt-5 leading-[2rem] ">
            The practice simulation test assesses your understanding of the
            course material. Expect a blend of challenging and technical
            questions aimed at your weaker areas. As you answer correctly, the
            questions will increase in difficulty, offering a thorough
            evaluation of your skills. This test is timed and monitored to
            ensure fairness.
          </p>
          <div className="flex justify-between w-[60%]">
            <div className="flex">
              <img src={summarizeIcon} alt="" />
              <p className="pl-2">AI Test</p>
            </div>
            <div className="flex">
              <FaClock className="text-white mt-[4.5px]" />
              <p className="pl-2">30 minutes</p>
            </div>
            <div className="flex">
              <img src={vector} alt="" />
              <p className="pl-2">Proctored</p>
            </div>
          </div>
          <div className="flex justify-end items-center mt-5">
            <button className="relative right-[10px] rounded-full p-[2px] bg-gradient-border">
              <span className="flex px-6 py-2 text-white text-lg font-medium bg-black rounded-full">
                Take Test
              </span>
            </button>
          </div>
        </div>

        {/* Second Section */}
        <div className="w-1/2 bg-black p-6 flex flex-col rounded-3xl text-white">
          <p className="text-white text-lg text-[20px] font-normal pt-2 tracking-wide">
            Basics of AI Engineering (Practice Simulation)
          </p>
          <p className="text-sm mb-4 pt-5 leading-[2rem] ">
            The practice simulation test assesses your understanding of the
            course material. Expect a blend of challenging and technical
            questions aimed at your weaker areas. As you answer correctly, the
            questions will increase in difficulty, offering a thorough
            evaluation of your skills. This test is timed and monitored to
            ensure fairness.
          </p>
          <div className="flex justify-between w-[60%]">
            <div className="flex ">
              <img src={summarizeIcon} alt="" />
              <p className="pl-2">AI Test</p>
            </div>
            <div className="flex ">
              <FaClock className="text-white mt-[4.5px]" />
              <p className="pl-2">30 minutes</p>
            </div>
            <div className="flex ">
              <img src={vector} alt="" />
              <p className="pl-2">Proctored</p>
            </div>
          </div>
          <div className="flex justify-end items-center mt-5">
            <button className="relative right-[10px] rounded-full p-[2px] bg-gradient-border">
              <span className="flex  px-6 py-2 text-white text-lg font-medium bg-black rounded-full">
                Take Test
              </span>
            </button>
          </div>
        </div>
      </div>
      <section className="trending mt-20">
        <div className="container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={3}
            spaceBetween={0}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            className="trending-slider"
          >
            {[
              slide_image_1,
              slide_image_2,
              slide_image_3,
              slide_image_4,
              slide_image_5,
            ].map((image, index) => (
              <SwiperSlide className="trending-slide" key={index}>
                <div className="trending-slide-img relative w-full">
                  <img src={image} alt={`Slide ${index + 1}`} />
                  {activeIndex === index && (
                    <div>
                      <img
                        src={Play}
                        alt="Play Button"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity duration-300"
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    </div>
                  )}
                  <div className="absolute top-[82%] left-5 text-white font-semibold w-full">
                    <p className="text-[18px]">Course {index + 1}</p>
                    <div className="flex justify-between w-full mt-2">
                      <div className="flex items-center w-5">
                        <img
                          src={clock}
                          alt=""
                          className="h-4 w-4 object-contain mr-1"
                        />
                        <p className="whitespace-nowrap text-xs">
                          2 hours 30 minutes
                        </p>
                      </div>
                      <div className="flex w-5 mr-[30%]">
                        <img
                          src={level}
                          alt=""
                          className="h-4 w-4 object-contain mr-1"
                        />
                        <p className="whitespace-nowrap text-xs">Beginner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="trending-slider-control mt-5">
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>
      <div className="w-full flex mt-20">
        <div className="w-1/2 mr-5 flex flex-col h-full">
          <div className="border border-[#F26112] rounded-3xl h-[35%] pt-2 font-semibold text-[18px] items-center justify-center flex flex-col">
            <p className="mb-5">Badges To Earn On Completion</p>
            <img src={badges} alt="" />
          </div>
          <div className="w-full mt-3 text-center border-t-4 border-l border-r border-gray-200 mb-40">
            <h2 className="font-bold text-xl mt-5">Course Plan</h2>
            <div className="bg-white rounded-lg p-5">
              <ul className="list-none space-y-1">
                <li className="p-2 hover:bg-blue-200">
                  Introduction to AI and its applications
                </li>
                <li className="p-2 hover:bg-blue-200">
                  Understanding Machine Learning
                </li>
                <li className="p-2 hover:bg-blue-200">
                  Deep Learning Fundamentals
                </li>
                <li className="p-2 hover:bg-blue-200">
                  Natural Language Processing
                </li>
                <li className="p-2 hover:bg-blue-200">Computer Vision</li>
                <li className="p-2 hover:bg-blue-200">AI Ethics and Safety</li>
                <li className="p-2 hover:bg-blue-200">
                  AI Project Development
                </li>
                <li className="p-2 hover:bg-blue-200">Capstone Project</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center h-full">
          <img src={chatSection} alt="" className="h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CourseSummary;
