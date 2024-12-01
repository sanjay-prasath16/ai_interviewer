import { useState } from "react";
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
import SwiperCore from "swiper";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";

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
        backgroundGradientStart: "#3A8DFF",
        backgroundGradientEnd: "#1C6FA6",
      },
    ],
  },
  UXDesigner: {
    labels: [
      "Mockups",
      "Research",
      "Ideation",
      "UX Design",
      "Testing",
      "Prototyping",
      "Visual Design",
    ],
    datasets: [
      {
        role: "UX Designer",
        score: 675,
        label: "Skill Level",
        data: [675, 500, 600, 700, 650, 580, 630],
        backgroundGradientStart: "#FF6A00",
        backgroundGradientEnd: "#D15500",
      },
    ],
  },
};

const UserDashboard = () => {
  SwiperCore.use([Autoplay, EffectCoverflow, Pagination, Navigation]);
  const [selected, setSelected] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentDate = new Date();
  const day = currentDate.toLocaleString("en-US", { weekday: "short" });
  const month = currentDate.toLocaleString("en-US", { month: "short" });
  const date = currentDate.getDate();

  const eventDate = new Date(2024, 10, 8);

  return (
    <div
      className="flex p-5 bg-[#F1F4F8] h-screen text-xs Inter">
      <div className="w-[35%] mr-14 flex flex-col h-full max-h-screen">
        <div className="border border-white h-[40%] bg-white rounded-3xl"></div>
        <div className="h-[60%] mt-5 flex-grow rounded-3xl mb-5 relative overflow-hidden">
          <Swiper
            direction="vertical"
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
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
                    <GraphComponent data={data} className="h-[50%]" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="w-[65%]">
        <div className="border border-white bg-white h-[65%] rounded-3xl px-8 py-5">
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
                  classNames={{
                    day: "hover:bg-gray-300 hover:rounded-full",
                  }}
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
        <div className="h[35%]"></div>
      </div>
    </div>
  );
};

export default UserDashboard;
