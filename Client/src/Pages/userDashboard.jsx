import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import downArrow from "../assets/downArrow.svg";
import Card from "../Components/DashboardCard";
import GraphComponent from "../Components/graphCard";
import dashboardImage from "../assets/dashboardCard.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import image1 from "../assets/7171.png";
import image2 from "../assets/7172.png";
import image3 from "../assets/7173.png";
import image4 from "../assets/7174.png";
import image5 from "../assets/clock.svg";
import image6 from "../assets/level.svg";
import jupiter from "../assets/smallJupiter.png";
import hamburger from '../assets/hamburger.svg';
import profile from '../assets/Profile.png';
import rightArrow from '../assets/rightArrow.svg';
import Navbar from "../Components/Navbar";

const contentData = [
  {
    title: "Content writer",
    update: "updated 20 mins ago.",
    status: "Made in Top 20, AI Round",
    progress: "In progress",
    imageUrl: dashboardImage,
    pinned: true,
  },
  {
    title: "Content editor",
    update: "updated 40 mins ago.",
    status: "Made in Top 10, Final Round",
    progress: "Completed",
    imageUrl: dashboardImage,
    pinned: false,
  },
  {
    title: "Copywriter",
    update: "updated 120 mins ago.",
    status: "Shortlisted, Preliminary Round",
    progress: "In review",
    imageUrl: dashboardImage,
    pinned: false,
  },
  {
    title: "Content Writer",
    update: "updated 45 mins ago.",
    status: "Made in Top 5, Final Round",
    progress: "Completed",
    imageUrl: dashboardImage,
    pinned: false,
  },
  {
    title: "Content Editor",
    update: "updated 30 mins ago.",
    status: "Made in Top 10, AI Round",
    progress: "In progress",
    imageUrl: dashboardImage,
    pinned: false,
  },
  {
    title: "Copy Editor",
    update: "updated 15 mins ago.",
    status: "Made it to the Final Round",
    progress: "In review",
    imageUrl: dashboardImage,
    pinned: false,
  },
];

const data = [
  {
    image: image1,
    title: "Basics of Machine Learning",
    description:
      "Learn the essentials of machine learning in just 2 hours. Learn the essentials of machine learning in just 2 hours",
    duration: "2 hours 30 minutes",
    points: "Up to 25 points",
  },
  {
    image: image2,
    title: "Deep Learning Fundamentals",
    description:
      "Master the fundamentals of deep learning and AI. Learn the essentials of machine learning in just 2 hours",
    duration: "3 hours 30 minutes",
    points: "Up to 40 points",
  },
  {
    image: image3,
    title: "Data Science Bootcamp",
    description:
      "Kickstart your data science journey with this bootcamp. Learn the essentials of machine learning in just 2 hours",
    duration: "4 hours 30 minutes",
    points: "Up to 50 points",
  },
  {
    image: image4,
    title: "Data Science Bootcamp",
    description:
      "Kickstart your data science journey with this bootcamp. Learn the essentials of machine learning in just 2 hours",
    duration: "4 hours 30 minutes",
    points: "Up to 50 points",
  },
];

const skillGraphData = {
  AI: {
    labels: [
      "Data Analysis",
      "Machine Learning",
      "Natural Language Processing",
      "Deep Learning",
      "Model Evaluation",
      "Computer Vision",
      "Algorithm Development",
    ],
    datasets: [
      {
        role: "AI Engineer",
        score: 675,
        label: "Skill Level",
        data: [675, 500, 600, 400, 300, 700, 800],
        backgroundGradientStart: "#6A0751",
        backgroundGradientEnd: "#370454",
      },
    ],
  },
  DataAnalyst: {
    labels: [
      "Data Mining",
      "Data Visualization",
      "Data Cleaning",
      "Predictive Modeling",
      "Statistical Analysis",
      "Reporting and Insights",
      "Database Management",
    ],
    datasets: [
      {
        role: "Data Analyst",
        score: 675,
        label: "Skill Level",
        data: [675, 600, 500, 550, 700, 650, 600],
        backgroundGradientStart: "#235207",
        backgroundGradientEnd: "#081950",
      },
    ],
  },
  UXDesigner: {
    labels: [
      "Mockups",
      "Ideation",
      "Testing",
      "Visual Design",
      "Prototyping",
      "UX Design",
      "User Experience Research",
    ],
    datasets: [
      {
        role: "UX Design",
        score: 675,
        label: "Skill Level",
        data: [675, 600, 500, 550, 700, 650, 600],
        backgroundGradientStart: "#108AFC",
        backgroundGradientEnd: "#102B83",
      },
    ],
  },
};

const UserDashboard = () => {
  const [selected, setSelected] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentDate = new Date();
  const day = currentDate.toLocaleString("en-US", { weekday: "short" });
  const month = currentDate.toLocaleString("en-US", { month: "short" });
  const date = currentDate.getDate();

  const eventDate = new Date(2024, 10, 8);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-[#F1F4F8] h-screen flex flex-col text-xs Inter">
      <Navbar assistant={jupiter} />
      <div className="flex p-5 h-screen">
        {/* Left Side */}
        <div className="w-[40%] mr-14 flex flex-col h-full">
          <div className="border border-white h-[30%] bg-white rounded-[30px] relative pl-[14px] Inter z-10">
            <div className="h-[110px] w-[111px] border border-[#F1F4F8] bg-[#F1F4F8] rounded-full absolute -bottom-5 -right-10 z-10"></div>
            <div className="w-full h-[15%] flex justify-between items-end">
              <p className="text-[18px] Inter">Hello! Ayush</p>
              <img src={hamburger} alt="" className="pr-[45px] h-[4px]" />
            </div>
            <div className="h-[35%] flex items-center pt-4 w-[80%] justify-between">
              <img src={profile} alt="" className="h-full" />
              <div className="">
                <p className="text-[24px] Inter pb-[15%] pl-[15%]">1,456</p>
                <p className="text-[16px] Inter text-[#A5A5A7]">Impressions</p>
              </div>
              <div className="">
                <p className="text-[24px] Inter pb-[15%] pl-[30%]">78</p>
                <p className="text-[16px] Inter text-[#A5A5A7]">Applications</p>
              </div>
            </div>
            <div className="flex h-[25%] w-[75%] items-end justify-between mb-2">
              <div className="flex flex-col">
                <p className="text-[14px] Inter text-[#656565]">Present Role</p>
                <p className="text-[16px] mt-[3%] Inter">UX Designer</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[14px] Inter text-[#656565]">Suggested Role</p>
                <p className="text-[16px] mt-[3%] Inter">Product Designer</p>
              </div>
            </div>
            <div className="h-[25%] flex justify-end z-50 relative">
              <p className="px-[17px] text-[14px] text-white h-[70%] flex items-center rounded-full" style={{ border: '1px solid rgba(0, 114, 220, 0.1)', backgroundColor: 'rgba(0, 114, 220, 0.7)' }}>Time to upgrade your skill stack score</p>
              <div className="h-[70%] ml-[10px] w-[10%] flex justify-center items-center rounded-full" style={{ backgroundColor: 'rgba(0, 114, 220, 0.7)' }}>
                <img src={rightArrow} alt="" className="h-[19px] w-[7px]" />
              </div>
            </div>
          </div>

          <div className="mt-5 h-[55%] rounded-3xl relative overflow-hidden">
            <Swiper
              direction="vertical"
              spaceBetween={30}
              slidesPerView={1}
              // autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className={`h-full ${isDragging ? "grabbing" : "grab"}`}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
            >
              {Object.keys(skillGraphData).map((key) => {
                const data = skillGraphData[key];
                const gradientBackground = `linear-gradient(319deg, ${data.datasets[0].backgroundGradientStart} 0%, ${data.datasets[0].backgroundGradientEnd} 55%)`;

                return (
                  <SwiperSlide key={key}>
                    <div
                      className="p-5 rounded-3xl h-full"
                      style={{ background: gradientBackground }}
                    >
                      {isMounted && <GraphComponent data={data} />}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[60%] h-full">
          <div className="border border-white bg-white h-[45%] rounded-3xl px-8 py-5 overflow-hidden">
            <div className="flex justify-between">
              <p>Featured updates</p>
              <p className="border border-black rounded-full py-1 px-2 flex text-[#A5A5A7]">
                week
                <img src={downArrow} alt="" className="ml-2 pt-1" />
              </p>
            </div>
            <div className="flex overflow-hidden h-full">
              <div className="border-r-2 border-r-[#9C9C9C] border-opacity-50 mb-8">
                <p className="text-2xl">{`${day}, ${month} ${date}`}</p>
                <div className="pr-8">
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    captionLayout="dropdown"
                    classNames={{ day: "hover:bg-gray-300 hover:rounded-full" }}
                    modifiers={{
                      today: currentDate,
                      event: eventDate,
                    }}
                    modifiersClassNames={{
                      event: "custom-event-day",
                    }}
                    modifiersStyles={{
                      today: {
                        backgroundColor: "#0072DC",
                        color: "white",
                        borderRadius: "50%",
                      },
                      event: {
                        border: "1px solid #0072DC",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full mt-4 overflow-y-auto max-h-full mb-7">
                {contentData.map((content, index) => (
                  <Card
                    key={index}
                    title={content.title}
                    update={content.update}
                    status={content.status}
                    progress={content.progress}
                    imageUrl={content.imageUrl}
                    pinned={content.pinned}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-[45%] mt-5 overflow-hidden">
            <section className="rounded-3xl text-white h-full carouselSection">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-userDashboard",
                  bulletClass: "pagination-userDashboard",
                  bulletActiveClass: "pagination-active-userDashboard",
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1.5,
                }}
                slidesPerView={1}
                slidesPerGroup={1}
                modules={[Autoplay, Pagination, EffectCoverflow]}
                className="relative h-[90%]"
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index} className="relative">
                    <div
                      className="h-full w-full bg-no-repeat rounded-3xl relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 w-full h-full text-white text-center"
                        style={{
                          background:
                            "linear-gradient(235deg, rgba(217, 217, 217, 0) 16%, rgba(18, 19, 22, 0.70) 35%, #121316 63%, #121316 100%)",
                        }}
                      >
                        <div className="flex flex-col justify-between h-full p-6">
                          <h2 className="text-left w-[40%] text-[18px] text-white font-semibold leading-6">
                            Courses to Upgrade Your Skill Stack Score
                          </h2>

                          <div>
                          <h3 className="text-left text-[16px] font-semibold">
                            {item.title}
                          </h3>

                          <p className="w-[40%] mt-[18px] text-[#CECECE] text-[12px] text-justify">
                            {item.description}
                          </p>

                          <div className="mt-[18px] flex w-[40%] gap-[65px] justify-between text-[14px] text-[#AAAAAA]">
                            <span className="flex items-center gap-[4px] text-[#A5A5A7] text-[10px]">
                              <img
                                src={image5}
                                alt=""
                                className="block h-[16px] w-[16px]"
                              />
                              {item.duration}
                            </span>
                            <span className="flex items-center text-[#A5A5A7] text-[10px]">
                              <img
                                src={image6}
                                alt=""
                                className="block h-[16px] w-[16px] mr-2"
                              />
                              {item.points}
                            </span>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination swiper-pagination-userDashboard absolute top-10"></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;