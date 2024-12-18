import { useState } from "react";
import Logo from "../assets/aspireit logo.png";
import Notification from "../assets/bell-notification.svg";
import { IoSearch } from "react-icons/io5";
import Profile from "../assets/Ellipse.png";
import Arrow from "../assets/downArrow.svg";
import Company from "../assets/company logo.png";
import Location from "../assets/location.svg";
import Briefcase from "../assets/briefcase.svg";
import Sanjay from "../assets/sanjay.jpeg";
import Mukesh from "../assets/mukesh.jpeg";
import Debaleena from "../assets/debaleena.jpg";
import Manjeet from "../assets/manjeet.jpeg";
import Priyansh from "../assets/priyansh.jpg";
import Bieden from "../assets/bieden.jpeg";
import Joe from "../assets/joe.jpeg";
import Rajan from "../assets/rajan.jpg";
import hamburgerBar from "../assets/hamburgerBar.png";
import Star from "../assets/star.svg";
import Card from "../Components/card";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";

const ApplicantResult = () => {
  const candidates = [
    {
      name: "Sanjay Prasath",
      title: "MERN Stack",
      location: "India",
      experience: 12,
      appliedDaysAgo: 15,
      src: Sanjay,
      rounds: [
        { progress: 85, name: "Round 1", description: "Technical" },
        { progress: 95, name: "Round 2", description: "HR Interview" },
      ],
    },
    {
      name: "Mukesh",
      title: "React developer",
      location: "America",
      experience: 6,
      appliedDaysAgo: 13,
      src: Mukesh,
      rounds: [
        { progress: 20, name: "Round 1", description: "Design Task" },
        { progress: 35, name: "Round 2", description: "Team Interview" },
      ],
    },
    {
      name: "Debaleena",
      title: "UI/UX designer",
      location: "Austin",
      experience: 8,
      appliedDaysAgo: 10,
      src: Debaleena,
      rounds: [
        { progress: 60, name: "Round 1", description: "Portfolio Review" },
        { progress: 90, name: "Round 2", description: "Technical Round" },
      ],
    },
    {
      name: "Manjeet",
      title: "MERN Stack",
      location: "Chicago",
      experience: 12,
      appliedDaysAgo: 1,
      src: Manjeet,
      rounds: [
        { progress: 60, name: "Round 1", description: "Technical" },
        { progress: 75, name: "Round 2", description: "HR Interview" },
      ],
    },
    {
      name: "Priyansh",
      title: "React Devloper",
      location: "Boston",
      experience: 12,
      appliedDaysAgo: 7,
      src: Priyansh,
      rounds: [
        { progress: 45, name: "Round 1", description: "Research Task" },
        { progress: 88, name: "Round 2", description: "Team Interview" },
      ],
    },
    {
      name: "Joe",
      title: "Visual Designer",
      location: "Seattle",
      experience: 4,
      appliedDaysAgo: 3,
      src: Joe,
      rounds: [
        { progress: 55, name: "Round 1", description: "Technical" },
        { progress: 90, name: "Round 2", description: "HR Interview" },
      ],
    },
    {
      name: "Bieden",
      title: "Digital Designer",
      location: "Bieden",
      experience: 6,
      appliedDaysAgo: 4,
      src: Bieden,
      rounds: [
        { progress: 35, name: "Round 1", description: "Portfolio Review" },
        { progress: 75, name: "Round 2", description: "Team Interview" },
      ],
    },
    {
      name: "Rajan",
      title: "Lead Designer",
      location: "Miami",
      experience: 8,
      appliedDaysAgo: 6,
      src: Rajan,
      rounds: [
        { progress: 70, name: "Round 1", description: "Technical" },
        { progress: 100, name: "Round 2", description: "Final Round" },
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const candidatesPerPage = 6;
  const pageCount = Math.ceil(candidates.length / candidatesPerPage);

  const currentCandidates = candidates.slice(
    currentPage * candidatesPerPage,
    (currentPage + 1) * candidatesPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="bg-[#F7F7F7] h-screen flex flex-col">
      {/* Navbar */}
      <div className="h-[10%] flex bg-white py-4 px-12 justify-between mb-[20px]">
        <div className="items-center flex">
          <img src={Logo} alt="Logo" className="w-[130px] h-[46px]" />
        </div>
        <div className="flex items-center">
          <div className="relative mr-[29px]">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#F4F4F4] border border-[#EBEBEB] w-[581px] h-[46px] rounded-full placeholder:text-black text-[14px] font-medium pl-4 pr-10 outline-none"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2 border border-[#EBEBEB] p-1 rounded-full cursor-pointer">
              <IoSearch className="text-[#353535] w-[22px] h-[22px]" />
            </div>
          </div>
          <p className="border border-[#EBEBEB] bg-[#F4F4F4] rounded-full pl-3 pr-1 mr-[29px] flex h-[46px] justify-center items-center">
            <span className="pr-6 text-[14px]">3 New Notifications</span>
            <img src={Notification} alt="Notification" className="mx-2 w-6 h-6" />
          </p>
          <img src={Profile} alt="Profile" className="h-11 w-11" />
          <div className="text-[#353535] text-[18px] font-medium leading-[18px] ml-2 mr-1 mb-1">
            Neha Yadav
          </div>
          <img src={Arrow} alt="Arrow" className="cursor-pointer" />
        </div>
      </div>

      {/* Company Description */}
      <div className="h-[45%] px-12 relative">
        <div className="relative h-[40%]">
          <div className="h-full w-full bg-gradient-to-b from-[#FEC4CB] via-[#F4C8EF] to-[#F4C8EF] rounded-[20px]"></div>
          <img src={Company} alt="Company Logo" className="absolute top-[100%] left-0 transform -translate-y-1/2" />
        </div>
        <div className="bg-white -mt-5 pb-6 rounded-[32px] rounded-t-none h-[50%] pt-[65px] pl-[40px] justify-center flex flex-col">
          <div className="flex">
            <p className="font-bold text-[24px] text-[#353535] mr-3">
              Senior UI/UX Designer
            </p>
            <p className="mt-3 mr-3 flex">
              <img src={Location} alt="Location" className="w-5 h-5 mt-1" />
              <span className="ml-0.5 text-[#979797] text-[14px]">Bangalore</span>
            </p>
            <div className="flex items-center mr-[6px]">
              <div className="border border-[#979797] rounded-full h-[4px] w-[4px] bg-[#979797]"></div>
            </div>
            <p className="mt-3 mr-3 flex">
              <img src={Briefcase} alt="Briefcase" className="w-5 h-5 mt-1" />
              <span className="ml-0.5 text-[#979797] text-[14px]">3 - 5 Yrs</span>
            </p>
          </div>
          <div className="flex pt-2">
            <p className="text-[#353535] text-[18px]">Amazon</p>
            <p className="text-[#979797] pl-5 flex">
              <img src={Star} alt="Star" className="w-6 h-6 mt-1" />
              <span className="pl-1 pr-2 text-[16px]">4.7</span>
            </p>
            <p className="pl-4 text-[#979797] text-[16px]">1267 reviews</p>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="h-[30%] overflow-y-auto ml-[30px]" style={{ direction: "rtl" }}>
        <div className="h-full flex flex-wrap" style={{ direction: "ltr" }}>
          {currentCandidates.map((candidate, index) => (
            <Card key={index} index={index} candidate={candidate} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="h-[15%] flex items-center">
        <div className="ml-10 w-[50px]">
          <img src={hamburgerBar} alt="Hamburger menu" />
        </div>
        <div className="flex-grow flex justify-center">
          <ReactPaginate
            previousLabel={<SlArrowLeft />}
            nextLabel={<SlArrowRight />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex items-center"}
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
    </div>
  );
};

export default ApplicantResult;