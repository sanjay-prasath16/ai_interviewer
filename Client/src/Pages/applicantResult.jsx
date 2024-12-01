import { useState } from "react";
import Logo from "../assets/aspireit logo.png";
import Notification from "../assets/bell-notification.svg";
import { IoSearch } from "react-icons/io5";
import Profile from "../assets/Ellipse.png";
import Arrow from "../assets/downArrow.svg";
import Gradient from "../assets/Gradient.png";
import Company from "../assets/company logo.png";
import Location from "../assets/location.png";
import Briefcase from "../assets/briefcase.png";
import Ellipse from "../assets/Ellipse.png";
import Ellipse1 from "../assets/Ellipse 2013.png";
import hamburgerBar from "../assets/hamburgerBar.png";
import Star from "../assets/star.svg";
import Card from "../Components/card";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";

const ApplicantResult = () => {
  const candidates = [
    {
      name: "John Doe",
      title: "UI/UX Designer",
      location: "New York",
      experience: 4,
      appliedDaysAgo: 2,
      src: Ellipse,
      rounds: [
        { progress: 60, name: "Round 1", description: "Technical" },
        { progress: 90, name: "Round 2", description: "HR Interview" },
      ],
    },
    {
      name: "Jane Smith",
      title: "Product Designer",
      location: "America",
      experience: 6,
      appliedDaysAgo: 5,
      src: Ellipse1,
      rounds: [
        { progress: 50, name: "Round 1", description: "Design Task" },
        { progress: 85, name: "Round 2", description: "Team Interview" },
      ],
    },
    {
      name: "Alice Johnson",
      title: "Graphic Designer",
      location: "Austin",
      experience: 3,
      appliedDaysAgo: 10,
      src: Ellipse,
      rounds: [
        { progress: 30, name: "Round 1", description: "Portfolio Review" },
        { progress: 70, name: "Round 2", description: "Technical Round" },
      ],
    },
    {
      name: "Bob Williams",
      title: "Interaction Designer",
      location: "Chicago",
      experience: 7,
      appliedDaysAgo: 1,
      src: Ellipse1,
      rounds: [
        { progress: 80, name: "Round 1", description: "Technical" },
        { progress: 95, name: "Round 2", description: "HR Interview" },
      ],
    },
    {
      name: "Emma Brown",
      title: "UX Researcher",
      location: "Boston",
      experience: 5,
      appliedDaysAgo: 7,
      src: Ellipse,
      rounds: [
        { progress: 45, name: "Round 1", description: "Research Task" },
        { progress: 88, name: "Round 2", description: "Team Interview" },
      ],
    },
    {
      name: "Charlie Green",
      title: "Visual Designer",
      location: "Seattle",
      experience: 4,
      appliedDaysAgo: 3,
      src: Ellipse1,
      rounds: [
        { progress: 55, name: "Round 1", description: "Technical" },
        { progress: 90, name: "Round 2", description: "HR Interview" },
      ],
    },
    {
      name: "Diana White",
      title: "Digital Designer",
      location: "Los Angeles",
      experience: 6,
      appliedDaysAgo: 4,
      src: Ellipse,
      rounds: [
        { progress: 35, name: "Round 1", description: "Portfolio Review" },
        { progress: 75, name: "Round 2", description: "Team Interview" },
      ],
    },
    {
      name: "Tom Black",
      title: "Lead Designer",
      location: "Miami",
      experience: 8,
      appliedDaysAgo: 6,
      src: Ellipse,
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
    <div className="bg-[#F7F7F7] overflow-hidden h-screen regular3">
      <div className="h-[60%]">
        {/* Nav bar */}
        <div className="flex bg-white py-4 px-12 mb-10 justify-between">
          <div>
            <img src={Logo} alt="" className="w-32 h-12" />
          </div>
          <div className="flex items-center">
            <div className="relative mr-[29px]">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#F4F4F4] border border-[#EBEBEB] w-[581px] h-12 rounded-full placeholder:text-black pl-4 pr-10 outline-none"
              />
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 border border-[#EBEBEB] p-1 rounded-full cursor-pointer">
                <IoSearch className="text-[#353535] w-[22px] h-[22px]" />
              </div>
            </div>
            <p className="border border-[#EBEBEB] bg-[#F4F4F4] rounded-full pl-3 pr-1 mr-[29px] pt-[9px] flex ml-4 h-12">
              <span className="pr-6">3 New Notifications</span>
              <img src={Notification} alt="" className="mx-2 w-6 h-6" />
            </p>
            <img src={Profile} alt="" className="h-11 w-11" />
            <div className="text-[#353535] text-lg font-medium font-['SF UI  Text'] leading-[18px] ml-2 mr-1 mb-1">
              Neha Yadav
            </div>
            <img src={Arrow} alt="" className="cursor-pointer" />
          </div>
        </div>
        {/* company description */}
        <div className="mx-12 relative mb-10">
          <img src={Gradient} alt="" />
          <img src={Company} alt="" className="absolute top-5 left-0" />
          <div className="bg-white -mt-5 pt-24 pl-9 pb-6 rounded-2xl">
            <div className="flex">
              <p className="font-bold text-2xl text-[#353535] mr-3">
                Senior UI/UX Designer
              </p>
              <p className="mt-2 mr-3 flex">
                <img src={Location} alt="" className="w-4 h-4 mt-1" />
                <span className="ml-0.5 text-[#979797]">Banglore</span>
              </p>
              <p className="mt-2 mr-3 flex">
                <img src={Briefcase} alt="" className="w-4 h-4 mt-1" />
                <span className="ml-0.5 text-[#979797]">3 - 5 Yrs</span>
              </p>
            </div>
            <div className="flex pt-2">
              <p className="text-[#353535]">Amazon</p>
              <p className="text-[#979797] pl-5 flex">
                <img src={Star} alt="" />
                <span className="pl-1">4.7</span>
              </p>
              <p className="pl-4 text-[#979797]">1267 review</p>
            </div>
          </div>
        </div>
      </div>
      {/* card property */}
      <div
        className=" max-h-[30%] overflow-y-auto ml-[30px]"
        style={{ direction: "rtl" }}
      >
        <div style={{ direction: "ltr" }} className="flex flex-wrap">
          {currentCandidates.map((candidate, index) => (
            <Card key={index} index={index} candidate={candidate} />
          ))}
        </div>
      </div>
      <div className="flex mt-4 items-center">
        <div className="ml-10 w-[50px] -mt-1">
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
              currentPage === pageCount - 1
                ? "cursor-default text-[#C9C9C9]"
                : ""
            }`}
            disabledClassName="cursor-default text-[#C9C9C9]"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantResult;