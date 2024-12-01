import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Group1 from "../assets/group1.png";
import { Editor } from "@monaco-editor/react";

const Technical = () => {
  const [timer, setTimer] = useState("01:50");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [tempLanguage, setTempLanguage] = useState("python");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const codeEditorRef = useRef("");

  const selectRef = useRef(null);

  const onMount = (editor) => {
    codeEditorRef.current = editor;
    const currentValue = editor.getValue();
    const lines = currentValue.split("\n");
    const nextLine = lines.length + 1;
    editor.setPosition({ lineNumber: nextLine, column: 1 });
    editor.focus();
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      const monaco = await import("monaco-editor");
      const availableLanguages = monaco.languages.getLanguages().map((lang) => ({
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
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1">
        {/* Left side code editor container */}
        <div className="w-[60%] ml-10 mr-5 my-8 rounded-3xl bg-[#1E1E1E] p-5 relative shadow-lg">
          <div className="flex justify-between items-center text-gray-800 mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-white">Language:</h2>
              <select
                ref={selectRef}
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="text-white bg-[#1E1E1E] outline-none font-semibold rounded-md"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label.charAt(0).toUpperCase() + lang.label.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-[#0072DC] border border-gray-border p-4 rounded-3xl px-2 py-1">{`Timer: ${timer}`}</span>
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
              }}
                
            />

          </div>
          <div className="absolute bottom-[-60px] left-[-10px] w-32 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-lg">
            <Webcam audio={false} className="w-full h-full object-cover" />
          </div>
          <img
            src={Group1}
            alt="Icon"
            className="h-32 w-32 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          />
        </div>
        <div className="w-[40%] flex flex-col justify-between my-8 mr-10 space-y-5">
          <div className="h-[50%] bg-[#0F0F36] rounded-3xl p-5 text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Question</h3>
            <p>
              You are developing a system for a bookstore to manage its
              inventory. The bookstore has a unique way of organizing books:
              they are arranged in a circular queue, where the front of the
              queue connects back to the rear. Each book in the queue has a
              title and a price. The store owner wants to implement a feature
              that finds the most expensive book within a given range of the
              queue, considering its circular nature. Write a function that
              takes the circular queue of books, a start position, and the
              number of books to consider, and returns the title of the most
              expensive book within that range.
            </p>
          </div>
          <div className="h-[50%] bg-[#EDF1FF] rounded-3xl p-5 text-gray-800 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Example:</h3>
            <p>
              {`Input Queue: [("The Hobbit", 15), ("1984", 10), ("To Kill a
              Mockingbird", 12), ("Pride and Prejudice", 9), ("The Great
              Gatsby", 11)], Start: 2, Range: 4`}
            </p>
            <p className="mt-4 font-semibold">Output: The Hobbit</p>
            <p className="text-gray-600 mt-2">
              {`Explanation: Starting from "To Kill a Mockingbird", considering 4
              books, we wrap around to "The Hobbit", which is the most expensive
              at $15.`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mr-10 mb-4">
        <button className="bg-red-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-red-600">
          Recording
        </button>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600">
          Next
        </button>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Change Language?</h2>
            <p>Changing the language will erase the current code. Do you want to proceed?</p>
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
    </div>
  );
};

export default Technical;