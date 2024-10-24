import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import SummarizeIcon from "../assets/summarizeIcon.png";
import SkillDisplay from "../Components/skillDisplay";
import Filter from "../assets/filter.png";
import Meta from "../assets/meta.png";
const candidates = [
  {
    date: { dayMonth: "23 Aug", year: "/2024" },
    name: "Emma Smith",
    role: "UI/UX Designer",
    experience: "2 Years",
    company: "Google",
    location: "Bangalore",
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
    date: { dayMonth: "23 Aug", year: "/2024" },
    name: "Emma Smith",
    role: "UI/UX Designer",
    experience: "2 Years",
    company: "Google",
    location: "Bangalore",
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
    date: { dayMonth: "23 Aug", year: "/2024" },
    name: "Emma Smith",
    role: "UI/UX Designer",
    experience: "2 Years",
    company: "Google",
    location: "Bangalore",
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
    date: { dayMonth: "23 Aug", year: "/2024" },
    name: "Emma Smith",
    role: "UI/UX Designer",
    experience: "2 Years",
    company: "Google",
    location: "Bangalore",
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
];

const ApplicantsPool = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

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
      const allCandidateIndices = candidates.map((_, idx) => idx);
      setSelectedCandidates(allCandidateIndices);
    }
    setIsAllSelected(!isAllSelected);
  };

  const isAnyCheckboxSelected = selectedCandidates.length > 0;

  return (
    <div className="bg-[#F1F4F8] h-screen overflow-hidden">
      {/* job description */}
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg ">
        {/* UI/UX Designer Section styled like a separate card */}
        <div className="w-2/3 border border-white bg-white p-4 rounded-lg ">
          <div className="flex justify-between">
            <div className="flex">
              {/* Logo */}
              <div className="flex items-center">
                <img
                  src={Meta}
                  alt="Company Logo"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              {/* Job Info */}
              <div className="ml-4">
                <h2 className="text-xl font-bold">UI/UX Designer</h2>
                <p className="text-sm text-gray-500">Meta @ Noida</p>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <span>2 years</span>
                  <span className="mx-2">|</span>
                  <span>Fulltime</span>
                  <span className="mx-2">|</span>
                  <span>₹3 - 5 LPA</span>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                View Details
              </button>
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                Position Closed
              </button>
            </div>
          </div>
          <br />
          {/* Key Skills */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Key Skills:</h3>
            <div className="flex flex-wrap mt-2">
              <span className="bg-gray-200 text-sm py-1 px-2 rounded-lg mr-2 mb-2">
                User Research
              </span>
              <span className="bg-gray-200 text-sm py-1 px-2 rounded-lg mr-2 mb-2">
                Figma
              </span>
              <span className="bg-gray-200 text-sm py-1 px-2 rounded-lg mr-2 mb-2">
                Framer
              </span>
              <span className="bg-gray-200 text-sm py-1 px-2 rounded-lg mr-2 mb-2">
                Photoshop
              </span>
              <span className="bg-gray-200 text-sm py-1 px-2 rounded-lg mr-2 mb-2">
                UX
              </span>
              <span className="bg-gray-200 text-sm py-1 px-2 rounded-lg mr-2 mb-2">
                Information Architecture
              </span>
              <span className="bg-gray-200 text-sm py-1 px-2 rounded-lg mr-2 mb-2">
                Visual Design
              </span>
            </div>
          </div>
        </div>

        {/* Right Section with white borders */}
        <div className="w-1/3 space-y-4 ml-5">
          {/* Total Candidate Card with increased height */}
          <div className="border border-white bg-gradient-to-r from-purple-200 to-blue-200 p-4 rounded-lg flex justify-between items-center h-24">
            <div>
              <h3 className="text-sm text-gray-600">Total Candidate</h3>
              <p className="text-xs text-gray-500">For the entire period</p>
            </div>
            <p className="text-2xl font-bold">1200+</p>
          </div>
          {/* Total Cost Card with increased height */}
          <div className="border border-white bg-gradient-to-r from-green-200 to-yellow-200 p-4 rounded-lg flex justify-between items-center h-24">
            <div>
              <h3 className="text-sm text-gray-600">Total Cost</h3>
              <p className="text-xs text-gray-500">Post duration - 27 Days</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">₹3.5k</p>
              <p className="text-xs text-gray-500">Open 01Sep - Close 27Sep</p>
            </div>
          </div>
        </div>
      </div>

      {/* candidate list */}
      <div className="mt-10 ml-10 font-medium text-xl justify-between">
        <p className="font-semibold text-2xl">Candidate List</p>
        <div className="justify-between flex">
          <div className="mt-3 flex relative">
            <input
              type="text"
              className="outline-none rounded-full h-10 w-72 placeholder:text-black pl-10"
              placeholder="Search Candidates"
            />
            <CiSearch className="absolute ml-3 mt-2 text-2xl" />
            <img src={Filter} alt="" className="h-6 mt-2 ml-5" />
            <p className="mt-3 ml-1">Filter</p>
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
            <BsStars className="text-xl" />
            <p className="ml-1 font-semibold">
              {`Take AI Interview ${
                isAnyCheckboxSelected ? `${selectedCandidates.length}` : "0"
              }`}
            </p>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="mt-2 mr-10">
          <div className="border border-white rounded-xl">
            <table className="min-w-full text-left border-separate rounded-xl" style={{ borderSpacing: "0 10px" }}>
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  <th className="p-4 rounded-tl-xl">Applied Date</th>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
            </table>

            {/* Scrollable Table Body */}
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full text-left border-separate rounded-xl" style={{ borderSpacing: "0 10px" }}>
                <tbody className="text-gray-600">
                  {candidates.map((candidate, idx) => (
                    <tr key={idx} className="border border-white bg-white">
                      <td className="p-4 bg-[#F1F4F8] text-xl">
                        <div className="flex flex-col items-center">
                          <span className="text-base">{candidate.date.dayMonth}</span>
                          <span className="text-base">{candidate.date.year}</span>
                        </div>
                      </td>
                      <td className="p-4 rounded-l-xl">
                        <input
                          type="checkbox"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedCandidates.includes(idx)}
                          onChange={() => handleCheckboxChange(idx)}
                        />
                      </td>
                      <td className="p-4 flex items-center space-x-3">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="Profile"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{candidate.name}</p>
                          <p className="text-gray-500">{candidate.role}</p>
                        </div>
                      </td>
                      <td className="p-4">{candidate.experience}</td>
                      <td className="p-4">{candidate.company}</td>
                      <td className="p-4">{candidate.location}</td>
                      <td className="p-4 space-x-2">
                        <SkillDisplay skills={candidate.skills} />
                      </td>
                      <td className="p-4 rounded-r-xl">
                        <button className="inline-flex items-center rounded-md py-2 px-7 border border-[#98CDFF]">
                          <img
                            src={SummarizeIcon}
                            alt=""
                            className="h-5 mt-[-2px]"
                          />
                          <span className="pl-2 font-medium text-[#0072DC]">
                            Summarize
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPool;
