import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

const SkillDisplay = ({ skills, tableBGColor }) => {
  const [hover, setHover] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const visibleSkills = skills.slice(0, 3);
  const remainingSkills = skills.slice(3);
  const containerRef = useRef(null);
  const hoverRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setHover(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setHover(false), 300);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div 
      className="relative inline-block" 
      ref={containerRef}
    >
      {visibleSkills.map((skill, idx) => (
        <span
          key={idx}
          className={`inline-block rounded p-2 mr-2 text-[14px] font-medium bg-[#F3F3F3] pointer-events-none ${tableBGColor ? "text-black" : "text-[#656565]"}`}
        >
          {skill}
        </span>
      ))}
      {remainingSkills.length > 0 && (
        <span
          className={`inline-block ml-2 cursor-pointer px-2 py-1 z-[99999] relative ${
            hover ? "underline" : ""
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {`${remainingSkills.length}+`}
        </span>
      )}
      {hover && (
        <div
          ref={hoverRef}
          className="fixed rounded-lg border border-gray-100 bg-white p-3 shadow-xl z-[999999]"
          style={{
            zIndex: 99999,
            left: containerRef.current ? 
              `${containerRef.current.getBoundingClientRect().left}px` : 0,
            top: containerRef.current ? 
              `${containerRef.current.getBoundingClientRect().bottom + 8}px` : 0
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid grid-cols-2 gap-2 z-50">
            {remainingSkills.map((skill, idx) => (
              <p
                key={idx}
                className="px-2 py-1 border border-gray-100 bg-gray-100 rounded text-[14px] font-medium"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

SkillDisplay.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableBGColor: PropTypes.bool,
};

export default SkillDisplay;