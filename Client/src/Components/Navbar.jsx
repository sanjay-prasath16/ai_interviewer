import { useState, useEffect, useRef } from "react";
import Logo from '../assets/CompanyLogo.svg';
import profile from "../assets/Ellipse 1872.svg";
import PropTypes from "prop-types";

const Navbar = ({ assistant, onLiylaActivate }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isFocused1, setisFocused1] = useState(false);
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearch = (e) => {
    setSearchPhrase(e.target.value);
  };

  useEffect(() => {
    if (isFocused1 === false) {
      setSearchPhrase("");
    }
  }, [isFocused1]);

  return (
    <div className="NavBar w-full mx-[auto] h-[68px] min-h-[42px] px-8 bg-white border border-[#D2D2D2] backdrop-blur-[220px] flex justify-between items-center hover:cursor-pointer">
      <div className="logo-container bg-[#FFF]">
        <div className="logo flex justify-center items-center gap-[0.3vw]">
          <img
            className="Aspireit h-[42px] w-[130px]"
            src={Logo}
          />
        </div>
      </div>
      <div className="SearchBarContainer w-full flex grow justify-center items-center gap-4 bg-none">
        <div className="InputContainer w-[90%] flex justify-start items-center gap-4 h-[44px] min-h-[24px] max-w-[60%] pl-6 pr-6 pt-4 pb-4 bg-[#EBEBEB] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[32px]">
          <div className="searchBar inline-flex items-center h-[5vh] w-full max-w-[657px] bg-[#EBEBEB]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              fill="none"
              className={`w-[3vh] h-[3vh] shrink-0 rounded-full mr-1 ${
                isFocused1
                  ? "transform scale-110 transition-transform duration-300"
                  : ""
              }`}
            >
              <path
                d="M9.49996 2.75C8.16495 2.75 6.85991 3.14588 5.74989 3.88757C4.63986 4.62927 3.7747 5.68347 3.26381 6.91686C2.75292 8.15026 2.61925 9.50745 2.8797 10.8168C3.14015 12.1262 3.78302 13.3289 4.72702 14.2729C5.67102 15.2169 6.87375 15.8598 8.18311 16.1202C9.49248 16.3807 10.8497 16.247 12.0831 15.7361C13.3165 15.2252 14.3707 14.3601 15.1124 13.25C15.854 12.14 16.2499 10.835 16.2499 9.49996C16.2498 7.70979 15.5386 5.99298 14.2728 4.72714C13.0069 3.46131 11.2901 2.75011 9.49996 2.75Z"
                stroke="#353535"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                d="M14.666 14.668L18.3327 18.3346"
                stroke="#353535"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="justify-start px-2 w-full max-w-[657px] text-[#353535] py-[0.5vh] text-[2vh] leading-[18px] border-0 bg-[#EBEBEB] focus:outline-none placeholder:text-[#353535]"
              onClick={focusInput}
              type="text"
              name="searchBar"
              value={isFocused1 ? searchPhrase : ""}
              onChange={handleSearch}
              onFocus={() => setisFocused1(true)}
              onBlur={() => setisFocused1(false)}
              placeholder="Search"
              ref={inputRef}
            />
          </div>
        </div>
      </div>

      <div className="Frame1000008205 flex justify-start items-center w-fit gap-[1vw] bg-none">
        <div className="Frame1000008204 px-[2vh] py-[2px] bg-[#EBEBEB] flex justify-start items-center shadow-[0px_0px_6px_rgba(0,_0,_0,_0.25)] rounded-[40px] backdrop-blur-[4px]">
          <div className="ButtonsNotification w-[5vh] min-w-[24px] h-[5vh] min-h-[24px] mr-[1.5vh] relative bg-[#EBEBEB]">
            <div className="Ellipse w-[5vh] h-[5vh] min-w-[24px] min-h-[24px] absolute left-0 top-0 bg-white rounded-full" />
            <div className="IconsBell w-[4vh] h-[4vh] min-w-[18px] min-h-[18px] absolute left-[1vh] top-[1vh] bg-none hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="w-[3vh] h-[3vh] min-w-[16px] min-h-[16px]"
              >
                <path
                  d="M21 6.50001C21 8.43001 19.43 10 17.5 10C15.57 10 14 8.43001 14 6.50001C14 4.57001 15.57 3.00001 17.5 3.00001C19.43 3.00001 21 4.57001 21 6.50001ZM19 11.79C18.5 11.92 18 12 17.5 12C16.0421 11.9974 14.6447 11.4171 13.6138 10.3862C12.583 9.3553 12.0026 7.95788 12 6.50001C12 5.03001 12.58 3.70001 13.5 2.71001C13.3185 2.48755 13.0897 2.30838 12.8302 2.18555C12.5707 2.06272 12.2871 1.99934 12 2.00001C10.9 2.00001 10 2.90001 10 4.00001V4.29001C7.03 5.17001 5 7.90001 5 11V17L3 19V20H21V19L19 17V11.79ZM12 23C13.11 23 14 22.11 14 21H10C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23Z"
                  fill="#0072DC"
                />
              </svg>
            </div>
          </div>
          <div className="Profile flex justify-end items-center bg-[#EBEBEB] hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300">
            <img
              className="AvatarPic w-[5vh] min-w-[24px] bg-none rounded-full"
              src={profile}
            />
          </div>
        </div>
        <div className="Ai w-[4.5vw] min-w-[42px] bg-none">
          <img
            className="Layila h-[7.5vh] bg-none rounded-full hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300"
            src={assistant}
            onClick={onLiylaActivate}
          />
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  assistant: PropTypes.string.isRequired,
  onLiylaActivate: PropTypes.func.isRequired,
};

export default Navbar;