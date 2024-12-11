import { useState } from "react";
import Profile from "../assets/candidateProfile.png";
import CoverPhoto from "../assets/coverPhoto.png";
import Abacus from "../assets/abacus.png";
import Settings from "../assets/Settings.svg";
import Bookmark from "../assets/Bookmark Icon.svg";
import NewsLetter from "../assets/News Letter.svg";
import Events from "../assets/Events.svg";
import blueDownArrow from "../assets/blueDownArrow.svg";
import add from "../assets/whiteAdd.png";
import edit from "../assets/whiteEdit.png";
import ExperienceImg1 from "../assets/ExperienceImg1.png";
import ExperienceImg2 from "../assets/ExperienceImg2.png";
import ExperienceImg3 from "../assets/ExperienceImg3.png";
import projectImage1 from "../assets/projectImage1.png";
import projectImage2 from "../assets/projectImage2.png";
import projectImage3 from "../assets/projectImage3.png";
import ProjectArrow from "../assets/projectArrow.png";

const experiences = [
  {
    id: 1,
    logo: ExperienceImg1,
    title: "Abacus Designs",
    role: "UI/UX Designer",
    duration: "September 2022-Present",
    location: "USA, Remote",
    details: [
      "Conducted user research to understand needs and behaviors.",
      "Created wireframes and prototypes to visualize design concepts.",
      "Collaborated with developers to ensure design feasibility.",
    ],
  },
  {
    id: 2,
    logo: ExperienceImg2,
    title: "TechWave Solutions",
    role: "Frontend Developer",
    duration: "June 2021-August 2022",
    location: "London, UK",
    details: [
      "Developed interactive user interfaces using React.js.",
      "Worked closely with designers to convert mockups into responsive designs.",
      "Optimized application performance for better user experience.",
    ],
  },
  {
    id: 3,
    logo: ExperienceImg3,
    title: "InnoTech Labs",
    role: "Product Designer",
    duration: "January 2020-May 2021",
    location: "Berlin, Germany",
    details: [
      "Designed intuitive user interfaces for SaaS platforms.",
      "Conducted usability testing and implemented feedback to refine designs.",
      "Collaborated with cross-functional teams to define product requirements.",
    ],
  },
];

const projects = [
  {
    id: 1,
    image: projectImage1,
    projectArrow: ProjectArrow,
    title: "Turtle AI 3D model, Case Study",
    company: "Part of AspireIT internship",
    period: "September 2022",
  },
  {
    id: 2,
    image: projectImage2,
    projectArrow: ProjectArrow,
    title: "Project funkab: A UX Journey in Virtual Reality",
    company: "Part of AspireIT internship",
    period: "September 2022",
  },
  {
    id: 3,
    image: projectImage3,
    projectArrow: ProjectArrow,
    title: "Echo: Redesigning User Journeys in Virtual Reality",
    company: "Part of AspireIT internship",
    period: "September 2022",
  },
];

const CandidateProfile = () => {
  const [mapActive, setMapActive] = useState(false);

  const mapClick = () => {
    setMapActive(!mapActive);
  };

  const [petalsVisible, setPetalsVisible] = useState(true);
  const [activePetal, setActivePetal] = useState(0);

  const petalSizes = [83, 52, 83, 52, 83, 52];

  const handleCenterCircleClick = () => {
    setPetalsVisible(!petalsVisible);
    setActivePetal((prev) => (prev + 1) % petalSizes.length);
  };

  const getPetalPosition = (index) => {
    const angle = index * 60 * (Math.PI / 180);
    const radius = 120;
    return {
      top: `${radius * Math.sin(angle) + 130}px`,
      left: `${radius * Math.cos(angle) + 130}px`,
    };
  };

  return (
    <div className="bg-[#121212] p-[40px] w-full overflow-x-hidden box-border">
      <div className="flex w-full">
        <div className="w-[30%]">
          <img src={Profile} alt="" className="mb-[20px] w-full" />
          <img src={CoverPhoto} alt="" className="w-full" />
          <div className="border border-white rounded-[16px] rounded-t-none text-white pr-[17px] pl-[25px]">
            <div className="flex justify-between">
              <p className="text-[36px] mt-[9px] font-semibold">Min Su</p>
              <div className="mt-[14px] text-end">
                <p>UI/UX Designer</p>
                <p className="text-[#7D7D7D] mt-[6px]">San Francisco, USA</p>
              </div>
            </div>
            <div className="flex mt-[42px] pb-[26px] border-b border-b-[#525252]">
              <img src={Abacus} alt="" className="" />
              <div className="ml-[14px]">
                <p className="text-[16px]">Abacus design</p>
                <p className="text-[#7D7D7D]">Present</p>
              </div>
            </div>
            <div className="mt-[26px] justify-between flex">
              <p className="text-[16px] font-semibold">Profile Viewers</p>
              <p className="text-[#0072DC] text-[16px] font-semibold">88</p>
            </div>
            <div className="mt-[24px] justify-between flex border-b border-b-[#525252] pb-[24px]">
              <p className="text-[16px] font-semibold">AI Interviews Taken</p>
              <p className="text-[#0072DC] text-[16px] font-semibold">17</p>
            </div>
            <p className="mt-[27px] text-[20px] text-[#7D7D7D]">
              Strengthen your profile with Super-Skilling courses
            </p>
            <div className="flex mt-[27px] items-center border-b border-b-[#525252] pb-[31px]">
              <div className="h-[36px] w-[36px] bg-premium-gradient rounded-[8px] mr-[14px]"></div>
              <p className="text-[16px] font-semibold">
                Get Premium at 50% Off
              </p>
            </div>
            <div className="flex mt-[25px] items-center">
              <img src={Settings} alt="" />
              <p className="ml-[12px] text-[16px] font-semibold">Settings</p>
            </div>
            <div className="flex mt-[25px] items-center">
              <img src={Bookmark} alt="" />
              <p className="ml-[12px] text-[16px] font-semibold">Saved Items</p>
            </div>
            <div className="flex mt-[25px] items-center">
              <img src={NewsLetter} alt="" />
              <p className="ml-[12px] text-[16px] font-semibold">
                News Letters
              </p>
            </div>
            <div className="flex mt-[25px] items-center mb-[33px]">
              <img src={Events} alt="" />
              <p className="ml-[12px] text-[16px] font-semibold">Events</p>
            </div>
          </div>
        </div>
        <div className="w-[70%] ml-[20px] text-white">
          <div className="border border-[#1E1E1E] h-[180px] rounded-[16px] bg-[#1E1E1E] pl-[34px] pt-[21px]">
            <p className="text-[24px] flex">
              Badges
              <img
                src={blueDownArrow}
                alt=""
                className="ml-[14.22px] mt-[5px]"
              />
            </p>
            <div className="mt-[22px] flex"></div>
          </div>
          <div className="flex mt-[20px] w-full">
            <div className="w-full">
              <div
                className="h-[360px] border border-[#282828] bg-[#282828] rounded-[16px] pt-[83px] hover:bg-gradient-to-br hover:from-[#063678] hover:to-[#420167] cursor-pointer"
                onClick={mapClick}
              >
                <p className="text-[32px] text-center">Skill Map</p>
                <p className="pt-[61px] px-[37px] text-[16px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div
                className="h-[460px] border border-[#464646] bg-[#464646] rounded-[16px] pt-[83px] mt-[20px]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(-45deg, #2D79F5 0%, #2059BD 8%, #164193 26%, #0A2360 48%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage = "none";
                }}
              >
                <p className="text-[32px] text-center">Execution Map</p>
                <p className="pt-[61px] px-[37px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="">
              <div
                className="h-[440px] border border-[#323232] bg-[#323232] rounded-[16px] pt-[83px] ml-[20px]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(-45deg, #0019B8 0%, #490C68 35%, #8A0020 57%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage = "none";
                }}
              >
                <p className="text-[32px] text-center">Knowledge Map</p>
                <p className="pt-[61px] px-[37px] text-[16px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div
                className="h-[380px] border border-[#464646] bg-[#464646] rounded-[16px] pt-[83px] mt-[20px] ml-[20px]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(-45deg, #680456 10%, #3B0B53 29%, #03144F 58%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage = "none";
                }}
              >
                <p className="text-[32px] text-center">Job-Role Map</p>
                <p className="pt-[61px] px-[37px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experiences */}
      <div className="bg-[#1E1E1E] mt-[62px] rounded-[16px] text-white w-full">
        <div className="p-[25px]">
          <div className="flex justify-between">
            <div>
              <p className="text-[36px]">Experiences</p>
            </div>
            <div className="flex p-[1.2rem]  space-x-[20px]">
              <img
                src={add}
                alt="Add"
                className="w-[37px] h-[38px] cursor-pointer"
              />
              <img
                src={edit}
                alt="Edit"
                className="w-[36px] h-[36px] cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full">
            {experiences.map((exp, index) => (
              <div
                className={`flex justify-between pt-10 pb-10 w-full ${
                  index !== experiences.length - 1
                    ? "border-b border-[#828282]"
                    : ""
                }`}
                key={index}
              >
                <div className="flex  border-r border-[#E1E1E1]  space-x-[20px] w-1/2">
                  <div className="flex  ">
                    <img
                      src={exp.logo}
                      alt=""
                      className="w-[156px] h-[156px]"
                    />
                  </div>
                  <div className="flex flex-col space-y-[10px] ">
                    <div className="">
                      <p className="text-[32px]">{exp.title}</p>
                      <h3 className="text-[24px] text-[#AAAAAA]">{exp.role}</h3>
                    </div>
                    <div>
                      <h4 className="text-[20px] text-[#7D7D7D]">
                        {exp.duration}
                      </h4>
                      <h5 className="text-[16px] text-[#7B7B7B]">
                        {exp.location}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between w-1/2">
                  <div className="flex w-[90%]">
                    <p className="ml-[3rem] ">
                      {exp.details.map((detail, index) => (
                        <p
                          className="text-[20px] pb-2 text-[#7D7D7D]"
                          key={index}
                        >
                          - {detail}
                        </p>
                      ))}
                    </p>
                  </div>
                  <div className="flex items-end w-[15%]">
                    <p className="text-[#0072DC] text-[16px] cursor-pointer">
                      ...see more
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* projects */}
      <div className="h-[810px] text-white rounded-[16px] bg-[#1E1E1E] mt-[61px] pt-[35px] px-[39px]">
        <div className="justify-between flex">
          <p className="text-[36px]">Projects</p>
          <div className="flex">
            <img src={add} alt="Add" className="w-[37px] h-[38px]" />
            <img
              src={edit}
              alt="Edit"
              className="w-[36px] h-[36px] ml-[22px]"
            />
          </div>
        </div>
        <div className="w-full">
          {projects.map((proj, index) => (
            <div key={index} className="mt-[52px]">
              <p className="text-[32px]">{proj.title}</p>
              <div
                className={`flex items-end justify-between pb-[42px] ${
                  index !== projects.length - 1 && "border-b border-[#828282]"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-end relative">
                    <img src={proj.image} alt="" className="mt-[15px]" />
                    <img
                      src={proj.projectArrow}
                      alt=""
                      className="absolute -bottom-5 -right-5"
                    />
                  </div>
                  <div className="ml-[24px]">
                    <p className="text-[#aaaaaa] text-[24px]">{proj.company}</p>
                    <p className="text-[#7D7D7D] text-[20px]">{proj.period}</p>
                  </div>
                </div>
                <p className="text-[#0072DC] cursor-pointer">...see more</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {mapActive && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur flex items-center justify-center z-50">
          {/* Main Container */}
          <div
            className="relative h-[85%] w-[80%] rounded-[36px] flex items-center justify-center"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #063678 0%, #420167 69%)",
            }}
          >
            {/* Center Circle */}
            <div
              id="center-circle"
              className="h-[160px] w-[160px] bg-white rounded-full flex items-center justify-center z-10 cursor-pointer shadow-lg"
              onClick={handleCenterCircleClick}
            >
              Click Me
            </div>

            {/* Petals */}
            {petalSizes.map((size, index) => (
              <div
                key={index}
                className={`absolute rounded-full animate-rotate-petal petal-${index} ${
                  petalsVisible ? "" : index !== activePetal ? "hidden" : ""
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
      )}
    </div>
  );
};

export default CandidateProfile;