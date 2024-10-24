import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import SummarizeIcon from "../assets/summarizeIcon.png";
import SkillDisplay from "../Components/skillDisplay";
import Filter from "../assets/filter.png";

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
      <div className="flex h-[30%]">
        <div className="border border-white bg-white w-2/3 h-full ml-10 my-5 rounded-2xl"></div>
        <div className="w-[26%]">
          <div className="border border-white bg-white h-[45%] ml-4 mt-5 w-full rounded-2xl"></div>
          <div className="border border-white bg-white h-[45%] ml-4 mt-4 w-full rounded-2xl"></div>
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

        <div className="mt-2 mr-10 h-96 overflow-hidden">
          <div className="overflow-hidden">
            <table
              className="min-w-full text-left border-separate rounded-xl"
              style={{ borderSpacing: "0 10px" }}
            >
              <thead className="border border-white bg-white sticky top-0 z-10">
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
            <div className="overflow-y-auto max-h-80" style={{ direction: "rtl" }}>
              {/* Scrollbar starts on the left */}
              <div style={{ direction: "ltr" }}>
                <table
                  className="min-w-full text-left border-separate rounded-xl"
                  style={{ borderSpacing: "0 10px" }}
                >
                  <tbody className="text-gray-600">
                    {candidates.map((candidate, idx) => (
                      <tr key={idx} className="border border-white bg-white">
                        <td className="p-4 bg-[#F1F4F8] text-xl">
                          <div className="flex flex-col items-center">
                            <span className="text-base">
                              {candidate.date.dayMonth}
                            </span>
                            <span className="text-base">
                              {candidate.date.year}
                            </span>
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
                            <p className="font-medium text-gray-900">
                              {candidate.name}
                            </p>
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
    </div>
  );
};

export default ApplicantsPool;