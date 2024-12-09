import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import image5 from "../assets/Edit.svg";
import whiteMagic from "../assets/whiteMagicIcon.svg";
import Liyla from "../assets/Type=Layila.svg";
import timer from "../assets/Timer.svg";
import edit from "../assets/Edit.svg";
import shield from "../assets/Shield.svg";
import Navbar from "../Components/Navbar";

const AfterSelection = () => {
  const items = [
    {
      title: "Unique Question Sets",
      description: "Tailored questions for authenticity",
      icon: "https://s3-alpha-sig.figma.com/img/0ada/0b19/29f4e3cd9705c3665842a066214dad2c?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YZiaRTwn1WrTuNlSNFqg59ZqJlM4Of~CzcjbV4uANul3-b5Y6sKS9HHKvuznTyB8a7UVDA0x52fxnboB~KDonFLSCz5Boeiyu6RGuYheesFYnmbDvsi65zeuG-LPwFmMFDxmcF2eOniH5ivycbNwhZfasJKnnKIFYyNhPuE9bB30vdSUa6Lf2wqLW6lWZkx1dRvzCFif6tgDyiVIgYcTdVguwlMfUpcqMo7NDPbiR4cVUJJgsNhK5anoihmarPGP1q7ft2t-B4Fim33vYwJGyfFUTFQbKLWRBkwg8d75laN0RwcVDamzheTKyXQq7kLIJR7UNQu74S52LElLH6U7vg__",
    },
    {
      title: "Multilingual Interviews",
      description: "Assess in any language",
      icon: "https://s3-alpha-sig.figma.com/img/9c7b/c700/7f7ea02700f5dacd86d8ae0cb3f8d7c2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mkmF7WkmHicxRnGuK3Np4eUH67~MbliKRmdwnh6pg09vHnLsWBuxsKx~-wPZT3YjzcjUFl85D7MeCTQPWRZ8vsfCRdN8IEaONvXl3HBQcNJxLiKNc85fbbXgo5fkWjcroBCcFFf~4CDyVF78e0iayFY8UOSFFrNo2Y4tBTsaOZz1JUfdkML8M~C9CWVdlHjgdcsOvOv-HrtHKeKZW7AvNOPRRxgB7L3gJ-JvF~stg-XvWC3nfFPuyI3RoHQnrhih-vSN5PzvRMMy3IUGxHl~cCgXvsaz4GPmiFA1-3HdfI5vWarn7ohrQrPaETAtGUoCqQCt2zj5~LboFOHcsl1C8w__",
    },
    {
      title: "Bulk Invitations",
      description: "Invite multiple candidates",
      icon: "https://s3-alpha-sig.figma.com/img/566b/7ce5/9af10d3068323170cfcefd4a38402623?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TZhW5~sN1oAVAPxKc3R6LIdsx11N3tbR9iPRUklLp2JkwmScUcZhILbNhqtZ~kAVsK6Lu05fDguIQ1jIbH~gvZ5CHii8bNVVLjrlPRE14piRFOv54-xFWsaADklexRKoEfxuBQ0qC7GlUYj9oXIb790ZGICAaKi8mV5UhgpCrwaiSG5j3y2jvhWSrORGTZNfOLeMEJj8EBRD78nLeU18jjvYAnMtX2oePJ3LFYWaHJ0a-z0W3yoeEcQkZNnEtx5FUbZ~ZONVh~0LJGR6fC7qvt5AXu4Wew86NjKpavTyb7wyKFqdmG3Ib3xyhnY9JDd6CUhqPBtpXjYAcFc0Zxj8zw__",
    },
    {
      title: "Advanced Analytics",
      description: "Insights into performance",
      icon: "https://s3-alpha-sig.figma.com/img/0ada/0b19/29f4e3cd9705c3665842a066214dad2c?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YZiaRTwn1WrTuNlSNFqg59ZqJlM4Of~CzcjbV4uANul3-b5Y6sKS9HHKvuznTyB8a7UVDA0x52fxnboB~KDonFLSCz5Boeiyu6RGuYheesFYnmbDvsi65zeuG-LPwFmMFDxmcF2eOniH5ivycbNwhZfasJKnnKIFYyNhPuE9bB30vdSUa6Lf2wqLW6lWZkx1dRvzCFif6tgDyiVIgYcTdVguwlMfUpcqMo7NDPbiR4cVUJJgsNhK5anoihmarPGP1q7ft2t-B4Fim33vYwJGyfFUTFQbKLWRBkwg8d75laN0RwcVDamzheTKyXQq7kLIJR7UNQu74S52LElLH6U7vg__",
    },
    {
      title: "Custom Questions",
      description: "Fully customizable interviews",
      icon: "https://s3-alpha-sig.figma.com/img/9c7b/c700/7f7ea02700f5dacd86d8ae0cb3f8d7c2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mkmF7WkmHicxRnGuK3Np4eUH67~MbliKRmdwnh6pg09vHnLsWBuxsKx~-wPZT3YjzcjUFl85D7MeCTQPWRZ8vsfCRdN8IEaONvXl3HBQcNJxLiKNc85fbbXgo5fkWjcroBCcFFf~4CDyVF78e0iayFY8UOSFFrNo2Y4tBTsaOZz1JUfdkML8M~C9CWVdlHjgdcsOvOv-HrtHKeKZW7AvNOPRRxgB7L3gJ-JvF~stg-XvWC3nfFPuyI3RoHQnrhih-vSN5PzvRMMy3IUGxHl~cCgXvsaz4GPmiFA1-3HdfI5vWarn7ohrQrPaETAtGUoCqQCt2zj5~LboFOHcsl1C8w__",
    },
    {
      title: "Secure Data",
      description: "Built with privacy in mind",
      icon: "https://s3-alpha-sig.figma.com/img/566b/7ce5/9af10d3068323170cfcefd4a38402623?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TZhW5~sN1oAVAPxKc3R6LIdsx11N3tbR9iPRUklLp2JkwmScUcZhILbNhqtZ~kAVsK6Lu05fDguIQ1jIbH~gvZ5CHii8bNVVLjrlPRE14piRFOv54-xFWsaADklexRKoEfxuBQ0qC7GlUYj9oXIb790ZGICAaKi8mV5UhgpCrwaiSG5j3y2jvhWSrORGTZNfOLeMEJj8EBRD78nLeU18jjvYAnMtX2oePJ3LFYWaHJ0a-z0W3yoeEcQkZNnEtx5FUbZ~ZONVh~0LJGR6fC7qvt5AXu4Wew86NjKpavTyb7wyKFqdmG3Ib3xyhnY9JDd6CUhqPBtpXjYAcFc0Zxj8zw__",
    },
  ];

  const [selected, setSelected] = useState("nonTechnical");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth <= 640) {
        setCardsPerSlide(1);
      } else if (window.innerWidth <= 768) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerSlide >= items.length ? 0 : prevIndex + cardsPerSlide
    );
  };

  const [openDifficulty, setOpenDifficulty] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState();

  const handleSelection = (level) => {
    setSelectedLevel(level);
    setOpenDifficulty(false);
  };

  const toggleDialogDifficulty = () => {
    setOpenDifficulty(!openDifficulty);
  };

  const [openDuration, setOpenDuration] = useState(false);
  const [duration, setDuration] = useState();

  const options = [
    { value: "60", label: "60 sec" },
    { value: "90", label: "90 sec" },
    { value: "120", label: "120 sec" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#EBEBEB",
      borderColor: "#EBEBEB",
      color: "#161616",
      height: "48px",
      width: "full",
      minWidth: "520px",
      fontSize: "18px",
      fontWeight: "600",
      boxShadow: "none",
      display: "flex",
      justifySelf: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingRight: "35px",
      ":hover": {
        borderColor: "#EBEBEB",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      width: "20px",
      height: "20px",
      position: "absolute",
      color: "#0072DC",
      top: "30%",
      right: "15px",
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed",
      backgroundColor: "#D7D7D7",
      border: "1px solid #EBEBEB",
      borderRadius: "4px",
      zIndex: 999,
      top: "auto",
      left: "auto",
      fontSize: "18px",
      maxWidth: "520px",
      maxHeight: "300px",
      overflowY: "auto",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#161616",
      fontWeight: "400",
      fontSize: "18px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#161616",
      fontSize: "18px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#C3C3EA" : "#D7D7D7",
      color: "#161616",
      fontWeight: state.isSelected ? "600" : "400",
      padding: "10px 20px",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#EBEBEB",
      },
    }),
  };

  const toggleDialogDuration = () => {
    setOpenDuration(!openDuration);
  };

  const handleChangeDuration = (selectedOption) => {
    setDuration(selectedOption.value);
    toggleDialogDuration();
  };

  const [openQuestions, setOpenQuestions] = useState(false);
  const [questions, setQuestions] = useState(["", "", ""]);
  const [questionsList, setQuestionsList] = useState([]);
  const [focusedInputs, setFocusedInputs] = useState(
    new Array(questions.length).fill(false)
  );

  const handleFocus = (index) => {
    const newFocusState = [...focusedInputs];
    newFocusState[index] = true;
    setFocusedInputs(newFocusState);
  };

  const handleBlur = (index) => {
    const newFocusState = [...focusedInputs];
    newFocusState[index] = false;
    setFocusedInputs(newFocusState);
  };

  const toggleDialogQuestions = () => {
    if (openQuestions) {
      if (questions.every((q) => q.trim() === "")) {
        setQuestions(["", "", ""]);
      }
    }
    setOpenQuestions(!openQuestions);
  };

  const handleInputChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleSaveQuestions = () => {
    setQuestionsList([...questions.filter((q) => q.trim() !== "")]);

    toggleDialogQuestions();
  };

  return (
    <div className=".main-container min-h-screen bg-[#F1F4F8]">
      <Navbar assistant={Liyla} />
      <div className="flex flex-col justify-center items-center">
        <div
          className="LetsGetYouStarted text-center text-[36px] font-bold leading-[56px] 
      text-[#D388FF] break-words text-transparent w-[900px]"
          style={{
            background:
              "linear-gradient(325deg, #D388FF 21.06%, #4B94F6 83.52%)",
            backgroundClip: "text",
          }}
        >
          {`Let's get you started with scheduling your AI interview`}
        </div>

        <div className="YouHaveSelected1024CandidatesForInterview w-[908px] text-center">
          <span className=" text-[#161616] text-[20px] font-[400] leading-[1.2] break-words">
            You have selected
          </span>
          <span className="text-[#161616] text-[20px] font-[600] leading-[1.2] break-words">
            &nbsp;
          </span>
          <span className="text-[#0072DC] text-[20px] font-[600] leading-[1.2] break-words">
            1024 candidates
          </span>
          &nbsp;
          <span className=" text-[#161616] text-[20px] font-[400] leading-[1.2] break-words">
            for interview.
          </span>
        </div>

        <div>
          <div className="toogleContainer w-fit flex bg-gray-200 rounded-full p-1 space-x-4 mt-8">
            {/* Non-Technical Button */}

            <button
              className={`w-[322px] h-[48px] text-[18px] flex items-center justify-center rounded-full font-medium transition duration-300 ease-in-out ${
                selected === "nonTechnical"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white focus:outline-none border-none"
                  : "bg-white text-gray-700 focus:outline-none border-none"
              }`}
              onClick={() => setSelected("nonTechnical")}
            >
              {selected === "nonTechnical" ? (
                <svg
                  className="toogleIcon w-[26px] h-[28.545px] mr-[10px] bg-none"
                  width="26"
                  height="30"
                  viewBox="0 0 26 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0233 7.54762C13.2639 6.89742 14.1835 6.89742 14.4241 7.54762L16.4602 13.05C16.6871 13.6633 17.1706 14.1468 17.7839 14.3737L23.2863 16.4098C23.9365 16.6504 23.9365 17.57 23.2863 17.8106L17.7839 19.8467C17.1706 20.0736 16.6871 20.5571 16.4602 21.1704L14.4241 26.6727C14.1835 27.3229 13.2639 27.3229 13.0233 26.6727L10.9872 21.1704C10.7603 20.5571 10.2768 20.0736 9.66352 19.8467L4.16114 17.8106C3.51094 17.57 3.51095 16.6504 4.16115 16.4098L9.66352 14.3737C10.2768 14.1468 10.7603 13.6633 10.9872 13.05L13.0233 7.54762Z"
                    fill="white"
                  />
                  <path
                    d="M22.4776 19.15C22.5979 18.8249 23.0577 18.8249 23.178 19.15L23.5786 20.2325C23.6164 20.3347 23.697 20.4153 23.7992 20.4531L24.8817 20.8537C25.2068 20.974 25.2068 21.4338 24.8817 21.5541L23.7992 21.9546C23.697 21.9925 23.6164 22.073 23.5786 22.1752L23.178 23.2577C23.0577 23.5828 22.5979 23.5828 22.4776 23.2577L22.0771 22.1752C22.0392 22.073 21.9587 21.9925 21.8564 21.9546L20.774 21.5541C20.4489 21.4338 20.4489 20.974 20.774 20.8537L21.8564 20.4531C21.9587 20.4153 22.0392 20.3347 22.0771 20.2325L22.4776 19.15Z"
                    fill="white"
                  />
                  <path
                    d="M6.1654 2.22633C6.40599 1.57613 7.32563 1.57613 7.56622 2.22633L8.36089 4.3739C8.43654 4.57832 8.59771 4.7395 8.80213 4.81514L10.9497 5.60981C11.5999 5.85041 11.5999 6.77004 10.9497 7.01064L8.80213 7.80531C8.59771 7.88095 8.43654 8.04213 8.36089 8.24655L7.56622 10.3941C7.32563 11.0443 6.40599 11.0443 6.1654 10.3941L5.37072 8.24655C5.29508 8.04213 5.13391 7.88095 4.92949 7.80531L2.78192 7.01064C2.13172 6.77004 2.13172 5.85041 2.78192 5.60981L4.92949 4.81514C5.13391 4.7395 5.29508 4.57832 5.37072 4.3739L6.1654 2.22633Z"
                    fill="white"
                  />
                  <path
                    d="M19.8153 5.31396L20.5782 7.37565C20.6916 7.68228 20.9334 7.92404 21.24 8.0375L23.3017 8.80039L21.24 9.56328C20.9334 9.67674 20.6916 9.9185 20.5782 10.2251L19.8153 12.2868L19.0524 10.2251C18.9389 9.9185 18.6972 9.67674 18.3905 9.56328L16.3289 8.80039L18.3905 8.0375C18.6972 7.92404 18.9389 7.68228 19.0524 7.37564L19.8153 5.31396Z"
                    fill="white"
                  />
                  <path
                    d="M6.87154 21.5679C7.13433 21.3418 7.53653 21.5647 7.48418 21.9074L7.20733 23.7196C7.19087 23.8273 7.2223 23.9369 7.29337 24.0195L8.48888 25.4093C8.71494 25.6721 8.49207 26.0743 8.1494 26.022L6.33716 25.7451C6.22943 25.7287 6.11988 25.7601 6.03726 25.8312L4.64744 27.0267C4.38464 27.2527 3.98245 27.0299 4.0348 26.6872L4.31165 24.875C4.32811 24.7672 4.29668 24.6577 4.22561 24.575L3.03009 23.1852C2.80404 22.9224 3.02691 22.5202 3.36958 22.5726L5.18181 22.8494C5.28955 22.8659 5.3991 22.8345 5.48172 22.7634L6.87154 21.5679Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  className="toogleIcon w-[26px] h-[28.545px] mr-[10px] bg-none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="27"
                  viewBox="0 0 23 27"
                  fill="none"
                >
                  <path
                    d="M19.7981 17.4842C19.9592 17.0489 20.5749 17.0489 20.736 17.4842L20.9226 17.9886C20.9733 18.1255 21.0812 18.2334 21.2181 18.284L21.7225 18.4707C22.1578 18.6318 22.1578 19.2475 21.7225 19.4085L21.2181 19.5952C21.0812 19.6459 20.9733 19.7538 20.9226 19.8906L20.736 20.3951C20.5749 20.8304 19.9592 20.8304 19.7981 20.3951L19.6115 19.8906C19.5608 19.7538 19.4529 19.6459 19.3161 19.5952L18.8116 19.4085C18.3763 19.2475 18.3763 18.6318 18.8116 18.4707L19.3161 18.284C19.4529 18.2334 19.5608 18.1255 19.6115 17.9886L19.7981 17.4842Z"
                    fill="url(#paint0_linear_13_19)"
                  />
                  <path
                    d="M4.86041 2.18043C5.20448 1.36596 6.35869 1.36596 6.70276 2.18043L7.23437 3.43885C7.33569 3.67869 7.52656 3.86956 7.7664 3.97088L9.02481 4.50248C9.83929 4.84655 9.83929 6.00077 9.02481 6.34484L7.7664 6.87645C7.52656 6.97777 7.33569 7.16863 7.23437 7.40848L6.70276 8.66689C6.35869 9.48136 5.20448 9.48136 4.86041 8.66689L4.3288 7.40848C4.22748 7.16863 4.03661 6.97777 3.79677 6.87645L2.53836 6.34484C1.72389 6.00077 1.72389 4.84655 2.53836 4.50248L3.79677 3.97088C4.03661 3.86956 4.22748 3.67869 4.3288 3.43884L4.86041 2.18043Z"
                    fill="url(#paint1_linear_13_19)"
                  />
                  <path
                    d="M17.5335 4.51958L17.9093 5.53521C18.2131 6.35636 18.8606 7.0038 19.6817 7.30765L20.6974 7.68347L19.6817 8.05928C18.8606 8.36314 18.2131 9.01057 17.9093 9.83173L17.5335 10.8474L17.1576 9.83173C16.8538 9.01057 16.2064 8.36314 15.3852 8.05928L14.3696 7.68347L15.3852 7.30765C16.2064 7.0038 16.8538 6.35636 17.1576 5.53521L17.5335 4.51958Z"
                    fill="url(#paint2_linear_13_19)"
                  />
                  <path
                    d="M5.45679 19.5537C5.80867 19.2511 6.34721 19.5495 6.27712 20.0083L6.10283 21.1492C6.08079 21.2934 6.12287 21.4401 6.21804 21.5508L6.97067 22.4257C7.27335 22.7776 6.97493 23.3161 6.5161 23.246L5.37521 23.0718C5.23096 23.0497 5.08427 23.0918 4.97364 23.187L4.09869 23.9396C3.7468 24.2423 3.20826 23.9439 3.27836 23.485L3.45265 22.3441C3.47469 22.1999 3.43261 22.0532 3.33744 21.9426L2.58481 21.0676C2.28213 20.7157 2.58054 20.1772 3.03938 20.2473L4.18026 20.4216C4.32452 20.4436 4.4712 20.4015 4.58183 20.3064L5.45679 19.5537Z"
                    fill="url(#paint3_linear_13_19)"
                  />
                  <path
                    d="M11.5362 6.0961C11.6973 5.66079 12.313 5.66079 12.4741 6.09609L13.8555 9.82927C14.4632 11.4716 15.758 12.7664 17.4004 13.3742L21.1335 14.7556C21.5688 14.9166 21.5688 15.5323 21.1335 15.6934L17.4004 17.0748C15.758 17.6825 14.4632 18.9774 13.8555 20.6197L12.4741 24.3529C12.313 24.7882 11.6973 24.7882 11.5362 24.3529L10.1548 20.6197C9.54711 18.9774 8.25224 17.6825 6.60993 17.0748L2.87675 15.6934C2.44144 15.5323 2.44144 14.9166 2.87675 14.7556L6.60993 13.3742C8.25224 12.7664 9.54711 11.4716 10.1548 9.82927L11.5362 6.0961Z"
                    fill="url(#paint4_linear_13_19)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_13_19"
                      x1="18.8513"
                      y1="17.7518"
                      x2="22.9898"
                      y2="24.0685"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#D388FF" />
                      <stop offset="0.695" stopColor="#4B94F7" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_13_19"
                      x1="9.82792"
                      y1="10.8475"
                      x2="-3.24088"
                      y2="-3.92592"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0189477" stopColor="#89B5FF" />
                      <stop offset="0.745" stopColor="#002886" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_13_19"
                      x1="19.8938"
                      y1="10.8474"
                      x2="12.2704"
                      y2="2.22955"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="0.315" stopColor="#FF8CB6" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_13_19"
                      x1="5.36766"
                      y1="26.0916"
                      x2="2.6004"
                      y2="13.6139"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF5FD7" />
                      <stop offset="0.545" stopColor="#C86AFF" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_13_19"
                      x1="25.0462"
                      y1="32.551"
                      x2="2.51143"
                      y2="3.98021"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.340919" stopColor="#002DBF" />
                      <stop offset="0.479627" stopColor="#4396F7" />
                      <stop offset="0.634404" stopColor="#FF9BD2" />
                      <stop offset="0.815235" stopColor="#C9FFFC" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              AI Non-Technical Interview
            </button>

            {/* Technical Button */}
            <button
              className={`w-[322px] h-[48px] text-[18px] flex items-center justify-center rounded-full font-medium transition duration-300 ease-in-out ${
                selected === "technical"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white focus:outline-none border-none"
                  : "bg-white text-gray-700 focus:outline-none border-none"
              }`}
              onClick={() => setSelected("technical")}
            >
              {selected === "technical" ? (
                <svg
                  className="toogleIcon w-[26px] h-[28.545px] mr-[10px] bg-none"
                  width="26"
                  height="30"
                  viewBox="0 0 26 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0233 7.54762C13.2639 6.89742 14.1835 6.89742 14.4241 7.54762L16.4602 13.05C16.6871 13.6633 17.1706 14.1468 17.7839 14.3737L23.2863 16.4098C23.9365 16.6504 23.9365 17.57 23.2863 17.8106L17.7839 19.8467C17.1706 20.0736 16.6871 20.5571 16.4602 21.1704L14.4241 26.6727C14.1835 27.3229 13.2639 27.3229 13.0233 26.6727L10.9872 21.1704C10.7603 20.5571 10.2768 20.0736 9.66352 19.8467L4.16114 17.8106C3.51094 17.57 3.51095 16.6504 4.16115 16.4098L9.66352 14.3737C10.2768 14.1468 10.7603 13.6633 10.9872 13.05L13.0233 7.54762Z"
                    fill="white"
                  />
                  <path
                    d="M22.4776 19.15C22.5979 18.8249 23.0577 18.8249 23.178 19.15L23.5786 20.2325C23.6164 20.3347 23.697 20.4153 23.7992 20.4531L24.8817 20.8537C25.2068 20.974 25.2068 21.4338 24.8817 21.5541L23.7992 21.9546C23.697 21.9925 23.6164 22.073 23.5786 22.1752L23.178 23.2577C23.0577 23.5828 22.5979 23.5828 22.4776 23.2577L22.0771 22.1752C22.0392 22.073 21.9587 21.9925 21.8564 21.9546L20.774 21.5541C20.4489 21.4338 20.4489 20.974 20.774 20.8537L21.8564 20.4531C21.9587 20.4153 22.0392 20.3347 22.0771 20.2325L22.4776 19.15Z"
                    fill="white"
                  />
                  <path
                    d="M6.1654 2.22633C6.40599 1.57613 7.32563 1.57613 7.56622 2.22633L8.36089 4.3739C8.43654 4.57832 8.59771 4.7395 8.80213 4.81514L10.9497 5.60981C11.5999 5.85041 11.5999 6.77004 10.9497 7.01064L8.80213 7.80531C8.59771 7.88095 8.43654 8.04213 8.36089 8.24655L7.56622 10.3941C7.32563 11.0443 6.40599 11.0443 6.1654 10.3941L5.37072 8.24655C5.29508 8.04213 5.13391 7.88095 4.92949 7.80531L2.78192 7.01064C2.13172 6.77004 2.13172 5.85041 2.78192 5.60981L4.92949 4.81514C5.13391 4.7395 5.29508 4.57832 5.37072 4.3739L6.1654 2.22633Z"
                    fill="white"
                  />
                  <path
                    d="M19.8153 5.31396L20.5782 7.37565C20.6916 7.68228 20.9334 7.92404 21.24 8.0375L23.3017 8.80039L21.24 9.56328C20.9334 9.67674 20.6916 9.9185 20.5782 10.2251L19.8153 12.2868L19.0524 10.2251C18.9389 9.9185 18.6972 9.67674 18.3905 9.56328L16.3289 8.80039L18.3905 8.0375C18.6972 7.92404 18.9389 7.68228 19.0524 7.37564L19.8153 5.31396Z"
                    fill="white"
                  />
                  <path
                    d="M6.87154 21.5679C7.13433 21.3418 7.53653 21.5647 7.48418 21.9074L7.20733 23.7196C7.19087 23.8273 7.2223 23.9369 7.29337 24.0195L8.48888 25.4093C8.71494 25.6721 8.49207 26.0743 8.1494 26.022L6.33716 25.7451C6.22943 25.7287 6.11988 25.7601 6.03726 25.8312L4.64744 27.0267C4.38464 27.2527 3.98245 27.0299 4.0348 26.6872L4.31165 24.875C4.32811 24.7672 4.29668 24.6577 4.22561 24.575L3.03009 23.1852C2.80404 22.9224 3.02691 22.5202 3.36958 22.5726L5.18181 22.8494C5.28955 22.8659 5.3991 22.8345 5.48172 22.7634L6.87154 21.5679Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  className="toogleIcon w-[26px] h-[28.545px] mr-[10px] bg-none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="27"
                  viewBox="0 0 23 27"
                  fill="none"
                >
                  <path
                    d="M19.7981 17.4842C19.9592 17.0489 20.5749 17.0489 20.736 17.4842L20.9226 17.9886C20.9733 18.1255 21.0812 18.2334 21.2181 18.284L21.7225 18.4707C22.1578 18.6318 22.1578 19.2475 21.7225 19.4085L21.2181 19.5952C21.0812 19.6459 20.9733 19.7538 20.9226 19.8906L20.736 20.3951C20.5749 20.8304 19.9592 20.8304 19.7981 20.3951L19.6115 19.8906C19.5608 19.7538 19.4529 19.6459 19.3161 19.5952L18.8116 19.4085C18.3763 19.2475 18.3763 18.6318 18.8116 18.4707L19.3161 18.284C19.4529 18.2334 19.5608 18.1255 19.6115 17.9886L19.7981 17.4842Z"
                    fill="url(#paint0_linear_13_19)"
                  />
                  <path
                    d="M4.86041 2.18043C5.20448 1.36596 6.35869 1.36596 6.70276 2.18043L7.23437 3.43885C7.33569 3.67869 7.52656 3.86956 7.7664 3.97088L9.02481 4.50248C9.83929 4.84655 9.83929 6.00077 9.02481 6.34484L7.7664 6.87645C7.52656 6.97777 7.33569 7.16863 7.23437 7.40848L6.70276 8.66689C6.35869 9.48136 5.20448 9.48136 4.86041 8.66689L4.3288 7.40848C4.22748 7.16863 4.03661 6.97777 3.79677 6.87645L2.53836 6.34484C1.72389 6.00077 1.72389 4.84655 2.53836 4.50248L3.79677 3.97088C4.03661 3.86956 4.22748 3.67869 4.3288 3.43884L4.86041 2.18043Z"
                    fill="url(#paint1_linear_13_19)"
                  />
                  <path
                    d="M17.5335 4.51958L17.9093 5.53521C18.2131 6.35636 18.8606 7.0038 19.6817 7.30765L20.6974 7.68347L19.6817 8.05928C18.8606 8.36314 18.2131 9.01057 17.9093 9.83173L17.5335 10.8474L17.1576 9.83173C16.8538 9.01057 16.2064 8.36314 15.3852 8.05928L14.3696 7.68347L15.3852 7.30765C16.2064 7.0038 16.8538 6.35636 17.1576 5.53521L17.5335 4.51958Z"
                    fill="url(#paint2_linear_13_19)"
                  />
                  <path
                    d="M5.45679 19.5537C5.80867 19.2511 6.34721 19.5495 6.27712 20.0083L6.10283 21.1492C6.08079 21.2934 6.12287 21.4401 6.21804 21.5508L6.97067 22.4257C7.27335 22.7776 6.97493 23.3161 6.5161 23.246L5.37521 23.0718C5.23096 23.0497 5.08427 23.0918 4.97364 23.187L4.09869 23.9396C3.7468 24.2423 3.20826 23.9439 3.27836 23.485L3.45265 22.3441C3.47469 22.1999 3.43261 22.0532 3.33744 21.9426L2.58481 21.0676C2.28213 20.7157 2.58054 20.1772 3.03938 20.2473L4.18026 20.4216C4.32452 20.4436 4.4712 20.4015 4.58183 20.3064L5.45679 19.5537Z"
                    fill="url(#paint3_linear_13_19)"
                  />
                  <path
                    d="M11.5362 6.0961C11.6973 5.66079 12.313 5.66079 12.4741 6.09609L13.8555 9.82927C14.4632 11.4716 15.758 12.7664 17.4004 13.3742L21.1335 14.7556C21.5688 14.9166 21.5688 15.5323 21.1335 15.6934L17.4004 17.0748C15.758 17.6825 14.4632 18.9774 13.8555 20.6197L12.4741 24.3529C12.313 24.7882 11.6973 24.7882 11.5362 24.3529L10.1548 20.6197C9.54711 18.9774 8.25224 17.6825 6.60993 17.0748L2.87675 15.6934C2.44144 15.5323 2.44144 14.9166 2.87675 14.7556L6.60993 13.3742C8.25224 12.7664 9.54711 11.4716 10.1548 9.82927L11.5362 6.0961Z"
                    fill="url(#paint4_linear_13_19)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_13_19"
                      x1="18.8513"
                      y1="17.7518"
                      x2="22.9898"
                      y2="24.0685"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#D388FF" />
                      <stop offset="0.695" stopColor="#4B94F7" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_13_19"
                      x1="9.82792"
                      y1="10.8475"
                      x2="-3.24088"
                      y2="-3.92592"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0189477" stopColor="#89B5FF" />
                      <stop offset="0.745" stopColor="#002886" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_13_19"
                      x1="19.8938"
                      y1="10.8474"
                      x2="12.2704"
                      y2="2.22955"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="0.315" stopColor="#FF8CB6" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_13_19"
                      x1="5.36766"
                      y1="26.0916"
                      x2="2.6004"
                      y2="13.6139"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF5FD7" />
                      <stop offset="0.545" stopColor="#C86AFF" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_13_19"
                      x1="25.0462"
                      y1="32.551"
                      x2="2.51143"
                      y2="3.98021"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.340919" stopColor="#002DBF" />
                      <stop offset="0.479627" stopColor="#4396F7" />
                      <stop offset="0.634404" stopColor="#FF9BD2" />
                      <stop offset="0.815235" stopColor="#C9FFFC" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              AI Technical Interview
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-8xl mx-auto">
        <div className="flex flex-col w-full px-4 sm:px-6 md:px-10">
          <div className="relative w-5/6 py-2 mx-auto overflow-hidden">
            {/* AfterSelection Items */}
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${
                  (currentIndex / cardsPerSlide) * 100
                }%)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-2.5"
                  style={{ minWidth: `${100 / cardsPerSlide}%` }}
                >
                  <div className="flex flex-col items-center justify-center bg-white border-[1px] border-[#B9B9B9]  shadow-[0px_0px_8px_#C9FFFC] rounded-3xl py-[18px]">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-40 h-40 object-cover "
                    />
                    <p className=" text-gray-600 ">{item.title}</p>
                    <h3 className="flex-wrap justify-center items-center flex text-gray-600 mt-2 font-bold text-lg ">
                      {item.description}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-4 mb-[19px]">
            {Array(Math.ceil(items.length / cardsPerSlide))
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * cardsPerSlide)}
                  className={`p-2 rounded-full ${
                    currentIndex / cardsPerSlide === index
                      ? "bg-black"
                      : "bg-[#D9D9D9]"
                  }`}
                ></button>
              ))}
          </div>
        </div>
      </div>
      {/* ///////////Difficulty Card///////// */}
      <div className="DialogCards w-full flex justify-center gap-8 px-12">
        <>
          {/* Trigger Button (Selection Panel) */}
          <div
            className="SelectionPanel hover:transform hover:scale-[1.01] w-[425px] h-[76px] bg-white rounded-[10px] shadow-[0px_2px_12px_rgba(0,_0,_0,_0.25)] border-[2px] border-[#5C9AFF] flex items-center justify-start cursor-pointer"
            onClick={toggleDialogDifficulty}
          >
            <div className="Frame1000008202 cursor-pointer flex bg-none ml-[25px] items-center">
              <img src={shield} alt="" className="h-[24px] w-[24px]" />
              <div className="Content h-full rounded-[8px] flex flex-col bg-white">
                <div className="Heading gradient-text text-[18px] font-semibold leading-[28px] break-words bg-none ml-[10px]">
                  Difficulty Level
                </div>
                <div className="text-[#333232] text-[18px] ml-[10px] text-start">
                  {selectedLevel}
                </div>
              </div>
            </div>
          </div>
          {/* Dialog with Difficulty Selector */}
          <Dialog
            sx={{
              "& .MuiDialog-paper": {
                width: "707px",
                borderRadius: "10px",
                border: "1px solid var(--logo-gr-Blue-to-pink, #D388FF)",
                background: "#FFF",
                boxShadow: "0px 0px 4px 0px #D388FF",
                paddingBottom: "48px",
              },
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
            }}
            open={openDifficulty}
            onClose={toggleDialogDifficulty}
          >
            <div className="flex justify-end pt-[24px] pr-[24px]">
              <div className="w-fit">
                <svg
                  onClick={toggleDialogDifficulty}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="self-end cursor-pointer"
                >
                  <path
                    d="M28.8336 3.16676C27.8211 2.1542 26.1795 2.1541 25.1669 3.16655L15.9987 12.3334L6.83302 3.16687C5.82052 2.15428 4.17885 2.15428 3.16635 3.16687V3.16687C2.15398 4.17933 2.15398 5.82075 3.16635 6.83321L12.3324 16L3.16635 25.1669C2.15398 26.1793 2.15398 27.8208 3.16635 28.8332V28.8332C4.17885 29.8458 5.82052 29.8458 6.83302 28.8332L15.9987 19.6667L25.1669 28.8335C26.1795 29.846 27.8211 29.8459 28.8336 28.8333V28.8333C29.846 27.8208 29.846 26.1793 28.8336 25.1668L19.6676 16L28.8336 6.83332C29.846 5.8208 29.846 4.17928 28.8336 3.16676V3.16676Z"
                    fill="#0072DC"
                  />
                </svg>
              </div>
            </div>

            <DialogTitle
              style={{
                textAlign: "center",
                color: "#333232",
                fontSize: 32,
                fontWeight: 600,
                padding: 0,
              }}
            >
              Difficulty Level
            </DialogTitle>
            <div className="w-full flex flex-col items-center gap-2">
              <hr className="w-[85%] my-6 mt-4" />
              {/* Difficulty Options */}
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <div
                  key={level}
                  onClick={() => handleSelection(level)}
                  className="w-[85%] p-2 cursor-pointer rounded-lg flex items-center gap-2"
                >
                  <div className="relative w-6 pt-[2px]">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={selectedLevel === level}
                      onChange={() => handleSelection(level)}
                      className="custom-radio"
                    />
                    <span className="custom-radio-circle"></span>
                  </div>
                  <span
                    className={`text-[16px] text-[#161616] ${
                      selectedLevel === level ? "font-bold" : "font-normal"
                    }`}
                  >
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </Dialog>
        </>
        {/* ///////////Duration Card///////// */}
        <>
          {/* Selection Panel */}
          <div
            onClick={toggleDialogDuration}
            className="SelectionPanel hover:transform hover:scale-[1.01] w-[425px] h-[76px] bg-white rounded-[10px] shadow-[0px_2px_12px_rgba(0,_0,_0,_0.25)] border-[2px] border-[#5C9AFF] flex items-center justify-start cursor-pointer"
          >
            <div className="Frame1000008202 cursor-pointer flex bg-none ml-[25px] items-center">
              <img src={timer} alt="" className="h-[24px] w-[24px]" />
              <div className="cursor-pointer Content h-full rounded-[8px] flex flex-col justify-center items-start bg-white">
                <div className="Heading gradient-text text-[18px] font-semibold leading-[28px] break-words bg-none ml-[10px]">
                  Duration per question
                </div>
                <div className="text-[#333232] text-[18px] ml-[10px] text-start">
                  {duration} {duration ? "sec" : ""}
                </div>
              </div>
            </div>
          </div>

          {/* Dialog */}
          <Dialog
            open={openDuration}
            onClose={toggleDialogDuration}
            sx={{
              "& .MuiDialog-paper": {
                width: "707px",
                borderRadius: "10px",
                border: "1px solid var(--logo-gr-Blue-to-pink, #D388FF)",
                background: "#FFF",
                boxShadow: "0px 0px 4px 0px #D388FF",
                padding: "24px 24px 80px",
              },
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
            }}
          >
            <div className="flex justify-end">
              <div className="w-fit">
                <svg
                  onClick={toggleDialogDuration}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="cursor-pointer"
                >
                  <path
                    d="M28.8336 3.16676C27.8211 2.1542 26.1795 2.1541 25.1669 3.16655L15.9987 12.3334L6.83302 3.16687C5.82052 2.15428 4.17885 2.15428 3.16635 3.16687V3.16687C2.15398 4.17933 2.15398 5.82075 3.16635 6.83321L12.3324 16L3.16635 25.1669C2.15398 26.1793 2.15398 27.8208 3.16635 28.8332V28.8332C4.17885 29.8458 5.82052 29.8458 6.83302 28.8332L15.9987 19.6667L25.1669 28.8335C26.1795 29.846 27.8211 29.8459 28.8336 28.8333V28.8333C29.846 27.8208 29.846 26.1793 28.8336 25.1668L19.6676 16L28.8336 6.83332C29.846 5.8208 29.846 4.17928 28.8336 3.16676V3.16676Z"
                    fill="#0072DC"
                  />
                </svg>
              </div>
            </div>
            <DialogTitle
              style={{
                textAlign: "center",
                color: "#333232",
                fontSize: 32,
                fontWeight: 600,
                padding: 0,
              }}
            >
              Duration per question
            </DialogTitle>

            <div className="w-full flex flex-col items-center gap-2">
              <hr className="mt-6 mb-8" />

              <Select
                defaultValue={options.find((opt) => opt.value === duration)}
                options={options}
                styles={customStyles}
                onChange={handleChangeDuration}
                value={options.find((option) => option.value === duration)}
                placeholder="Select time"
              />
            </div>
          </Dialog>
        </>
        {/* ///////////Questions Card///////// */}
        <>
          <div
            className="SelectionPanel hover:transform hover:scale-[1.01] w-[299px] h-[76px] bg-white rounded-[10px] shadow-[0px_2px_12px_rgba(0,_0,_0,_0.25)] border-[2px] border-[#5C9AFF] flex items-center justify-start cursor-pointer"
            onClick={toggleDialogQuestions}
          >
            <div className="Frame1000008202 cursor-pointer flex bg-none ml-[25px] items-center">
              <img src={edit} alt="" className="h-[24px] w-[24px]" />
              <div className="cursor-pointer Content h-full rounded-[8px] flex flex-col justify-center items-start bg-white">
                <div className="Heading gradient-text text-[18px] font-semibold leading-[28px] break-words bg-none ml-[10px]">
                  {questionsList.length
                    ? "Custom questions"
                    : "Type custom interview questions"}
                </div>
                <div className="text-[#333232] text-[18px] ml-[10px] text-start">
                  {questionsList.length
                    ? `${questionsList.length} Question${
                        questionsList.length !== 1 ? "s" : ""
                      } Added`
                    : ""}
                </div>
              </div>
            </div>
          </div>

          <Dialog
            open={openQuestions}
            onClose={toggleDialogQuestions}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "10px",
                border: "1px solid var(--logo-gr-Blue-to-pink, #D388FF)",
                background: "#FFF",
                boxShadow: "0px 0px 4px 0px #D388FF",
                padding: "24px",
              },
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
            }}
          >
            <div className="flex justify-end">
              <div className="w-fit">
                <svg
                  onClick={toggleDialogQuestions}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="cursor-pointer"
                  aria-hidden="true"
                >
                  <path
                    d="M28.8336 3.16676C27.8211 2.1542 26.1795 2.1541 25.1669 3.16655L15.9987 12.3334L6.83302 3.16687C5.82052 2.15428 4.17885 2.15428 3.16635 3.16687V3.16687C2.15398 4.17933 2.15398 5.82075 3.16635 6.83321L12.3324 16L3.16635 25.1669C2.15398 26.1793 2.15398 27.8208 3.16635 28.8332V28.8332C4.17885 29.8458 5.82052 29.8458 6.83302 28.8332L15.9987 19.6667L25.1669 28.8335C26.1795 29.846 27.8211 29.8459 28.8336 28.8333V28.8333C29.846 27.8208 29.846 26.1793 28.8336 25.1668L19.6676 16L28.8336 6.83332C29.846 5.8208 29.846 4.17928 28.8336 3.16676V3.16676Z"
                    fill="#0072DC"
                  />
                </svg>
              </div>
            </div>
            <DialogTitle
              style={{
                textAlign: "center",
                color: "#333232",
                fontSize: 32,
                fontWeight: 600,
                padding: 0,
              }}
            >
              Type custom interview questions
            </DialogTitle>

            <div className="w-full flex flex-col gap-2">
              <hr className="w-full mt-4 mb-6" />

              {questions.map((question, index) => (
                <div
                  key={index}
                  className="InputContainer px-6 py-4 flex items-center gap-4 rounded-lg border-[0.5px] border-[#353535] bg-[#EBEBEB]"
                >
                  <input
                    type="text"
                    placeholder={
                      focusedInputs[index] ? "|" : `Question ${index + 1}`
                    }
                    value={question}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleBlur(index)}
                    onChange={(e) => handleInputChange(index, e)}
                    className={`flex w-full h-9 text-[18px] rounded-md outline-none justify-items-start px-2 bg-[#EBEBEB] placeholder:text-[#353535]`}
                  />
                  <button className="searchBar w-fit bg-transparent cursor-pointer flex justify-center outline-none border-none">
                    <img src={image5} alt="" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSaveQuestions}
                className="ButtonsCta w-[137px] h-[56px] px-[48px] py-[16px] bg-[#0072DC] rounded-[30px] justify-center items-center gap-[16px] inline-flex outline-none border-none"
              >
                <img src={whiteMagic} alt="" />
                <div className="Text flex text-center text-white text-[18px] font-[400] break-words">
                  Save
                </div>
              </button>
            </div>
          </Dialog>
        </>
      </div>
      <div className="flex justify-end px-12">
        <div className=" ButtonsCta rounded-[30px] justify-center items-center gap-4 inline-flex hover:cursor-pointer bg-question_gradient w-[181px] h-[40px] mt-[24px] mb-[10px]">
          <img src={whiteMagic} alt="" />
          <div className="Text text-center text-white text-lg font-semibold leading-[18px]">
            Take AI interview
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterSelection;