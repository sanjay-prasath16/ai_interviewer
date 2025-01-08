import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import googleMeet from "../assets/google-meet.png";
import zoom from "../assets/zoom.svg";
import Navbar from "../Components/Navbar";
import Spline from "@splinetool/react-spline";
import { useConversation } from "@11labs/react";
import Liyla from "../assets/Type=Layila.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";

const RecruiterDashboard = () => {
  const progress = {
    yesterdaysProgress: [
      "Your job posting for Software Engineer attracted 392 applicants in just 12 days.",
      "You reviewed 85 candidate profiles and scheduled 5 interviews yesterday.",
    ],
    todaysGoals: [
      "Review applications for Software Engineer (392 pending)",
      "Post a new job for Marketing Manager.",
      "Schedule AI Interview",
    ],
  };
  // 2nd
  const [activeIndex, setActiveIndex] = useState(0);
  const gradientIndex = activeIndex % 5;
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const updatePaginationStyles = (swiper) => {
    const bullets = swiper.pagination.bullets;
    const totalSlides = swiper.slides.length;

    bullets.forEach((bullet, index) => {
      // Reset all bullets to default size
      bullet.style.width = "6px";
      bullet.style.height = "6px";

      // Calculate relative position based on active index
      const relativeIndex =
        (index - swiper.activeIndex + totalSlides) % totalSlides;

      if (
        relativeIndex === 0 ||
        relativeIndex === 1 ||
        relativeIndex === 2 ||
        relativeIndex === 3 ||
        relativeIndex === 4
      ) {
        // Current slide and the next three dots
        bullet.style.width = "12px";
        bullet.style.height = "12px";
      } else if (relativeIndex === 5) {
        // Fifth dot from the active slide
        bullet.style.width = "8px";
        bullet.style.height = "8px";
      }
    });
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      updatePaginationStyles(swiper);

      swiper.on("slideChange", () => {
        updatePaginationStyles(swiper);
      });
    }
  }, []);

  const [jobCards, setJobCards] = useState({
    "UI/UX Designer": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 0,
        applicantsApplied: 0,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Sales Manager": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 0,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Data Scientist": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1560,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Ai Engineer": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1301,
        selectionComplete: 1,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Marketing Manager": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 1,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Sr. Account Manager": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 1,
        aiTechnicalRound: 1,
        shortlistedCandidates: 0,
      },
    },
    "Software Developer": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 1,
        aiTechnicalRound: 1,
        shortlistedCandidates: 0,
      },
    },
  });

  const fetchJobPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/jobs_posted`
      );

      if (response.status === 200) {
        const jobs = response.data;
        const jobData = {};
        jobs.forEach((job) => {
          jobData[job.jobTitle] = {
            postedOn: new Date(job.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            progress: job.Progress,
          };
        });

        setJobCards(jobData);
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const schedule = {
    meet: ["Dhaval Jha | UI/UX Designer | 24th Jan | 11AM"],
    zoom: ["Christine | AI Engineer | 24th Jan | 2PM"],
  };
  const [summaryText, setSummaryText] = useState([
    "You have posted 15 jobs last week, your applicants growth is up by 35%.",
    "Your premium accounts expiring soon in 5 days.",
    "Content writer AI interview is yet to be scheduled.",
  ]);

  // <--------- Data Consts ----------->

  const gradients = [
    "linear-gradient(319deg, #D388FF 5.96%, #4B94F6 95.49%)",
    "linear-gradient(90deg, #B054F6 0%, #FE52B0 100%)",
    "linear-gradient(90deg, #2890FA 0%, #6ED6F5 100%)",
    "linear-gradient(90deg, #FF0F7B 0%, #F89B29 100%)",
    "linear-gradient(94deg, #420167 -0.62%, #241C70 16.07%, #063678 29.18%, #2061F8 62.03%, #2D79F5 84.23%, #0FB3D4 100%)",
  ];

  const pointColors = ["#D388FF", "#FE52B0", "#6ED6F5", "#FF0F7B", "#063678"];

  const scores = {
    "Ai Engineer": {
      aiNonTechnicalRoundAndInterview: {
        postedOn: "12th Dec 2024",
        "Kunal P.": 97,
        "Muskan M.": 96,
        "Gautam K.": 91,
        "Payal R.": 90,
        "Kunal M.": 84,
        "Rahul V.": 83,
      },
    },
    "Sr. Account Manager": {
      aiTechnicalRoundAndInterview: {
        postedOn: "12th Dec 2024",
        "Kunal P.": 98,
        "Muskan M.": 95,
        "Gautam K.": 90,
        "Payal R.": 89,
        "Kunal M.": 84,
        "Rahul V.": 80,
      },
      aiNonTechnicalRoundAndInterview: {
        postedOn: "13th Dec 2024",
        "Aman S.": 95,
        "Riya T.": 89,
        "Vikas J.": 85,
        "Neha G.": 84,
        "Rahul V.": 80,
      },
    },
    "Marketing Manager": {
      aiTechnicalRoundAndInterview: {
        postedOn: "12th Dec 2024",
        "Ananya B.": 97,
        "Rohit S.": 94,
        "Sneha T.": 91,
        "Ishaan D.": 88,
        "Varun K.": 83,
        "Tanya M.": 79,
      },
      aiNonTechnicalRoundAndInterview: {
        postedOn: "13th Dec 2024",
        "Simran P.": 96,
        "Aarav G.": 88,
        "Nikita L.": 87,
        "Kartik N.": 85,
        "Rishi T.": 82,
      },
    },
    "Software Developer": {
      aiTechnicalRoundAndInterview: {
        postedOn: "12th Dec 2024",
        "Divya R.": 99,
        "Aditya K.": 97,
        "Priya J.": 92,
        "Soham P.": 90,
        "Megha S.": 86,
        "Arjun V.": 81,
      },
      aiNonTechnicalRoundAndInterview: {
        postedOn: "13th Dec 2024",
        "Harsh T.": 94,
        "Pooja D.": 91,
        "Naman V.": 87,
        "Ayesha K.": 85,
        "Dhruv M.": 83,
      },
    },
  };

  const roundsList = [
    { label: "Job Posted", key: "jobPosted" },
    { label: "Applicants Applied", key: "applicantsApplied" },
    { label: "Selection Complete", key: "selectionComplete" },
    { label: "Ai Interview Round", key: "aiInterviewRound" },
    { label: "Ai Technical Round", key: "aiTechnicalRound" },
    { label: "Shortlisted Candidates", key: "shortlistedCandidates" },
  ];

  const options = [
    {
      value: "aiNonTechnicalRoundAndInterview",
      label: "AI Non-Technical Round & Interview",
    },
    {
      value: "aiTechnicalRoundAndInterview",
      label: "AI Technical Round & Interview",
    },
  ];

  const markLastActive = (roundData) => {
    let lastActive = null;

    for (const key in roundData) {
      // Skip 'postedOn' and find the latest non-zero value
      if (roundData[key] === 0) {
        lastActive = key;
        break;
      }
    }
    return lastActive || null;
  };

  // Dynamically update rounds with active state
  Object.keys(jobCards).forEach((role) => {
    const lastActiveRound = markLastActive(jobCards[role].progress);
    jobCards[role].isActive = lastActiveRound;
  });

  const textToShow = {
    jobPosted:
      "Your opportunity has gone live AI is spreading the word to top talent !",
    applicantsApplied: `Exciting news! ${
      jobCards[Object.keys(jobCards)[activeIndex]].applicantsApplied
    } eager candidates are vying for this roleAI is analyzing their potential.`,
    selectionComplete:
      "The first cut is in AI has curated the most promising applicants for the next stage.",
  };

  // <------------ Imp --------------->
  const roundsWithGraph = [
    "aiInterviewRound",
    "aiTechnicalRound",
    "shortlistedCandidates",
  ];

  const [openSelect, setOpenSelect] = useState(false);
  const [option, setOption] = useState(options[0].value);

  const toggleDialogOption = () => {
    setOpenSelect(!openSelect);
  };

  const handleChangeOption = (selectedOption) => {
    setOption(selectedOption.value);
    toggleDialogOption();
  };

  const [currentScores, setCurrentScore] = useState();

  useEffect(() => {
    if (
      roundsWithGraph.includes(
        jobCards[Object.keys(jobCards)[activeIndex]].isActive
      )
    ) {
      setCurrentScore(scores[Object.keys(jobCards)[activeIndex]][option]);
    }
  }, [activeIndex, option, jobCards, roundsWithGraph]);

  const lineData = [
    {
      id: "Scores",
      color: "#A5A5CC",
      data: [
        { x: "", y: null }, // Invisible padding point on the left
        ...Object.entries(currentScores || {})
          .filter(([key]) => key !== "postedOn")
          .map(([name, score]) => ({
            x: name,
            y: score,
          })),
        { x: " ", y: null }, // Invisible padding point on the right
      ],
    },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "none",
      border: "none",
      color: "#F5F5F5",
      height: "36px",
      width: "full",
      minWidth: "280px",
      fontWeight: "400",
      boxShadow: "none",
      display: "flex",
      justifySelf: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingRight: "25px",
      ":hover": {
        borderColor: "#EBEBEB",
      },
    }),
    input: (provided) => ({
      ...provided,
      caretColor: "transparent", // This removes the blinking cursor
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      width: "20px",
      height: "20px",
      position: "absolute",
      color: state.isDisabled ? "#A0A0A0" : "#0072DC",
      top: "27%",
      right: "10px",
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed",
      backgroundColor: "#D7D7D7",
      borderRadius: "4px",
      zIndex: 999,
      top: "auto",
      left: "auto",
      fontSize: "18px",
      maxWidth: "280px",
      maxHeight: "280px",
      overflowY: "auto",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#161616",
      fontWeight: "400",
      fontSize: "18px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "#A0A0A0" : "#161616",
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#C3C3EA" : "#EBEBEB",
      color: state.isSelected ? "#1E1E1E" : "#6F6F6F",
      fontWeight: "400",
      padding: "10px 20px",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#EBEBEB",
      },
    }),
  };

  const [isSpeaking, setIsSpeaking] = useState(false); // Track speaking state

  // Function to handle text-to-speech
  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Speech Synthesis not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(summaryText.join(" "));

    // Disable button during speech
    setIsSpeaking(true);

    // Re-enable after speech ends
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    // Handle errors
    utterance.onerror = () => {
      alert("Error during speech synthesis.");
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Function to handle copy-to-clipboard
  const handleCopyToClipboard = () => {
    const textToCopy = summaryText.join("\n");
    navigator.clipboard.writeText(textToCopy).then(
      () => toast.success("Summary copied"),
      (err) => alert("Failed to copy text: " + err)
    );
  };

  const [liylaStatus, setLiylaStatus] = useState(false);
  const conversation = useConversation();

  const toggleLiylaStatus = async () => {
    if (!liylaStatus) {
      const conversationId = await conversation.startSession({
        agentId: import.meta.env.VITE_APP_ELEVENLABS,
      });
      console.log("11 labs activated: ", conversationId);
    } else {
      await conversation.endSession();
    }
    setLiylaStatus((prev) => !prev);
  };

  useEffect(() => {
    const handlePageClick = async () => {
      if (liylaStatus) {
        setLiylaStatus(false);
        await conversation.endSession();
        console.log("11 labs deactivated due to page click");
      }
    };

    document.addEventListener("click", handlePageClick);

    return () => {
      document.removeEventListener("click", handlePageClick);
    };
  }, [liylaStatus, conversation]);

  return (
    <div className="main-container min-h-[100vh] bg-[#F2F2F2] pb-8">
      <ToastContainer position="top-center" autoClose={2000} />

      <Navbar assistant={Liyla} onLiylaActivate={toggleLiylaStatus} />
      <div className="absolute z-50 ml-[82%] -mt-[10%] h-[60%]" onClick={toggleLiylaStatus}>
        {liylaStatus && (
          <Spline
            scene="https://prod.spline.design/dmBccWJHg23ZYriK/scene.splinecode"
          />
        )}
      </div>

      <div className="flex flex-col items-center mt-[26px] px-[6vw]">
        <div className="flex justify-between w-full mb-[32px]">
          <div className="w-[32%] h-[152px] border border-white bg-white rounded-[32px] flex items-center px-[2%] justify-between shadow-[0_0_4px_rgba(0,0,0,0.25)]">
            <p className="font-bold text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#4B94F6] to-[#D388FF]">
              95%
            </p>
            <p className="font-bold text-[20px] text-transparent bg-clip-text bg-gradient-to-r from-[#4B94F6] to-[#D388FF]">
              Cost saved per hire
            </p>
          </div>
          <div className="w-[32%] h-[152px] border border-white bg-white rounded-[32px] flex items-center px-[2%] justify-between shadow-[0_0_4px_rgba(0,0,0,0.25)]">
            <p className="font-bold text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#C86AFF] to-[#FF5FD7]">
              132
            </p>
            <p className="font-bold text-[20px] pl-[10%] pr-[5%] text-transparent bg-clip-text bg-gradient-to-r from-[#C86AFF] to-[#FF5FD7]">
              Work hours saved this month
            </p>
          </div>
          <div className="w-[32%] h-[152px] border border-white bg-white rounded-[32px] flex items-center px-[2%] justify-between shadow-[0_0_4px_rgba(0,0,0,0.25)]">
            <p className="font-bold text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF94B0] to-[#FF5FD7]">
              1
            </p>
            <p className="font-bold text-[20px] pl-[10%] pr-[5%] text-transparent bg-clip-text bg-gradient-to-r from-[#FF94B0] to-[#FF5FD7]">
              HRs required to manage the pipeline
            </p>
          </div>
        </div>
        <div
          className="overflow-hidden"
          style={{
            width: "100%",
            height: 320,
            paddingLeft: 56,
            paddingRight: 56,
            paddingTop: 40,
            paddingBottom: 40,
            background:
              "linear-gradient(302deg, #5C9AFF 0%, #154DD1 75%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)",
            boxShadow: "0px 0px 24px rgba(211, 136, 255, 0.45)",
            borderRadius: 32,
            border: "1px #DCFFFF solid",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 40,
            display: "inline-flex",
          }}
        >
          {/* Yesterday's Progress Section */}
          <div
            style={{
              flex: "1 1 0",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 20,
              display: "inline-flex",
            }}
          >
            <div
              className="font-['SF UI  Display'] text-4xl"
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                lineHeight: "28px",
                wordWrap: "break-word",
              }}
            >
              Yesterday’s Progress
            </div>
            <div
              className="custom-scrollbar"
              style={{
                alignSelf: "stretch",
                height: 198,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 12,
                display: "flex",
                overflowY: "scroll",
                paddingRight: 20,
                boxSizing: "border-box",
              }}
            >
              {progress.yesterdaysProgress.map((item, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 12,
                    paddingBottom: 12,
                    background: "rgba(255, 255, 255, 0.16)",
                    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.25)",
                    borderRadius: 12,
                    backdropFilter: "blur(16px)",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    display: "inline-flex",
                  }}
                >
                  <div style={{ width: 32, height: 32, position: "relative" }}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Medal ">
                        <path
                          id="Vector"
                          d="M16 8.63605C22.6275 8.63605 28 13.8662 28 20.318C28 26.7698 22.6275 32 16 32C9.37258 32 4 26.7698 4 20.318C4 13.8662 9.37258 8.63605 16 8.63605ZM16 13.7469L14.0162 17.6599L9.58038 18.2874L12.7902 21.3333L12.0325 25.6342L16 23.6036L19.9675 25.6342L19.2099 21.3333L22.4197 18.2874L17.9838 17.6599L16 13.7469ZM17.5 1.33334L25 1.3348V5.71555L22.9549 7.37667C21.2958 6.52995 19.4537 5.97672 17.5016 5.78782L17.5 1.33334ZM14.5 1.33334L14.4995 5.7877C12.5476 5.97641 10.7057 6.52944 9.04661 7.37591L7 5.71555V1.3348L14.5 1.33334Z"
                          fill="#C8F5F5"
                        />
                      </g>
                    </svg>
                  </div>
                  <div
                    className="font-['SF UI  Text'] text-[2vh]"
                    style={{
                      flex: "1 1 0",
                      color: "white",
                      fontWeight: "400",
                      lineHeight: "24px",
                      wordWrap: "break-word",
                    }}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Goals Section */}
          <div
            style={{
              flex: "1 1 0",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 20,
              display: "inline-flex",
            }}
          >
            <div
              className="font-['SF UI  Display'] text-4xl"
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                lineHeight: "28px",
                wordWrap: "break-word",
              }}
            >{`Today's Goals`}</div>
            <div
              className="custom-scrollbar"
              style={{
                alignSelf: "stretch",
                height: 198,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 12,
                display: "flex",
                overflowY: "scroll",
                paddingRight: 20,
                boxSizing: "border-box",
              }}
            >
              {progress.todaysGoals.map((goal, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: 20,
                    paddingTop: 12,
                    paddingBottom: 12,
                    background: "rgba(255, 255, 255, 0.16)",
                    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.25)",
                    borderRadius: 12,
                    backdropFilter: "blur(16px)",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{ width: 32, height: 32, position: "relative" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                      >
                        <path
                          d="M16.4993 2.66663C9.15268 2.66663 3.16602 8.65329 3.16602 16C3.16602 23.3466 9.15268 29.3333 16.4993 29.3333C23.846 29.3333 29.8327 23.3466 29.8327 16C29.8327 8.65329 23.846 2.66663 16.4993 2.66663ZM22.2994 20.76C22.1127 21.08 21.7793 21.2533 21.4327 21.2533C21.2593 21.2533 21.086 21.2133 20.926 21.1066L16.7927 18.64C15.766 18.0266 15.006 16.68 15.006 15.4933V10.0266C15.006 9.47996 15.4593 9.02663 16.006 9.02663C16.5527 9.02663 17.006 9.47996 17.006 10.0266V15.4933C17.006 15.9733 17.406 16.68 17.8193 16.92L21.9527 19.3866C22.4327 19.6666 22.5927 20.28 22.2994 20.76Z"
                          fill="#C3C3EA"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="font-['SF UI  Text'] text-[2vh]"
                    style={{
                      flex: "1 1 0",
                      color: "white",
                      fontWeight: "400",
                      lineHeight: "24px",
                      wordWrap: "break-word",
                    }}
                  >
                    {goal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-[3vh] gap-12 w-[100%]">
          {/* <---------------- Score Graph -----------------> */}

          <div
            className="min-h-[540px] w-full max-w-[50vw] py-[2vw] bg-white/30 rounded-[32px] shadow-[0px_0.5vw_1.5vw_0px_rgba(0,0,0,0.25)] border border-[#d388ff] backdrop-blur-lg flex-col justify-start items-start gap-[3vh] inline-flex"
            style={{ paddingInline: "clamp(10px,3vw,40px)" }}
          >
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="w-full flex-col justify-start items-start gap-[1vh] inline-flex pl-2">
                <div className="justify-start items-center gap-[1vw] inline-flex">
                  <div
                    className="text-center text-[#bf4cf9] font-bold font-['SF UI Display']"
                    style={{
                      backgroundImage: gradients[gradientIndex], // Apply gradient as a background image
                      backgroundClip: "text", // Clip the background to the text
                      WebkitBackgroundClip: "text", // For webkit browsers
                      WebkitTextFillColor: "transparent", // For webkit browsers to make text transparent
                      transition: "background-image 0.5s ease", // Smooth transition for background image
                      fontSize: "clamp(28px,4vh,36px)",
                    }}
                  >
                    Top candidates
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-[0.5vh] flex">
                  <div className="self-stretch justify-start items-center inline-flex">
                    <div className="py-[0.5vh] justify-center items-center gap-[1vw] flex">
                      <div className="text-center text-[#6f6f6f] text-2xl font-normal font-['SF UI Text'] leading-[2.8vh]">
                        Job designation&nbsp;
                      </div>
                    </div>
                    <div className="py-[0.5vh] justify-center items-center gap-[1vw] flex">
                      <div className="text-center text-[#6f6f6f] text-2xl font-normal font-['SF UI Text'] leading-[2.8vh]">
                        :&nbsp;
                      </div>
                    </div>
                    <div className="py-[0.5vh] justify-center items-center gap-[1vw] flex">
                      <div
                        className="text-center text-[#bf4cf9] text-2xl font-semibold font-['SF UI Text'] leading-[2.8vh] overflow-hidden whitespace-nowrap text-ellipsis max-w-[11vw]"
                        style={{
                          backgroundImage: gradients[gradientIndex], // Apply gradient as a background image
                          backgroundClip: "text", // Clip the background to the text
                          WebkitBackgroundClip: "text", // For webkit browsers
                          WebkitTextFillColor: "transparent", // For webkit browsers to make text transparent
                          transition: "background-image 0.5s ease", // Smooth transition for background image
                        }}
                      >
                        {Object.keys(jobCards)[activeIndex]}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-[#6f6f6f] text-2xl font-normal font-['SF UI Text'] leading-[2.5vh]">
                    Posted On :{" "}
                    {jobCards[Object.keys(jobCards)[activeIndex]].postedOn}
                  </div>
                </div>
              </div>
              <div className="w-fit px-[1.5vh] mt-1 bg-neutral-100 rounded-[2.5vw] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] justify-start items-center gap-[1vw] flex">
                <Select
                  defaultValue={options[0]} // Set the default value to the first option
                  options={options}
                  styles={customStyles}
                  onChange={handleChangeOption}
                  value={options.find((option) => option.value === option)} // Ensure value fallback to first option
                  isDisabled={
                    !roundsWithGraph.includes(
                      jobCards[Object.keys(jobCards)[activeIndex]].isActive
                    )
                  }
                />
                {/* <div className="w-[3vw] h-[3vw] flex-col justify-center items-center gap-[1vw] inline-flex" /> */}
              </div>
            </div>
            <div className="w-[100%] h-[350px] py-[2vh] bg-none rounded-[24px] shadow-[0px_0.5vw_1.5vw_0px_rgba(0,0,0,0.25)] border border-[#dcffff] flex-col justify-center items-center flex shrink">
              {/* responsive bar code place here */}
              {roundsWithGraph.includes(
                jobCards[Object.keys(jobCards)[activeIndex]].isActive
              ) ? (
                <ResponsiveLine
                  data={lineData}
                  margin={{ top: 40, right: 50, bottom: 60, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{ type: "linear", min: 80, max: 100 }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 10,
                    legend: "Top Candidates",
                    legendPosition: "middle",
                    legendOffset: 45,
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickPadding: 5,
                    legend: "Scores",
                    legendPosition: "middle",
                    legendOffset: -45,
                    tickValues: [80, 85, 90, 95, 100],
                  }}
                  gridXValues={[]}
                  gridYValues={[80, 85, 90, 95, 100]}
                  pointSize={15}
                  pointColor={pointColors[gradientIndex]}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  animation={true}
                  colors={{ datum: "color" }}
                  theme={{
                    axis: {
                      ticks: {
                        text: {
                          fill: "#7d7da4",
                        },
                      },
                      legend: {
                        text: {
                          fontSize: 16,
                          fontWeight: "bold",
                          fill: "#55557C",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="justify-start items-center gap-[1vw] inline-flex px-8">
                  <div
                    className="text-center text-[#bf4cf9] text-[28px] font-bold font-['SF UI Display']"
                    style={{
                      backgroundImage: gradients[gradientIndex],
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      transition: "background-image 0.5s ease",
                    }}
                  >
                    {
                      textToShow[
                        jobCards[Object.keys(jobCards)[activeIndex]].isActive
                      ]
                    }
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <-------------- progress card ---------------> */}
          <div className="w-[35vw] min-w-[360px] overflow-hidden min-h-[540px] h-[50vh] relative bg-white/30 rounded-[32px] py-[24px] pl-[48px] pr-[24px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] border border-[#d388ff] backdrop-blur-lg flex flex-col">
            <style>
              {`
          .swiper-pagination-bullet {
            background-color: #7D7DA4 !important;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.50);
          }

          .swiper-pagination-bullet-active {
            background-color: #2890FA !important;
          }

          .swiper-pagination-bullet.dynamic {
            width: 6px;
            height: 6px;
          }

          .swiper-pagination-bullet.dynamic.large {
            width: 12px;
            height: 12px;
          }

          .swiper-pagination-bullet.dynamic.medium {
            width: 8px;
            height: 8px;
          }
        `}
            </style>
            <Swiper
              ref={swiperRef}
              direction="vertical"
              slidesPerView={1}
              spaceBetween={30}
              pagination={{ clickable: true }}
              onSlideChange={handleSlideChange}
              modules={[Pagination]}
              className="h-full w-full"
            >
              {Object.keys(jobCards).map((jobKey, index) => {
                const job = jobCards[jobKey];

                return (
                  <SwiperSlide key={index}>
                    <div className="h-[102px] flex-col justify-start items-start gap-4 flex">
                      <div className="self-stretch h-[60px] flex-col justify-start items-start flex">
                        <div className="p-1 justify-start items-center gap-2 inline-flex">
                          <div className="text-center text-[#6f6f6f] text-base font-normal font-['SF UI Text'] uppercase leading-none tracking-wide">
                            Progress Report for
                          </div>
                        </div>
                        <div className="self-stretch px-1 justify-start items-center inline-flex">
                          <div className="py-1 justify-center items-center gap-2 flex">
                            <div
                              className="text-center text-[#bf4cf9] font-bold font-['SF UI Display']"
                              style={{
                                backgroundImage: gradients[gradientIndex],
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                transition: "background-image 0.5s ease",
                                fontSize: "clamp(28px,4vh,36px)",
                              }}
                            >
                              {jobKey}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch px-1 justify-start items-center inline-flex">
                        <div className="py-1 justify-center items-center gap-2 flex">
                          <div className="text-center text-[#6f6f6f] text-lg font-normal font-['SF UI Text'] leading-[18px]">
                            Posted on
                          </div>
                        </div>
                        <div className="p-1 justify-center items-center gap-2 flex">
                          <div className="text-center text-[#6f6f6f] text-lg font-normal font-['SF UI Text'] leading-[18px]">
                            :
                          </div>
                        </div>
                        <div className="justify-start items-center gap-1 flex">
                          <div className="py-1 justify-center items-center gap-2 flex">
                            <div className="text-center text-[#6f6f6f] text-lg font-normal font-['SF UI Text'] leading-[18px]">
                              {job?.postedOn || "1 Jan 2025"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-8 flex-col mb-auto justify-start items-start gap-10 inline-flex mt-14 relative">
                      {roundsList.map(({ label, key }) => {
                        const isActive =
                          jobCards[Object.keys(jobCards)[activeIndex]]
                            .isActive === key;
                        const status =
                          job?.progress?.[key] !== 0
                            ? "completed"
                            : isActive
                            ? "active"
                            : "pending";

                        return (
                          <div
                            key={key}
                            className="self-stretch justify-start items-center gap-6 inline-flex"
                          >
                            <div
                              className={`w-[18px] h-[18px] relative rounded-[100px]`}
                              style={{
                                background:
                                  jobCards[Object.keys(jobCards)[activeIndex]]
                                    .isActive === key
                                    ? gradients[gradientIndex]
                                    : status === "pending"
                                    ? "#D7D7FE"
                                    : gradients[gradientIndex],
                                boxShadow:
                                  status === "completed"
                                    ? `0px 2px 12px 0px ${pointColors[activeIndex]}`
                                    : status === "pending"
                                    ? ""
                                    : `0px 2px 12px 0px ${pointColors[activeIndex]}`,
                              }}
                            />
                            <div
                              className={`text-center text-xl font-['SF UI Text'] leading-tight ${
                                status === "completed"
                                  ? "text-[#7D7DA4]"
                                  : status === "pending"
                                  ? "text-[#C3C3EA]"
                                  : ""
                              }`}
                              style={
                                status === "active"
                                  ? {
                                      backgroundImage: gradients[gradientIndex],
                                      backgroundClip: "text",
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      transition: "background-image 0.5s ease",
                                      fontWeight: "bold",
                                    }
                                  : {}
                              }
                            >
                              {key === "applicantsApplied" &&
                              job?.progress?.applicantsApplied !== 0
                                ? `${job?.progress?.applicantsApplied}`
                                : ""}
                              &nbsp;{label}
                            </div>
                          </div>
                        );
                      })}
                      <div className="z-[-1] h-[calc(100%-25px)] w-[1px] bg-[#A5A5CC] left-[20px] top-[0px] absolute flex-col justify-start items-start gap-10 inline-flex"></div>
                    </div>

                    <div className="w-full flex justify-end absolute bottom-[10px]">
                      <div className="h-14 px-5 bg-[#0071db] rounded-[30px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2 inline-flex">
                        <div className="text-center text-white text-2xl font-['SF UI Text'] leading-[18px] cursor-pointer">
                          Intervene
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="flex justify-center items-center my-[3vh] gap-12 w-[100%]">
          {/* <------------------ Scheduled Interview------------------> */}

          <div
            className="w-full max-w-[50vw] p-[2vw] bg-white/30 rounded-[32px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] backdrop-blur-lg flex-col justify-center items-end gap-6 inline-flex flex-grow"
            style={{
              border:
                "0.5px solid var(--Gradients-Gradient-Blue-to-pink, #D388FF)",
            }}
          >
            <div className="self-stretch h-48 flex-col justify-center items-center gap-6 flex">
              <div className="self-stretch h-9 flex-col justify-start items-start flex">
                <div className="self-stretch h-9 flex-col justify-start items-start flex">
                  <div className="p-1 justify-start items-center gap-2 inline-flex">
                    <div className="text-center text-[#55557c] text-[28px] font-bold font-['SF UI Display'] leading-7">
                      Scheduled Interview
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[132px] py-1 flex-col justify-start items-start gap-3 flex">
                {Object.entries(schedule).map(([type, meetings]) =>
                  meetings.map((meeting, index) => (
                    <div
                      key={index}
                      className="self-stretch px-5 py-2 bg-white/30 rounded-xl shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] border border-[#dcffff] justify-start items-center gap-4 inline-flex"
                    >
                      <img
                        className="w-10 h-10 rounded-full shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] border-box"
                        src={type === "meet" ? googleMeet : zoom}
                        alt={type === "meet" ? "Google Meet" : "Zoom"}
                      />
                      <div className="text-[#55557c] text-lg font-normal font-['SF UI  Text'] leading-normal">
                        {meeting}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="h-14 px-5 bg-[#0071db] rounded-[32px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2 inline-flex">
              <div className="text-center text-white text-[18px] font-normal font-['SF UI  Text'] leading-[18px] cursor-pointer">
                Continue
              </div>
            </div>
          </div>

          {/* <------------- AI summary --------------> */}

          <div
            className="w-[35vw] min-w-[360px] px-[32px] py-[36px]"
            style={{
              height: "100%",
              background:
                "linear-gradient(302deg, #5C9AFF 0%, #154DD1 75%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)",
              boxShadow: "0px 0px 24px rgba(211, 136, 255, 0.45)",
              borderRadius: 32,
              border: "1px #DCFFFF solid",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 12,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="self-stretch flex-col justify-start items-start gap-6 flex">
              <div className=" justify-start items-center gap-1 inline-flex">
                <div className="w-8 h-8 pl-1 pr-[2.67px] pt-[1.33px] pb-[1.44px] justify-center items-center flex">
                  <div className="w-[25.33px] h-[29.23px] relative flex items-center justify-center">
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
                  </div>
                </div>
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-center text-white text-3xl font-bold font-['SF UI  Text'] leading-normal">
                    AI Summary
                  </div>
                </div>
              </div>
              <ul className="self-stretch text-white font-normal font-['SF UI  Text'] leading-normal list-disc list-inside">
                {summaryText.map((text, index) => (
                  <li key={index} className="text-xl text-justify">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-stretch justify-end items-center gap-4 inline-flex">
              {/* text to speech ai summary */}
              <button className="bg-none" disabled={isSpeaking}>
                <svg
                  onClick={handleTextToSpeech}
                  className={`rounded ${
                    isSpeaking
                      ? "cursor-not-allowed transform scale-110 transition-transform duration-200"
                      : ""
                  }`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2696 1.07212C13.5606 1.19493 13.7643 1.45693 13.8166 1.76136L13.8298 1.91667V22.0833C13.8298 22.4525 13.6083 22.7858 13.2678 22.9287C12.976 23.0511 12.6457 23.0131 12.3914 22.8368L12.2712 22.7373L6.9075 17.4664H3.74925C2.32021 17.4664 1.14581 16.3758 1.01259 14.9813L1 14.7165V9.23666C1 7.80723 2.09034 6.63251 3.48448 6.49925L3.74925 6.48667H6.90977L12.2739 1.26006C12.5379 1.00288 12.9301 0.928848 13.2696 1.07212ZM18.8476 2.94183L19.0063 3.04963L19.1855 3.20467C19.3008 3.30831 19.4599 3.45844 19.6483 3.65411C20.0246 4.04496 20.5205 4.62088 21.0154 5.37482C22.0059 6.88386 23 9.12045 23 12.0074C23 14.8945 22.0057 17.1278 21.0147 18.6335C20.5196 19.3857 20.0235 19.9599 19.647 20.3495L19.3881 20.6079L19.0458 20.9177L18.9854 20.9674C18.5886 21.2818 18.0108 21.216 17.6965 20.8192C17.4178 20.4672 17.4389 19.9737 17.7242 19.6473L17.961 19.4319C18.0464 19.3555 18.1738 19.2361 18.3292 19.0754C18.6406 18.7531 19.0616 18.267 19.4839 17.6256C20.3272 16.3439 21.1672 14.4558 21.1672 12.0074C21.1672 9.55885 20.3272 7.66678 19.4832 6.38099C19.1313 5.84477 18.7801 5.4165 18.4924 5.10129L18.1823 4.77812L17.8444 4.46753C17.4491 4.15208 17.3829 3.57493 17.698 3.17906C17.9782 2.82701 18.4648 2.7362 18.8476 2.94183ZM17.0162 6.60831L17.1987 6.73616L17.4437 6.96668L17.5427 7.07051C17.7508 7.29496 18.0191 7.62375 18.2849 8.06095C18.8191 8.94008 19.3362 10.248 19.3362 11.9973C19.3362 13.7466 18.8191 15.0559 18.2852 15.9363C18.0198 16.3741 17.7515 16.7038 17.5437 16.9287L17.3575 17.1199L17.2287 17.2391L17.1558 17.3009L17.0395 17.3537C16.7968 17.4509 16.2294 17.6094 15.8679 17.157C15.5884 16.8072 15.6065 16.3157 15.8879 15.988L16.1343 15.7511L16.1974 15.6846C16.334 15.5369 16.5248 15.3045 16.7181 14.9855C17.1023 14.3522 17.5033 13.3678 17.5033 11.9973C17.5033 10.6269 17.1023 9.64456 16.7187 9.01331C16.5737 8.7748 16.4302 8.585 16.3101 8.44301L16.1355 8.25074L16.0099 8.13157C15.6164 7.81766 15.5517 7.24198 15.8666 6.84602C16.1467 6.49385 16.6332 6.40284 17.0162 6.60831Z"
                    fill="white"
                  />
                </svg>
              </button>

              {/* copy ai summary */}
              <svg
                onClick={handleCopyToClipboard}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7368 1H4.10526C2.94211 1 2 1.895 2 3V17H4.10526V3H16.7368V1ZM19.8947 5H8.31579C7.15263 5 6.21053 5.895 6.21053 7V21C6.21053 22.105 7.15263 23 8.31579 23H19.8947C21.0579 23 22 22.105 22 21V7C22 5.895 21.0579 5 19.8947 5ZM19.8947 21H8.31579V7H19.8947V21Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;