import { useState, useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import JupiterActivatedState from "../Components/jupiterActivatedState";
import PracticeSimulationQuestion from "../Components/PracticeSimulationQuestion";
import Timer from "../assets/Timer.svg";

const TechnicalPracticeSimulation = () => {
  const [timer, setTimer] = useState(15 * 60);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [tempLanguage, setTempLanguage] = useState("python");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const codeEditorRef = useRef(null);
  const decorationRef = useRef([]);
  const selectRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const onMount = (editor) => {
    codeEditorRef.current = editor;
    updateActiveLineDecoration(editor, 1);
    editor.setPosition({ lineNumber: 1, column: 1 });

    editor.onDidChangeCursorPosition(() => {
      const currentPosition = editor.getPosition();
      if (currentPosition) {
        updateActiveLineDecoration(editor, currentPosition.lineNumber);
      }
    });
  };

  const updateActiveLineDecoration = (editor, activeLine) => {
    decorationRef.current = editor.deltaDecorations(decorationRef.current, [
      {
        range: new monaco.Range(activeLine, 1, activeLine, 1),
        options: {
          isWholeLine: true,
          className: "active-line-highlight",
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      const monaco = await import("monaco-editor");
      const availableLanguages = monaco.languages
        .getLanguages()
        .map((lang) => ({
          label: lang.id,
          value: lang.id,
        }));
      setLanguages(availableLanguages);

      if (availableLanguages.some((lang) => lang.value === "python")) {
        setSelectedLanguage("python");
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (selectRef.current) {
      const text = selectedLanguage;
      const tempElement = document.createElement("span");
      tempElement.style.visibility = "hidden";
      tempElement.style.position = "absolute";
      tempElement.style.font = window.getComputedStyle(selectRef.current).font;
      tempElement.textContent = text;

      document.body.appendChild(tempElement);
      selectRef.current.style.width = `${tempElement.offsetWidth + 40}px`;
      document.body.removeChild(tempElement);
    }
  }, [selectedLanguage]);

  const handleLanguageChange = (newLanguage) => {
    if (codeEditorRef.current?.getValue()?.trim()) {
      setTempLanguage(newLanguage);
      setIsPopupVisible(true);
    } else {
      setSelectedLanguage(newLanguage);
    }
  };

  const handlePopupAction = (action) => {
    if (action === "ok") {
      codeEditorRef.current?.setValue("");
      setSelectedLanguage(tempLanguage);
    }
    setIsPopupVisible(false);
  };

  return (
    <div className="relative h-screen w-screen bg-[#0E0E0E] overflow-hidden">
      <div className="absolute -left-[5%] top-[60%] -translate-y-1/2 w-[35%] h-[70%] rounded-full bg-gradient-radial from-blue-400/50 via-blue-500/70 to-transparent blur-2xl" />
      <div className="absolute -right-[5%] top-[40%] -translate-y-1/2 w-[35%] h-[70%] rounded-full bg-gradient-radial from-purple-500/50 via-purple-600/70 to-transparent blur-2xl" />
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative h-full flex">
        <div
          className="w-[50%] h-[80%] ml-10 mr-5 my-8 rounded-3xl bg-black bg-opacity-50 p-5 relative shadow-lg"
          style={{
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex justify-between items-center text-gray-800 mb-4 pb-5 border-b border-b-[#505050]">
            <div className="flex items-center space-x-2">
              <h2 className="text-[18px] font-semibold text-white">
                Language:
              </h2>
              <select
                ref={selectRef}
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="text-white bg-black outline-none font-semibold rounded-md text-[18px]"
              >
                {languages.map((lang) => (
                  <option
                    key={lang.value}
                    value={lang.value}
                    className="text-[18px]"
                  >
                    {lang.label.charAt(0).toUpperCase() + lang.label.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-white border border-[#FFFFFF] rounded-full p-3 px-5 text-[20px] font-medium flex">
              <img src={Timer} alt="" className="w-[23px] h-[24px] mt-1 mr-2" />
              Timer: {formatTimer(timer)}
            </span>
          </div>
          <div className="h-full">
            <Editor
              height="80%"
              language={selectedLanguage}
              defaultValue="// Write your code here..."
              theme="vs-dark"
              onMount={onMount}
              options={{
                minimap: { enabled: false },
                fontSize: "30px",
                fontFamily: "'regular', Consolas, 'Courier New', monospace",
                cursorBlinking: "smooth",
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                renderLineHighlight: "none",
                smoothScrolling: true,
                scrollBeyondLastLine: false,
                letterSpacing: 1.5,
              }}
            />
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center relative">
          <motion.div
            className="w-full h-[90%] relative rounded-3xl"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Front Side: PracticeSimulationQuestion */}
            <div
              className={`absolute w-full h-[90%] backface-hidden ${
                isFlipped ? "hidden" : "block"
              }`}
            >
              <PracticeSimulationQuestion onSmallJupiterClick={handleToggle} />
            </div>

            {/* Back Side: JupiterActivatedState */}
            <div
              className={`absolute w-full h-[90%] backface-hidden ${
                isFlipped ? "block" : "hidden"
              }`}
              style={{ transform: "rotateY(180deg)" }}
            >
              <JupiterActivatedState onEnlargedJupiterClick={handleToggle} />
            </div>
          </motion.div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Change Language?</h2>
            <p>
              Changing the language will erase the current code. Do you want to
              proceed?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handlePopupAction("cancel")}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePopupAction("ok")}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-10 right-10">
        <button className="border border-[#7403D0] bg-[#7403D0] rounded-full px-10 py-2 text-white text-[14px] font-medium shadow-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default TechnicalPracticeSimulation;