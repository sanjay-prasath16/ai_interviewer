import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import MagicIcon from "../assets/magicIcon.svg";
import WhiteMagicIcon from "../assets/whiteMagicIcon.svg";
import SummarizeIcon from "../assets/summarizeIcon.svg";
import SkillDisplay from "../Components/skillDisplay";
import Filter from "../assets/blueFilter.svg";
import Meta from "../assets/meta.png";
import Sanjay from "../assets/sanjay.jpeg";
import Mukesh from "../assets/mukesh.jpeg";
import Debaleena from "../assets/debaleena.jpg";
import Manjeet from "../assets/manjeet.jpeg";
import Priyansh from "../assets/priyansh.jpg";
import Bieden from "../assets/bieden.jpeg";
import Joe from "../assets/joe.jpeg";
import Rajan from "../assets/rajan.jpg";
import Edwin from "../assets/edwin.jpg";
import Joseph from "../assets/joseph.jpg";
import Raj from "../assets/raj.jpg";
import Sundar from "../assets/sundar pitchai.jpg";
import Location from "../assets/location.svg";
import Briefcase from "../assets/briefcase.svg";
import Securitytime from "../assets/securitytime.svg";
import backgroundImage1 from "../assets/Rectangle 7522.png";
import whiteArrow from "../assets/whiteDownArrow.svg";
import Rupees from '../assets/rupees.svg';
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";

const candidates = [
  {
    date: "23 Aug / 2024",
    name: "Sanjay",
    role: "UI/UX Designer",
    experience: "2 Years",
    company: "Google",
    location: "Bangalore",
    profile: Sanjay,
    skills: [
      "User Research",
      "Figma",
      "Photoshop",
      "Framer",
      "Illustrator",
      "Sketch",
      "Adobe XD",
      "InVision",
    ],
    score: 985,
  },
  {
    date: "24 Aug / 2024",
    name: "John Doe",
    role: "Frontend Developer",
    experience: "3 Years",
    company: "Microsoft",
    location: "Hyderabad",
    profile: Mukesh,
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular", "TypeScript"],
    score: 878,
  },
  {
    date: "25 Aug / 2024",
    name: "Alice Brown",
    role: "Product Manager",
    experience: "5 Years",
    company: "Amazon",
    location: "Chennai",
    profile: Manjeet,
    skills: ["Roadmapping", "Agile", "Scrum", "Leadership", "JIRA"],
    score: 892,
  },
  {
    date: "26 Aug / 2024",
    name: "Debaleena",
    role: "Backend Developer",
    experience: "4 Years",
    company: "Meta",
    location: "Delhi",
    profile: Debaleena,
    skills: ["Node.js", "Python", "Django", "MongoDB", "SQL", "Redis"],
    score: 788,
  },
  {
    date: "27 Aug / 2024",
    name: "Sophia Zhang",
    role: "Data Scientist",
    experience: "3 Years",
    company: "Apple",
    location: "Pune",
    profile: Priyansh,
    skills: [
      "Python",
      "Machine Learning",
      "Data Visualization",
      "Pandas",
      "NumPy",
    ],
    score: 575,
  },
  {
    date: "28 Aug / 2024",
    name: "Michael Johnson",
    role: "DevOps Engineer",
    experience: "6 Years",
    company: "Netflix",
    location: "Mumbai",
    profile: Bieden,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    score: 395,
  },
  {
    date: "29 Aug / 2024",
    name: "Isabella Williams",
    role: "Mobile App Developer",
    experience: "2 Years",
    company: "Spotify",
    location: "Kolkata",
    profile: Joe,
    skills: ["Swift", "Kotlin", "React Native", "UI Testing", "Firebase"],
    score: 482,
  },
  {
    date: "30 Aug / 2024",
    name: "Chris Taylor",
    role: "Cybersecurity Specialist",
    experience: "5 Years",
    company: "Tesla",
    location: "Gurgaon",
    profile: Rajan,
    skills: [
      "Network Security",
      "Penetration Testing",
      "Encryption",
      "Firewall",
    ],
    score: 490,
  },
  {
    date: "31 Aug / 2024",
    name: "Emma Watson",
    role: "Cloud Engineer",
    experience: "4 Years",
    company: "IBM",
    location: "Ahmedabad",
    profile: Edwin,
    skills: ["Azure", "AWS", "GCP", "Serverless", "Cloud Security"],
    score: 385,
  },
  {
    date: "01 Sep / 2024",
    name: "Liam Patel",
    role: "AI Engineer",
    experience: "3 Years",
    company: "OpenAI",
    location: "Noida",
    profile: Joseph,
    skills: ["Deep Learning", "PyTorch", "TensorFlow", "NLP", "GANs"],
    score: 572,
  },
  {
    date: "02 Sep / 2024",
    name: "Olivia Martinez",
    role: "Game Developer",
    experience: "2 Years",
    company: "Ubisoft",
    location: "Bangalore",
    profile: Raj,
    skills: ["Unity", "Unreal Engine", "C#", "Game Physics", "3D Modeling"],
    score: 480,
  },
  {
    date: "03 Sep / 2024",
    name: "Ethan White",
    role: "Blockchain Developer",
    experience: "4 Years",
    company: "Coinbase",
    location: "Hyderabad",
    profile: Sundar,
    skills: [
      "Smart Contracts",
      "Solidity",
      "Ethereum",
      "Cryptography",
      "Web3.js",
    ],
    score: 391,
  },
];

const getScoreBackground = (score) => {
  if (score >= 900 && score <= 1000) {
    return "linear-gradient(to bottom right, #856220 0%, #F4E683 28%, #BF923D 50%, #4E341B 75%, #F1EA82 100%)";
  } else if (score >= 800 && score < 900) {
    return "linear-gradient(to bottom right, #3A3A3A 0%, #A4A4A4 18%, #606060 31%, #CECECE 49%, #8F8F8F 62%, #464646 79%, #696969 95%)";
  } else if (score >= 700 && score < 800) {
    return "linear-gradient(to bottom right, #BC6554 0%, #62362D 20%, #A1503D 40%, #CA7561 49%, #E2AA9D 67%, #62362D 83%, #AA5946 95%)";
  }
  return "none";
};

const ApplicantsPool = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [summaryVisible, setSummaryVisible] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});
  const [showSkillScore, setShowSkillScore] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tableBGColor, setTableBGColor] = useState(false);
  const [tableScore, setTableScore] = useState(false);
  const [buttonRotation, setButtonRotation] = useState(0);
  const [candidateRotations, setCandidateRotations] = useState({});
  const buttonGradientRef = useRef(null);
  const candidateGradientRefs = useRef({});
  const buttonAnimationFrame = useRef(null);
  const candidateAnimationFrames = useRef({});

  const candidatesPerPage = 10;
  const pageCount = Math.ceil(candidates.length / candidatesPerPage);

  const currentCandidates = candidates.slice(
    currentPage * candidatesPerPage,
    (currentPage + 1) * candidatesPerPage
  );

  const handleCheckboxChange = (idx) => {
    setSelectedCandidates((prevSelected) => {
      if (prevSelected.includes(idx)) {
        return prevSelected.filter((selectedIdx) => selectedIdx !== idx);
      } else {
        return [...prevSelected, idx];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedCandidates([]);
    } else {
      const allCandidateIndices = currentCandidates.map((_, idx) => idx);
      setSelectedCandidates(allCandidateIndices);
    }
    setIsAllSelected(!isAllSelected);
  };

  const isAnyCheckboxSelected = selectedCandidates.length > 0;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const toggleSummary = (idx) => {
    setSummaryVisible((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));

    if (!summaryVisible[idx]) {
      setLoadingSummary((prev) => ({
        ...prev,
        [idx]: true,
      }));

      setTimeout(() => {
        setLoadingSummary((prev) => ({
          ...prev,
          [idx]: false,
        }));
      }, 2000);
    }
  };

  const animateButton = () => {
    setButtonRotation((prev) => (prev + 1) % 360);
    buttonAnimationFrame.current = requestAnimationFrame(animateButton);
  };

  const animateCandidate = (idx) => {
    setCandidateRotations((prev) => ({
      ...prev,
      [idx]: ((prev[idx] || 0) + 1) % 360
    }));
    candidateAnimationFrames.current[idx] = requestAnimationFrame(() => animateCandidate(idx));
  };


  const handleSkillScoreClick = () => {
    if (isAnimating) return;

    if (showSkillScore) {
      setShowSkillScore(false);
      setTableScore(false);
      setTableBGColor(false);
      cancelAnimationFrame(buttonAnimationFrame.current);
      setButtonRotation(0);
    } else {
      setIsAnimating(true);
      setShowSkillScore(true);
      setTableScore(false);
      setTableBGColor(true);
      animateButton();
      currentCandidates.forEach((_, idx) => animateCandidate(idx));
      setTimeout(() => {
        setIsAnimating(false);
        setShowSkillScore(true);
        setTableScore(true);
        setTableBGColor(false);
        Object.values(candidateAnimationFrames.current).forEach(cancelAnimationFrame);
        setCandidateRotations({});
      }, 5000);
    }
    console.log(showSkillScore);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(buttonAnimationFrame.current);
      Object.values(candidateAnimationFrames.current).forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <div className="bg-[#F2F2F2] h-screen overflow-hidden">
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg ml-8 h-[32%]">
        <div className="w-[68%] border border-white bg-white pt-4 pb-4 pr-4 rounded-[15px]">
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center">
                <img
                  src={Meta}
                  alt="Company Logo"
                  className="w-[86px] h-[72px] rounded-full -mt-2"
                />
              </div>
              <div className="ml-1 ">
                <h2 className="text-[24px] font-bold text-[#2D2D2D]">UI/UX Designer</h2>
                <p className=" flex text-[16px] font-medium text-[#787878]">
                  Meta |
                  <img className="h-[14px] w-[14px] mt-2 mr-1" src={Location} alt="" /> Noida
                </p>
                <div className="flex items-center">
                  <img className="h-[18px] w-[18px]" src={Briefcase} alt="" />
                  <span className="text-[16px] font-medium text-[#747474] ml-[2px]">
                    2 years
                  </span>
                  <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                  <img className="h-[18px] w-[18px] mr-1" src={Securitytime} alt="" />
                  <span className="text-[16px] font-medium text-[#747474]">
                    Fulltime
                  </span>
                  <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                  <img className="h-[18px] w-[9px] mr-1" src={Rupees} alt="" />
                  <span className="text-[16px] font-medium text-[#747474]">
                    3 - 5 LPA
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 -mt-10">
              <button
                className="p-3 rounded-[10px] border border-[#0072DC] text-[16px] font-medium text-[#0072DC]"
              >
                View Details
              </button>
              <button
                className="p-3 rounded-[10px] text-[16px] font-medium bg-[#C4C4C4] text-white cursor-not-allowed"
              >
                Position Closed
              </button>
            </div>
          </div>
          <div className="mt-4 ml-4 ">
            <h3 className="text-[16px] font-medium ml-2">Key Skills:</h3>
            <div className="flex flex-wrap mt-2">
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] mb-[24px]">
                User Research
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] mb-[24px]">
                Figma
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] mb-[24px]">
                Framer
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] mb-[24px]">
                Photoshop
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] mb-[24px]">
                UX
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] mb-[24px]">
                Information Architecture
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] mb-[24px]">
                Visual Design
              </span>
            </div>
          </div>
        </div>
        <div className="w-[30%] space-y-4 ml-4 mr-6 flex items-center">
          <div
            className="px-[27px] py-[26px] rounded-[10px] flex justify-between items-center h-[55%] w-full"
            style={{
              backgroundImage: `url(${backgroundImage1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="ml-1 text-[16px] font-semibold text-[#333232]">
                Total Candidate
              </h3>
              <p className="ml-1 text-[14px] text-[#A09E9E] font-medium">
                For the entire period
              </p>
            </div>
            <p className="text-[36px] font-semibold mr-2">1200+</p>
          </div>
        </div>
      </div>
      <div className="ml-10 justify-between mt-[27px] h-[68%]">
        <p className="font-semibold text-[24px] Inter">Candidate List</p>
        <div className="justify-between flex">
          <div className="mt-2 flex relative">
            <input
              type="text"
              className="outline-none rounded-full h-[44px] w-[306px] placeholder:text-[#353535] text-[16px] pl-[60px] text-[#353535]"
              placeholder="Search Candidates"
            />
            <CiSearch className="absolute mt-[12px] ml-[26.5px] text-[19px]" />
            <div className="relative flex">
              <button
                className={`relative z-10 ml-[16px] border border-white h-[44px] justify-center flex items-center rounded-[24px] text-[16px] cursor-pointer transition-all duration-300 overflow-hidden ${
                  showSkillScore
                    ? "text-white w-[191px]"
                    : "bg-white text-[#161616] w-[159px]"
                }`}
                onClick={handleSkillScoreClick}
              >
                <div
                  ref={buttonGradientRef}
                  className={`absolute inset-[-200%] transition-opacity duration-300 ${
                    showSkillScore ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `conic-gradient(from 270deg, 
              #420167 1%, 
              #8F48F8 22%, 
              #2061F8 36%, 
              #2D79F5 51%, 
              #0FB3D4 65%, 
              #241C70 84%, 
              #420167 100%)`,
                    transform: `translateY(10%) rotate(${buttonRotation}deg)`,
                  }}
                />
                <span className="relative z-20 text-[16px]">
                  Skill Stack Score
                </span>
                {(showSkillScore || isAnimating) && (
                  <img src={whiteArrow} className="z-30 ml-[12px]" alt="White Arrow" />
                )}
              </button>
            </div>
            <div className="ml-[16px] border border-white h-[44px] w-[102px] flex items-center rounded-[24px] bg-white text-[16px] text-[#161616]">
              <img src={Filter} alt="" className="ml-[19.4px]" />
              <p className="ml-[8px] text-[#161616] text-[16px]">Filter</p>
            </div>
          </div>
          <div
            className={`border rounded-[10px] mr-10 h-[48px] flex items-center justify-center px-3 py-6 ${
              isAnyCheckboxSelected
                ? "text-white"
                : "bg-gray-200 text-[#909090] border-gray-200"
            }`}
            style={{
              background: isAnyCheckboxSelected
                ? "linear-gradient(to bottom right, #002DBF 7%, #4396F7 46%, #FF9BD2 71%, #C9FFFC 97%)"
                : "",
              cursor: isAnyCheckboxSelected ? "pointer" : "default",
            }}
          >
            {isAnyCheckboxSelected ? (
              <img src={WhiteMagicIcon} alt="" className="h-8" />
            ) : (
              <img src={MagicIcon} alt="" className="h-8" />
            )}
            <p className="ml-1 Inter text-[16px] font-semibold">
              {`Take AI Interview ${
                isAnyCheckboxSelected ? `${selectedCandidates.length}` : "0"
              }`}
            </p>
          </div>
        </div>
        <div className="w-[98%] bg-white text-tableHead flex py-[13px] rounded-xl mt-[21px]">
          <div className="flex items-center justify-center w-[10%] text-[14px] Inter font-semibold">
            Applied Date
          </div>
          <div className="flex items-center justify-center w-[5%]">
            <input
              type="checkbox"
              className="custom-checkbox h-6 w-6 appearance-none border-2 border-[#737373] rounded-md checked:border-none checked:bg-[#0072DC] focus:ring-indigo-500"
              checked={isAllSelected}
              onChange={handleSelectAllChange}
            />
          </div>
          <div className="flex items-center w-[15%] text-[14px] Inter font-semibold">
            Candidate Name
          </div>
          {showSkillScore && (
            <div className="flex w-[10%] -ml-[5%] text-[14px] Inter font-semibold">
              Skill Stack Score
            </div>
          )}
          <div className="flex items-center justify-center w-[4%] text-[14px] Inter font-semibold">
            Experience
          </div>
          <div className="flex items-center justify-center w-[13%] text-[14px] Inter font-semibold">
            Company
          </div>
          <div className="flex items-center justify-center w-[5%] text-[14px] Inter font-semibold">
            Location
          </div>
          <div className="flex items-center ml-[3%] w-[25%] text-[14px] Inter font-semibold">
            Key Skills
          </div>
          <div className="flex text-[14px] Inter font-semibold"></div>
        </div>
        <div className="mr-10 overflow-y-auto h-[47%] bg-[#F1F4F8] mt-[12px] scrollbar-left">
          <div className="min-w-full text-left rounded-xl h-full">
            <div className="space-y-[12px]">
              {currentCandidates.map((candidate, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center">
                    <div className="flex flex-col items-center w-[10%]">
                      <span className="text-[#888888] text-[14px] font-medium Inter">
                        {candidate.date}
                      </span>
                    </div>
                    <div
                      className={`bg-white border-2 flex w-[100%] py-[19.5px] relative overflow-hidden ${
                        loadingSummary[idx] || summaryVisible[idx]
                          ? tableScore
                            ? "rounded-t-[8px] border-transparent"
                            : "rounded-t-[10px] border-white"
                          : tableScore
                          ? "rounded-[8px] border-transparent"
                          : "rounded-[10px] border-white"
                      }`}
                    >
                      {isAnimating && (
                        <div
                          ref={(el) => (candidateGradientRefs.current[idx] = el)}
                          className="absolute inset-[-1200%] transition-opacity duration-300"
                          style={{
                            background: `conic-gradient(from 270deg, 
                              #420167 1%, 
                              #8F48F8 22%, 
                              #2061F8 36%, 
                              #2D79F5 51%, 
                              #0FB3D4 65%, 
                              #241C70 84%, 
                              #420167 100%)`,
                            transform: `translateY(10%) rotate(${candidateRotations[idx] || 0}deg)`,
                            opacity: 1,
                          }}
                        />
                      )}
                      {tableScore && (
                        <div
                          className="absolute inset-0 border-[2px] border-transparent pointer-events-none overflow-hidden"
                          style={{
                            borderImage: `${getScoreBackground(candidate.score)} 1`,
                          }}
                        />
                      )}
                      <div className="flex items-center justify-center w-[6%] pl-[1.5%]">
                        <input
                          type="checkbox"
                          className="custom-checkbox h-6 w-6 appearance-none border-2 border-[#737373] rounded-md checked:border-none checked:bg-[#0072DC] focus:ring-indigo-500"
                          checked={selectedCandidates.includes(idx)}
                          onChange={() => handleCheckboxChange(idx)}
                        />
                      </div>
                      <div className="z-20 flex items-center w-[15%]">
                        <img
                          src={candidate.profile}
                          alt="Profile"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="z-20 ml-[4px]">
                          <p
                            className={`mb-[-5px] text-[14px] font-medium ${
                              tableBGColor ? "text-white" : "text-black"
                            }`}
                          >
                            {candidate.name}
                          </p>
                          <span
                            className={`text-[14px] font-medium ${
                              tableBGColor ? "text-white" : "text-[#A6A6A6]"
                            }`}
                          >
                            {candidate.role}
                          </span>
                        </div>
                      </div>

                      {tableScore && (
                        <div className="flex items-center justify-center">
                          <div
                            className="rounded-[12px] w-[44px] h-[22px] font-bold items-center flex justify-center"
                            style={{
                              background: getScoreBackground(candidate.score),
                              color: candidate.score >= 700 ? "white" : "#6F6F6F",
                            }}
                          >
                            {candidate.score}
                          </div>
                        </div>
                      )}
                      <div
                        className={`flex z-20 items-center ${
                          showSkillScore
                            ? "pl-[5.5%] w-[10%] ml-[1%]"
                            : "pl-[2%] w-[7%]"
                        }`}
                      >
                        <span
                          className={`text-[14px] font-medium ${
                            tableBGColor ? "text-white" : "text-black"
                          }`}
                        >
                          {candidate.experience}
                        </span>
                      </div>

                      <div
                        className={`z-20 flex items-center pl-[5%] text-[14px] font-medium w-[13%] ${
                          tableBGColor ? "text-white" : "text-tableBody"
                        }`}
                      >
                        {candidate.company}
                      </div>

                      <div
                        className={`z-20 flex items-center text-[14px] font-medium ${
                          showSkillScore ? "w-[7%] ml-[4%]" : "w-[7%] pl-[2.3%]"
                        } ${tableBGColor ? "text-white" : "text-tableBody"}`}
                      >
                        {candidate.location}
                      </div>

                      <div
                        className={`flex items-center ml-[2.3%] w-[35%] text-[14px] font-medium bg-transparent ${
                          tableBGColor ? "text-white" : "text-[#656565]"
                        }`}
                      >
                        <SkillDisplay skills={candidate.skills} tableBGColor={tableBGColor} />
                      </div>

                      <div className="flex items-center justify-center w-[18%]">
                        <button
                          className={`inline-flex items-center justify-center rounded-lg border hover:bg-[#E5F1FB] hover:border-[#0072DC] transition-all duration-1000 ease-in-out w-26 w-[70%] ${tableBGColor ? "border-black" : "border-[#98CDFF]"} ${
                            loadingSummary[idx] || summaryVisible[idx]
                              ? "px-3 py-2"
                              : "p-3"
                          }`}
                          onClick={() => toggleSummary(idx)}
                        >
                          {!(loadingSummary[idx] || summaryVisible[idx]) && (
                            <img
                              src={SummarizeIcon}
                              alt=""
                              className={`h-6 mt-[-2px]`}
                            />
                          )}
                          <span
                            className={`text-[16px] font-medium Inter ${
                              tableBGColor ? "text-black" : "text-[#0072DC]"
                            } ${
                              loadingSummary[idx] || summaryVisible[idx]
                                ? "content-center"
                                : "pl-2"
                            }`}
                          >
                            {loadingSummary[idx]
                              ? "Close"
                              : summaryVisible[idx]
                              ? "Close"
                              : "Summarize"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {loadingSummary[idx] || summaryVisible[idx] ? (
                    <div className="bg-[#F1F4F8]">
                      <div className="p-0">
                        <div
                          className={`relative flex flex-col px-20 py-5 rounded-b-[10px] bg-summarize_gradient opacity-[80%] w-[91%] ml-[9%] -mt-[12px]`}
                        >
                          {loadingSummary[idx] ? (
                            <div className="opacity-100">
                              <p className="text-sm font-semibold flex justify-center border border-white/10 bg-white/40 rounded-lg p-1 w-60">
                                <img
                                  src={SummarizeIcon}
                                  alt=""
                                  className="h-5 mr-2"
                                />
                                <span className="text-black text-[16px] font-medium">
                                  AI Summarizing...
                                </span>
                              </p>
                              <div className="loading-rectangle opacity-50 mt-3"></div>
                              <div className="loading-rectangle opacity-50"></div>
                              <div className="loading-rectangle opacity-50"></div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-semibold flex justify-center border border-white/10 bg-white/40 rounded-lg p-1 w-60">
                                <img
                                  src={SummarizeIcon}
                                  alt=""
                                  className="h-5 mr-2"
                                />
                                <span className="text-black text-[16px] font-medium">
                                  AI Summary
                                </span>
                              </p>
                              <p className="text-[14px] font-medium mt-3 text-justify">
                                Seeking a creative UI/UX Designer specializing
                                in web and mobile platforms, focused on
                                intuitive, responsive, and visually engaging
                                interfaces. Proficient in Figma, Transform ideas
                                into high-quality designs, ensuring seamless
                                user experiences across devices while aligning
                                with business goals.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <ReactPaginate
          previousLabel={<SlArrowLeft />}
          nextLabel={<SlArrowRight />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={
            "pagination flex justify-center mt-4 items-center"
          }
          activeClassName={"active"}
          pageClassName="px-1"
          activeLinkClassName="bg-primary text-white rounded-lg"
          pageLinkClassName="p-[12px] py-[7px] border border-paginationBox bg-paginationBox text-[#5D5D5D] rounded-lg"
          previousClassName={`p-[8px] border rounded-lg ${
            currentPage === 0
              ? "bg-paginationBox border-paginationBox text-[#C9C9C9]"
              : "bg-paginationBox border-paginationBox cursor-pointer"
          }`}
          previousLinkClassName={`${
            currentPage === 0 ? "cursor-default text-[#C9C9C9]" : ""
          }`}
          nextClassName={`p-[8px] border rounded-lg ${
            currentPage === pageCount - 1
              ? "bg-paginationBox border-paginationBox text-[#C9C9C9]"
              : "bg-paginationBox border-paginationBox cursor-pointer"
          }`}
          nextLinkClassName={`${
            currentPage === pageCount - 1 ? "cursor-default text-[#C9C9C9]" : ""
          }`}
          disabledClassName="cursor-default text-[#C9C9C9]"
        />
      </div>
    </div>
  );
};

export default ApplicantsPool;