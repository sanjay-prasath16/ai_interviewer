import { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import image5 from "../assets/Search.svg";
import Liyla from "../assets/Type=Layila.svg";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
// import Spline from "@splinetool/react-spline";
import { useConversation } from "@11labs/react";

const AfterSelection = () => {
  const [selected, setSelected] = useState("nonTechnical");
  const [openDifficulty, setOpenDifficulty] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState();
  const conversation = useConversation();

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
      minWidth: "389px",
      fontSize: "18px",
      fontWeight: "400",
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
      maxWidth: "389px",
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

  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  const thresholdHeight = 468;
  const thresholdWidth = 768;

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall =
        window.innerHeight < thresholdHeight ||
        window.innerWidth < thresholdWidth;
      setIsScreenTooSmall(isSmall);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const [liylaStatus, setLiylaStatus] = useState(false);
  const audioContextRef = useRef(null);

  useEffect(() => {
    const setupAudioContext = () => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    };

    const monitorAudioBlobs = () => {
      if (!audioContextRef.current) {
        setupAudioContext();
      }

      const originalCreateMediaElementSource = audioContextRef.current.createMediaElementSource;
      audioContextRef.current.createMediaElementSource = function(mediaElement) {
        console.log("New audio element detected:", mediaElement.src);
        if (mediaElement.src.startsWith('blob:')) {
          handleNewBlob(mediaElement.src);
        }
        return originalCreateMediaElementSource.call(this, mediaElement);
      };

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLAudioElement && node.src.startsWith('blob:')) {
                console.log("New audio blob detected:", node.src);
                handleNewBlob(node.src);
              }
            });
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };
    };

    const handleNewBlob = async (blobUrl) => {
      try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        await sendBlobToBackend(blob);
      } catch (error) {
        console.error("Error handling blob:", error);
      }
    };

    const sendBlobToBackend = async (blob) => {
      try {
        const formData = new FormData();
        formData.append("audio", blob, "audio.webm");

        const uploadResponse = await fetch("http://localhost:6000/upload-audio", {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          console.log("Audio uploaded successfully!");
        } else {
          console.error("Error uploading audio:", uploadResponse.statusText);
        }
      } catch (error) {
        console.error("Error sending blob to backend:", error);
      }
    };

    const cleanup = monitorAudioBlobs();

    return cleanup;
  }, []);

  const toggleLiylaStatus = async () => {
    setLiylaStatus((prev) => !prev);
    if (!liylaStatus) {
      const conversationId = await conversation.startSession({
        agentId: import.meta.env.VITE_APP_ELEVENLABS,
      });
      console.log("11 labs activated: ", conversationId);
    } else {
      await conversation.endSession();
    }
  };

  return (
    <>
      {isScreenTooSmall ? (
        <div className="h-screen flex items-center justify-center bg-gray-200 text-center text-2xl font-bold text-red-500">
          <span className="block md:inline">
            Please open on a&nbsp;
            <span className="text-2xl text-[#000]">Larger Screen</span>
            &nbsp;or try in&nbsp;
            <span className="text-2xl text-[#000]">Landscape.</span>
          </span>
        </div>
      ) : (
        <div className="relative ">
          <div
            className="absolute z-50 ml-[80%] mt-20"
            onClick={toggleLiylaStatus}
          >
            {liylaStatus && (
              // <Spline className='items-end' scene="https://prod.spline.design/dmBccWJHg23ZYriK/scene.splinecode" />
              <div>
                <img
                  src={Liyla}
                  className="w-[86px] h-[86px] mt-[81px] mr-[31px]"
                />
                <p className="border border-white mt-[20px] px-[24px] py-[20px] text-justify">
                  Hi,I’m Liyla. What can I do for you today?
                </p>
                <p className="mt-[8px] bg-[#0F0F36] opacity-[30%]">
                  Post a job for UI/UX designer
                </p>
              </div>
            )}
          </div>
          <div className=".main-container min-h-[100vh] bg-[#F1F4F8]">
            <Navbar assistant={Liyla} onLiylaActivate={toggleLiylaStatus} />
            <div className="flex flex-col justify-center items-center">
              <div
                className="LetsGetYouStarted text-center text-[5.5vh] font-bold leading-[6vh] text-[#D388FF] break-words mt-[4vh] mb-[2.5vh] text-transparent w-[85vw] lg:w-[65vw] xl:w-[60vw]"
                style={{
                  background:
                    "linear-gradient(325deg, #D388FF 21.06%, #4B94F6 83.52%)",
                  backgroundClip: "text",
                }}
              >
                {`Let's get you started with scheduling your AI interview`}
              </div>
              <div className="YouHaveSelected1024CandidatesForInterview text-center">
                <span className=" text-[#161616] text-[2.8vh] font-[400] leading-[3vh] break-words">
                  You have selected
                </span>
                <span className="text-[#161616] text-[2.8vh] font-[600] leading-[3vh] break-words">
                  &nbsp;
                </span>
                <span className="text-[#0072DC] text-[2.8vh] font-[600] leading-[3vh] break-words">
                  1024 candidates
                </span>
                &nbsp;
                <span className=" text-[#161616] text-[2.8vh] font-[400] leading-[3vh] break-words">
                  for interview.
                </span>
              </div>
              <div>
                <div className="toogleContainer w-fit flex bg-gray-200 rounded-full p-1 space-x-4 mt-[3vh]">
                  {/* Non-Technical Button */}
                  <button
                    className={`w-fit p-[1vh_24px] text-[2.2vh] flex items-center justify-center rounded-full font-regular transition duration-300 ease-in-out ${
                      selected === "nonTechnical"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white focus:outline-none border-none"
                        : "bg-white text-gray-700 focus:outline-none border-none"
                    }`}
                    onClick={() => setSelected("nonTechnical")}
                  >
                    {selected === "nonTechnical" ? (
                      <svg
                        className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
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
                        className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
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
                    className={`w-fit p-[1vh_24px] text-[2.2vh] flex items-center justify-center font-regular rounded-full transition duration-300 ease-in-out ${
                      selected === "technical"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white focus:outline-none border-none"
                        : "bg-white text-gray-700 focus:outline-none border-none"
                    }`}
                    onClick={() => setSelected("technical")}
                  >
                    {selected === "technical" ? (
                      <svg
                        className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
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
                        className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
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
            <div className="flex justify-center items-center relative overflow-hidden pt-[3vh]">
              <Carousel />
            </div>
            {/* ///////////Difficulty Card///////// */}
            <div className="DialogCards w-full flex justify-center gap-10 px-12 my-[3.5vh]">
              <>
                {/* Trigger Button (Selection Panel) */}
                <div
                  className="SelectionPanel hover:transform hover:scale-[1.01] overflow-hidden w-1/4 h-[11vh] pl-3 md:pl-[24px] bg-white rounded-[10px] shadow-[0px_2px_12px_rgba(0,_0,_0,_0.25)] border border-[#5c99ff] inline-flex items-center justify-start cursor-pointer"
                  onClick={toggleDialogDifficulty}
                >
                  <div className="Frame1000008202 cursor-pointer flex-[1_1_0] h-[11vh] py-[2vh] justify-start items-center gap-2 md:gap-[16px] flex bg-none">
                    <svg
                      className="w-fit bg-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 32 34"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.1035 32.4483C16.1035 32.4483 28.9771 26.269 28.9771 17V4.64138L16.1035 1.55173L3.22998 4.64138V17C3.22998 26.269 16.1035 32.4483 16.1035 32.4483Z"
                        stroke="#0072DC"
                        strokeWidth="2.57471"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="Content flex-1 h-full rounded-[8px] flex flex-col justify-center items-start">
                      <div className="Heading text-[#5C9AFF] text-[2vh] lg:text-[2.5vh] font-semibold  break-words bg-none">
                        Difficulty Level
                      </div>
                      {/* Display Selected Level */}
                      <div className="text-[#333232] text-[1.5vh] lg:text-[2.2vh] text-start">
                        {selectedLevel}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Dialog with Difficulty Selector */}
                <Dialog
                  sx={{
                    "& .MuiDialog-paper": {
                      width: "35vw",
                      minWidth: "468px",
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
                      fontSize: 24,
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
                            selectedLevel === level
                              ? "font-bold"
                              : "font-normal"
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
                  className="SelectionPanel hover:transform hover:scale-[1.01] overflow-hidden w-1/4 h-[11vh] pl-3 md:pl-[24px] bg-white rounded-[10px] shadow-[0px_2px_12px_rgba(0,_0,_0,_0.25)] border border-[#5c99ff] inline-flex items-center justify-start cursor-pointer"
                >
                  <div className="Frame1000008202 cursor-pointer flex-[1_1_0] h-[11vh] py-[2vh] justify-start items-center gap-2 md:gap-[16px] flex bg-none">
                    {" "}
                    <svg
                      className="w-fit bg-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_13_56)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.6258 1.62951C11.6258 1.34367 11.7417 1.06953 11.9479 0.867404C12.1541 0.66528 12.4338 0.551727 12.7254 0.551727H18.5896C18.8813 0.551727 19.1609 0.66528 19.3671 0.867404C19.5733 1.06953 19.6892 1.34367 19.6892 1.62951C19.6892 1.91536 19.5733 2.1895 19.3671 2.39162C19.1609 2.59375 18.8813 2.7073 18.5896 2.7073H12.7254C12.4338 2.7073 12.1541 2.59375 11.9479 2.39162C11.7417 2.1895 11.6258 1.91536 11.6258 1.62951ZM15.6575 5.5814C12.4497 5.5814 9.37331 6.83047 7.10505 9.05384C4.8368 11.2772 3.56251 14.2927 3.56251 17.4371C3.56251 20.5814 4.8368 23.5969 7.10505 25.8203C9.37331 28.0436 12.4497 29.2927 15.6575 29.2927C18.8653 29.2927 21.9417 28.0436 24.21 25.8203C26.4782 23.5969 27.7525 20.5814 27.7525 17.4371C27.7525 14.2927 26.4782 11.2772 24.21 9.05384C21.9417 6.83047 18.8653 5.5814 15.6575 5.5814ZM1.36342 17.4371C1.36342 9.69854 7.76277 3.42583 15.6575 3.42583C23.5522 3.42583 29.9516 9.69854 29.9516 17.4371C29.9516 25.1756 23.5522 31.4483 15.6575 31.4483C7.76277 31.4483 1.36342 25.1756 1.36342 17.4371ZM15.6575 10.6111C15.9491 10.6111 16.2288 10.7246 16.435 10.9267C16.6412 11.1289 16.7571 11.403 16.7571 11.6889V17.4371C16.7571 17.7229 16.6412 17.997 16.435 18.1992C16.2288 18.4013 15.9491 18.5148 15.6575 18.5148C15.3659 18.5148 15.0862 18.4013 14.88 18.1992C14.6738 17.997 14.558 17.7229 14.558 17.4371V11.6889C14.558 11.403 14.6738 11.1289 14.88 10.9267C15.0862 10.7246 15.3659 10.6111 15.6575 10.6111Z"
                          fill="#0072DC"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_13_56">
                          <rect
                            width="30.8965"
                            height="30.8965"
                            fill="white"
                            transform="translate(0.120453 0.551727)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className=" cursor-pointer Content flex-1 h-full rounded-[8px] flex flex-col justify-center items-start bg-none">
                      <div className="Heading text-[#5C9AFF] text-[2vh] lg:text-[2.5vh] font-semibold break-words bg-none">
                        Duration per question
                      </div>
                      <div className="text-[#333232] text-[1.5vh] lg:text-[2.2vh] text-start">
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
                      width: "35vw",
                      minWidth: "468px",
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
                      fontSize: 24,
                      fontWeight: 600,
                      padding: 0,
                    }}
                  >
                    Duration per question
                  </DialogTitle>

                  <div className="w-full flex flex-col items-center gap-2">
                    <hr className="mt-6 mb-8 w-full" />

                    <Select
                      defaultValue={options.find(
                        (opt) => opt.value === duration
                      )}
                      options={options}
                      styles={customStyles}
                      onChange={handleChangeDuration}
                      value={options.find(
                        (option) => option.value === duration
                      )}
                      placeholder="Select time"
                    />
                  </div>
                </Dialog>
              </>
              {/* ///////////Questions Card///////// */}
              <>
                <div
                  className="SelectionPanel hover:transform hover:scale-[1.01] overflow-hidden w-1/4 h-[11vh] pl-3 md:pl-[24px] bg-white rounded-[10px] shadow-[0px_2px_12px_rgba(0,_0,_0,_0.25)] border border-[#5C9AFF] inline-flex items-center justify-start cursor-pointer"
                  onClick={toggleDialogQuestions}
                >
                  <div className="Frame1000008202 cursor-pointer flex-[1_1_0] h-[11vh] py-[2vh] justify-start items-center gap-2 md:gap-[16px] flex bg-none">
                    <svg
                      className="w-fit bg-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M7.08335 6.72795H5.25077C4.27872 6.72795 3.34647 7.1141 2.65913 7.80145C1.97178 8.48879 1.58563 9.42104 1.58563 10.3931V26.8862C1.58563 27.8583 1.97178 28.7905 2.65913 29.4779C3.34647 30.1652 4.27872 30.5514 5.25077 30.5514H21.7439C22.716 30.5514 23.6482 30.1652 24.3356 29.4779C25.0229 28.7905 25.4091 27.8583 25.4091 26.8862V25.0537"
                        stroke="#0072DC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.1982 5.3067L26.8305 10.939M29.4308 8.28244C30.1702 7.54301 30.5856 6.54014 30.5856 5.49444C30.5856 4.44874 30.1702 3.44587 29.4308 2.70645C28.6914 1.96702 27.6885 1.55162 26.6428 1.55162C25.5971 1.55162 24.5942 1.96702 23.8548 2.70645L8.05615 18.4488V24.0811H13.6885L29.4308 8.28244Z"
                        stroke="#0072DC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="cursor-pointer Content flex-1 h-full pr-1 rounded-[8px] flex flex-col justify-center items-start bg-none">
                      <div className="Heading text-[#5C9AFF] text-[2vh] lg:text-[2.5vh] font-semibold break-words bg-none">
                        {questionsList.length
                          ? "Custom questions"
                          : "Type custom interview questions"}
                      </div>
                      <div className="text-[#333232] text-[1.5vh] lg:text-[2.2vh] text-start">
                        {" "}
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
                      width: "35vw",
                      minWidth: "468px",
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
                      fontSize: 24,
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
                          placeholder={`Question ${index + 1}`}
                          value={question}
                          onFocus={() => handleFocus(index)}
                          onBlur={() => handleBlur(index)}
                          onChange={(e) => handleInputChange(index, e)}
                          className={`flex w-full h-9 text-[16px] rounded-md outline-none justify-start px-2 bg-[#EBEBEB]`}
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
                      <div className="Text flex text-center text-white text-[18px] font-[400] break-words ">
                        Save
                      </div>
                    </button>
                  </div>
                </Dialog>
              </>
            </div>
            <div className="flex w-full justify-end px-[2vw] pb-4">
              <div className=" ButtonsCta max-w-[251px] h-[6vh] px-8 py-4 rounded-[30px] justify-center items-center gap-4 inline-flex hover:cursor-pointer bg-question_gradient">
                <div className="flex Text items-center text-center text-white text-sm font-regular gap-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 19 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.39632 5.41047C9.57676 4.92282 10.2665 4.92282 10.4469 5.41047L11.974 9.53725C12.1442 9.9972 12.5068 10.3598 12.9668 10.53L17.0935 12.0571C17.5812 12.2375 17.5812 12.9273 17.0935 13.1077L12.9668 14.6347C12.5068 14.8049 12.1442 15.1676 11.974 15.6275L10.4469 19.7543C10.2665 20.242 9.57676 20.242 9.39632 19.7543L7.86927 15.6275C7.69907 15.1676 7.33643 14.8049 6.87649 14.6347L2.7497 13.1077C2.26205 12.9273 2.26205 12.2375 2.7497 12.0571L6.87649 10.53C7.33643 10.3598 7.69907 9.9972 7.86927 9.53725L9.39632 5.41047Z"
                      fill="white"
                    />
                    <path
                      d="M16.4871 14.1125C16.5773 13.8687 16.9222 13.8687 17.0124 14.1125L17.3128 14.9244C17.3412 15.001 17.4016 15.0615 17.4783 15.0898L18.2901 15.3903C18.534 15.4805 18.534 15.8253 18.2901 15.9156L17.4783 16.216C17.4016 16.2443 17.3412 16.3048 17.3128 16.3814L17.0124 17.1933C16.9222 17.4371 16.5773 17.4371 16.4871 17.1933L16.1867 16.3814C16.1583 16.3048 16.0979 16.2443 16.0212 16.216L15.2094 15.9156C14.9656 15.8253 14.9656 15.4805 15.2094 15.3902L16.0212 15.0898C16.0979 15.0615 16.1583 15.001 16.1867 14.9244L16.4871 14.1125Z"
                      fill="white"
                    />
                    <path
                      d="M4.25289 1.41963C4.43334 0.931975 5.12306 0.931977 5.30351 1.41963L5.89951 3.03031C5.95625 3.18362 6.07713 3.3045 6.23044 3.36123L7.84112 3.95724C8.32877 4.13768 8.32877 4.82741 7.84112 5.00786L6.23044 5.60386C6.07713 5.66059 5.95625 5.78147 5.89951 5.93479L5.30351 7.54547C5.12306 8.03312 4.43334 8.03312 4.25289 7.54547L3.65689 5.93479C3.60015 5.78147 3.47927 5.66059 3.32596 5.60386L1.71528 5.00786C1.22763 4.82741 1.22763 4.13768 1.71528 3.95724L3.32596 3.36123C3.47928 3.3045 3.60015 3.18362 3.65689 3.03031L4.25289 1.41963Z"
                      fill="white"
                    />
                    <path
                      d="M14.4904 3.73547L15.0625 5.28173C15.1476 5.51171 15.329 5.69303 15.5589 5.77812L17.1052 6.35029L15.5589 6.92246C15.329 7.00756 15.1476 7.18888 15.0625 7.41885L14.4904 8.96511L13.9182 7.41885C13.8331 7.18888 13.6518 7.00756 13.4218 6.92246L11.8755 6.35029L13.4218 5.77812C13.6518 5.69303 13.8331 5.51171 13.9182 5.28173L14.4904 3.73547Z"
                      fill="white"
                    />
                    <path
                      d="M4.78244 15.9258C4.97954 15.7563 5.28118 15.9234 5.24192 16.1804L5.03428 17.5396C5.02194 17.6204 5.04551 17.7025 5.09881 17.7645L5.99545 18.8069C6.16499 19.004 5.99784 19.3056 5.74084 19.2664L4.38166 19.0587C4.30086 19.0464 4.2187 19.0699 4.15673 19.1232L3.11436 20.0199C2.91727 20.1894 2.61562 20.0223 2.65488 19.7653L2.86252 18.4061C2.87487 18.3253 2.85129 18.2431 2.79799 18.1812L1.90136 17.1388C1.73182 16.9417 1.89897 16.6401 2.15597 16.6793L3.51515 16.887C3.59595 16.8993 3.67811 16.8757 3.74007 16.8224L4.78244 15.9258Z"
                      fill="white"
                    />
                  </svg>
                  Take AI interview
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AfterSelection;