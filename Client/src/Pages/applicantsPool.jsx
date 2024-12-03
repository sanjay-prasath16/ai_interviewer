import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import MagicIcon from "../assets/magicIcon.png";
import WhiteMagicIcon from "../assets/whiteMagicIcon.png";
import SummarizeIcon from "../assets/summarizeIcon.png";
import SkillDisplay from "../Components/skillDisplay";
import Filter from "../assets/filter.png";
import Meta from "../assets/meta.png";
import Profile from "../assets/emma smith.png";
import Sanjay from '../assets/sanjay.jpeg';
import Mukesh from '../assets/mukesh.jpeg';
import Debaleena from '../assets/debaleena.jpg';
import Manjeet from '../assets/manjeet.jpeg';
import Priyansh from '../assets/priyansh.jpg';
import Bieden from '../assets/bieden.jpeg';
import Joe from '../assets/joe.jpeg';
import Rajan from '../assets/rajan.jpg';
import Edwin from '../assets/edwin.jpg';
import Joseph from '../assets/joseph.jpg';
import Raj from '../assets/raj.jpg';
import Sundar from '../assets/sundar pitchai.jpg';
import Location from "../assets/location.png";
import Briefcase from "../assets/briefcase.png";
import Securitytime from "../assets/securitytime.png";
import backgroundImage from "../assets/Rectangle 7502.png";
import backgroundImage1 from "../assets/Rectangle 7522.png";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";

// const candidates = new Array(74).fill({
//   date: "23 Aug / 2024",
//   name: "Emma Smith",
//   role: "UI/UX Designer",
//   experience: "2 Years",
//   company: "Google",
//   location: "Bangalore",
//   profile: Profile,
//   skills: [
//     "User Research",
//     "Figma",
//     "Photoshop",
//     "Framer",
//     "Illustrator",
//     "Sketch",
//     "Adobe XD",
//   ],
// });
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
  },
  {
    date: "27 Aug / 2024",
    name: "Sophia Zhang",
    role: "Data Scientist",
    experience: "3 Years",
    company: "Apple",
    location: "Pune",
    profile: Priyansh,
    skills: ["Python", "Machine Learning", "Data Visualization", "Pandas", "NumPy"],
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
  },
  {
    date: "30 Aug / 2024",
    name: "Chris Taylor",
    role: "Cybersecurity Specialist",
    experience: "5 Years",
    company: "Tesla",
    location: "Gurgaon",
    profile: Rajan,
    skills: ["Network Security", "Penetration Testing", "Encryption", "Firewall"],
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
  },
  {
    date: "03 Sep / 2024",
    name: "Ethan White",
    role: "Blockchain Developer",
    experience: "4 Years",
    company: "Coinbase",
    location: "Hyderabad",
    profile: Sundar,
    skills: ["Smart Contracts", "Solidity", "Ethereum", "Cryptography", "Web3.js"],
  },
];

const ApplicantsPool = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [summaryVisible, setSummaryVisible] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});

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

  return (
    <div className="bg-[#F1F4F8] h-screen overflow-hidden">
      {/* job description */}
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg ml-8">
        {/* UI/UX Designer Section styled like a separate card */}
        <div className="w-[68%] border border-white bg-white pt-4 pb-4 pr-4 rounded-lg ">
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center">
                <img
                  src={Meta}
                  alt="Company Logo"
                  className="w-24 h-24 rounded-full -mt-2"
                />
              </div>
              <div className="ml-1 ">
                <h2 className="text-[24px] font-bold">UI/UX Designer</h2>
                <p className=" flex text-[16px] font-medium text-[#787878]">
                  Meta |
                  <img className="h-5 mt-2 mr-1" src={Location} alt="" /> Noida
                </p>
                <div className="flex items-center">
                  <img className="h-5 mr-1" src={Briefcase} alt="" />
                  <span className="text-[16px] font-medium text-[#747474]">2 years</span>
                  <span className="mx-2">|</span>
                  <img className="h-4 mr-1" src={Securitytime} alt="" />
                  <span className="text-[16px] font-medium text-[#747474]">Fulltime</span>
                  <span className="mx-2">|</span>
                  <span className="text-[16px] font-medium text-[#747474]">₹ 3 - 5 LPA</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 -mt-10">
              <button
                className="p-3 rounded-md border border-[#0072DC] text-[16px] font-medium"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0072DC",
                }}
              >
                View Details
              </button>
              <button
                className="p-3 rounded-md text-[16px] font-medium"
                style={{ backgroundColor: "#C4C4C4", color: "#FFFFFF" }}
              >
                Position Closed
              </button>
            </div>
          </div>
          <div className="mt-4 ml-4 ">
            <h3 className="text-[16px] font-medium ml-2">Key Skills:</h3>
            <div className="flex flex-wrap mt-2">
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                User Research
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Figma
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Framer
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Photoshop
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                UX
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Information Architecture
              </span>
              <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Visual Design
              </span>
            </div>
          </div>
        </div>

        {/* Right Section with white borders */}
        <div className="w-[30%] space-y-4 ml-4 mr-6">
          {/* Total Candidate Card with increased height */}
          <div
            className="border border-white p-4 rounded-lg flex justify-between items-center h-[50%]"
            style={{
              backgroundImage: `url(${backgroundImage1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="ml-1 text-[16px] font-semibold">Total Candidate</h3>
              <p className="ml-1 text-[14px] text-[#A09E9E]">For the entire period</p>
            </div>
            <p className="text-[36px] font-semibold mr-2">1200+</p>
          </div>
          <div
            className="border border-white p-4 rounded-lg flex justify-between items-center h-[43%]"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="ml-1 text-[16px] font-semibold">Total Cost</h3>
              <p className="ml-1 text-[14px] text-[#A09E9E]">Post duration - 27 Days</p>
            </div>
            <div className="">
              <p className="text-[36px] font-semibold justify-center flex">₹3.5k</p>
              <span className="text-[12px] font-medium text-[#858585] bg-[#E5F6D2] px-2 py-1 rounded-md">
                Open 5 Aug - Close 2 Sep
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10 justify-between">
        <p className="font-semibold text-[24px] Inter">Candidate List</p>
        <div className="justify-between flex">
          <div className="mt-2 flex relative">
            <input
              type="text"
              className="outline-none rounded-full h-12 w-72 placeholder:text-[#656464] text-[16px] font-medium Inter pl-10"
              placeholder="Search Candidates"
            />
            <CiSearch className="absolute mt-[8px] ml-[8px] text-[19px]" />
            <img src={Filter} alt="" className="h-7 mt-3 ml-5" />
            <p className="mt-3 ml-1 text-[#656464] text-[16px] font-medium Inter">Filter</p>
          </div>
          <div
            className={`border rounded-lg mr-10 h-10 flex items-center justify-center px-3 py-6 ${
              isAnyCheckboxSelected
                ? "text-white"
                : "bg-gray-200 text-gray-500 border-gray-200"
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
        <div className="mt-1 mr-10 max-h-[24rem] overflow-y-auto table-container">
          <table
            className="min-w-full text-left border-separate rounded-xl"
            style={{ borderSpacing: "0 10px" }}
          >
            <thead className="sticky top-0 z-10 border border-white bg-white text-tableHead">
              <tr>
                <th className="p-4 rounded-tl-xl text-[14px] Inter font-semibold">Applied Date</th>
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="custom-checkbox h-6 w-6 appearance-none border-2 border-[#737373] rounded-md checked:border-none checked:bg-[#0072DC] focus:ring-indigo-500"
                    checked={isAllSelected}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th className="p-4 text-[14px] Inter font-semibold">Candidate Name</th>
                <th className="p-4 text-[14px] Inter font-semibold">Experience</th>
                <th className="p-4 text-[14px] Inter font-semibold">Current Company</th>
                <th className="p-4 text-[14px] Inter font-semibold">Location</th>
                <th className="p-4 text-[14px] Inter font-semibold">Key Skills</th>
                <th className="p-4 text-[14px] Inter font-semibold rounded-tr-xl"></th>
              </tr>
            </thead>

            <tbody>
              {currentCandidates.map((candidate, idx) => (
                <React.Fragment key={idx}>
                  <tr
                    className="border border-white bg-white"
                    style={{ borderTop: "none", margin: 0 }}
                  >
                    <td className="p-4 bg-[#F1F4F8] text-xl">
                      <div className="flex flex-col items-center">
                        <span className="text-[#888888] text-[14px] font-medium Inter">{candidate.date}</span>
                      </div>
                    </td>
                    <td className="p-4 rounded-l-xl">
                      <input
                        type="checkbox"
                        className="custom-checkbox h-6 w-6 appearance-none border-2 border-[#737373] rounded-md checked:border-none checked:bg-[#0072DC] focus:ring-indigo-500"
                        checked={selectedCandidates.includes(idx)}
                        onChange={() => handleCheckboxChange(idx)}
                      />
                    </td>
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={candidate.profile}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="text-black mb-[-5px] text-[14px] font-medium">{candidate.name}</p>
                        <span className="text-[#A6A6A6] text-[14px] font-medium">{candidate.role}</span>
                      </div>
                    </td>
                    <td className="p-4 text-tableBody">
                      <span className="text-[14px] font-medium">{candidate.experience}</span>
                    </td>
                    <td className="p-4 text-tableBody text-[14px] font-medium">{candidate.company}</td>
                    <td className="p-4 text-tableBody text-[14px] font-medium">{candidate.location}</td>
                    <td className="p-4 text-[#656565] text-[14px] font-medium space-x-2">
                      <SkillDisplay skills={candidate.skills} />
                    </td>
                    <td className="p-4 rounded-r-xl">
                      <button
                        className={`inline-flex items-center justify-center rounded-lg border border-[#98CDFF] hover:bg-[#E5F1FB] hover:border-[#0072DC] transition-all duration-1000 ease-in-out w-26 w-full ${
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
                          className={`text-[#0072DC] text-[16px] font-medium Inter ${
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
                    </td>
                  </tr>
                  {loadingSummary[idx] || summaryVisible[idx] ? (
                    <tr className="bg-[#F1F4F8]">
                      <td className="p-0"></td>
                      <td colSpan="7" className="p-0">
                      <div className={`relative flex flex-col px-20 py-5 rounded-lg bg-summarize_gradient opacity-[80%]`}>
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
                                <span className="text-black text-[16px] font-medium">AI Summary</span>
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
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              ))}
            </tbody>
          </table>
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