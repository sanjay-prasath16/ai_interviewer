import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import MagicIcon from "../assets/magicIcon.png";
import WhiteMagicIcon from "../assets/whiteMagicIcon.png";
import SummarizeIcon from "../assets/summarizeIcon.png";
import SkillDisplay from "../Components/skillDisplay";
import Filter from "../assets/filter.png";
import Meta from "../assets/meta.png";
import Profile from "../assets/emma smith.png";
import Location from "../assets/location.png";
import Briefcase from "../assets/briefcase.png";
import Securitytime from "../assets/securitytime.png";
import backgroundImage from "../assets/Rectangle 7502.png";
import backgroundImage1 from "../assets/Rectangle 7522.png";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";

const candidates = new Array(74).fill({
  date: "23 Aug / 2024",
  name: "Emma Smith",
  role: "UI/UX Designer",
  experience: "2 Years",
  company: "Google",
  location: "Bangalore",
  profile: Profile,
  skills: [
    "User Research",
    "Figma",
    "Photoshop",
    "Framer",
    "Illustrator",
    "Sketch",
    "Adobe XD",
  ],
});
// const candidates = [
//   {
//     date: "23 Aug / 2024",
//     name: "Emma Smith",
//     role: "UI/UX Designer",
//     experience: "2 Years",
//     company: "Google",
//     location: "Bangalore",
//     skills: [
//       "User Research",
//       "Figma",
//       "Photoshop",
//       "Framer",
//       "Illustrator",
//       "Sketch",
//       "Adobe XD",
//       "InVision",
//     ],
//   },
//   {
//     date: "23 Aug / 2024",
//     name: "Emma Smith",
//     role: "UI/UX Designer",
//     experience: "2 Years",
//     company: "Google",
//     location: "Bangalore",
//     skills: [
//       "User Research",
//       "Figma",
//       "Photoshop",
//       "Framer",
//     ],
//   },
//   {
//     date: "23 Aug / 2024",
//     name: "Emma Smith",
//     role: "UI/UX Designer",
//     experience: "2 Years",
//     company: "Google",
//     location: "Bangalore",
//     skills: [
//       "User Research",
//       "Figma",
//       "Photoshop",
//       "Framer",
//       "Illustrator",
//       "Sketch",
//     ],
//   },
//   {
//     date: "23 Aug / 2024",
//     name: "Emma Smith",
//     role: "UI/UX Designer",
//     experience: "2 Years",
//     company: "Google",
//     location: "Bangalore",
//     skills: [
//       "User Research",
//       "Figma",
//       "Photoshop",
//       "Framer",
//       "Illustrator",
//       "Sketch",
//       "Adobe XD",
//       "InVision",
//     ],
//   },
// ];

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
    <div className="bg-[#F1F4F8] h-screen overflow-hidden regular3">
      {/* job description */}
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg ml-8">
        {/* UI/UX Designer Section styled like a separate card */}
        <div className="w-3/4 border border-white bg-white pt-4 pb-4 pr-4 rounded-lg ">
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
                <h2 className="text-xl font-bold">UI/UX Designer</h2>
                <p className=" flex text-sm text-gray-500">
                  Meta |
                  <img className="h-4" src={Location} alt="" /> Noida
                </p>
                <div className="flex items-center text-sm text-gray-600">
                  <img className="h-4" src={Briefcase} alt="" />
                  <span>2 years</span>
                  <span className="mx-2">|</span>
                  <img className="h-4" src={Securitytime} alt="" />
                  <span>Fulltime</span>
                  <span className="mx-2">|</span>
                  <span>₹3 - 5 LPA</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 -mt-10">
              <button
                className="py-2 px-2 rounded-md border border-[#0072DC] h-12 w-28"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0072DC",
                }}
              >
                View Details
              </button>
              <button
                className="py-2 px-2 rounded-md h-12 w-32"
                style={{ backgroundColor: "#C4C4C4", color: "#FFFFFF" }}
              >
                Position Closed
              </button>
            </div>
          </div>
          <div className="mt-4 ml-4 ">
            <h3 className="text-sm font-semibold ml-2">Key Skills:</h3>
            <div className="flex flex-wrap mt-2">
              <span className="bg-[#F3F3F3] text-sm text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                User Research
              </span>
              <span className="bg-[#F3F3F3] text-sm text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Figma
              </span>
              <span className="bg-[#F3F3F3] text-sm text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Framer
              </span>
              <span className="bg-[#F3F3F3] text-sm text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Photoshop
              </span>
              <span className="bg-[#F3F3F3] text-sm text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                UX
              </span>
              <span className="bg-[#F3F3F3] text-sm text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Information Architecture
              </span>
              <span className="bg-[#F3F3F3] text-sm text-[#656565] py-1 px-2 rounded-lg mr-0.5 mb-2">
                Visual Design
              </span>
            </div>
          </div>
        </div>

        {/* Right Section with white borders */}
        <div className="w-96 space-y-4 ml-4 mr-6">
          {/* Total Candidate Card with increased height */}
          <div
            className="border border-white p-4 rounded-lg flex justify-between items-center h-24"
            style={{
              backgroundImage: `url(${backgroundImage1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="ml-1 text-sm font-semibold">Total Candidate</h3>
              <p className="ml-1 text-xs text-gray-500">For the entire period</p>
            </div>
            <p className="text-2xl font-semibold mr-8">1200+</p>
          </div>
          <div
            className="border border-white p-4 rounded-lg flex justify-between items-center h-24"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="ml-1 text-sm font-semibold">Total Cost</h3>
              <p className="ml-1 text-xs text-gray-500">Post duration - 27 Days</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold mr-10">₹3.5k</p>
              <span className="text-xs text-gray-500 bg-[#E5F6D2] px-2 py-1 rounded-md">
                Open 5Aug - Close 2Sep
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10 justify-between">
        <p className="font-semibold text-2xl">Candidate List</p>
        <div className="justify-between flex">
          <div className="mt-2 flex relative">
            <input
              type="text"
              className="outline-none rounded-full h-10 w-72 placeholder:text-[#656464] pl-10"
              placeholder="Search Candidates"
            />
            <CiSearch className="absolute ml-3 mt-2 text-2xl" />
            <img src={Filter} alt="" className="h-5 mt-3 ml-5" />
            <p className="mt-3 ml-1 text-[#656464]">Filter</p>
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
              <img src={WhiteMagicIcon} alt="" className="h-6" />
            ) : (
              <img src={MagicIcon} alt="" className="h-5" />
            )}
            <p className="ml-1 font-regular">
              {`Take AI Interview ${
                isAnyCheckboxSelected ? `${selectedCandidates.length}` : "0"
              }`}
            </p>
          </div>
        </div>
        <div className="mt-1 mr-10 h-72 overflow-y-auto table-container">
          <table
            className="min-w-full text-left border-separate rounded-xl"
            style={{ borderSpacing: "0 10px" }}
          >
            <thead className="sticky top-0 z-10 border border-white bg-white text-tableHead">
              <tr>
                <th className="p-4 rounded-tl-xl">Applied Date</th>
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="custom-checkbox h-6 w-6 appearance-none border-2 border-[#737373] rounded-md checked:border-none checked:bg-[#0072DC] focus:ring-indigo-500"
                    checked={isAllSelected}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th className="p-4">Candidate Name</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Current Company</th>
                <th className="p-4">Location</th>
                <th className="p-4">Key Skills</th>
                <th className="p-4 rounded-tr-xl"></th>
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
                      <div className="flex flex-col items-center text-[14px]">
                        <span className="text-[#888888]">{candidate.date}</span>
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
                        <p className="text-black mb-[-5px]">{candidate.name}</p>
                        <span className="text-[#A6A6A6]">{candidate.role}</span>
                      </div>
                    </td>
                    <td className="p-4 text-tableBody">
                      {candidate.experience}
                    </td>
                    <td className="p-4 text-tableBody">{candidate.company}</td>
                    <td className="p-4 text-tableBody">{candidate.location}</td>
                    <td className="p-4 text-[#656565] space-x-2">
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
                            className={`h-5 mt-[-2px]`}
                          />
                        )}
                        <span
                          className={`text-[#0072DC] ${
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
                              <p className="text-sm pl-3 font-semibold flex border border-white bg-white rounded-lg opacity-5 p-1 w-40">
                                <img
                                  src={SummarizeIcon}
                                  alt=""
                                  className="h-5"
                                />
                                <span className="text-black">
                                  AI Summarizing...
                                </span>
                              </p>
                              <div className="loading-rectangle opacity-50 mt-3"></div>
                              <div className="loading-rectangle opacity-50"></div>
                              <div className="loading-rectangle opacity-50"></div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-semibold flex justify-center border border-white/10 bg-white/40 rounded-lg p-1 w-[17%]">
                                <img
                                  src={SummarizeIcon}
                                  alt=""
                                  className="h-5"
                                />
                                <span className="text-black">AI Summary</span>
                              </p>
                              <p className="text-sm mt-3 text-justify">
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