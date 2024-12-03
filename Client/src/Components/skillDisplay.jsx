import PropTypes from "prop-types";
import { useState } from "react";

const SkillDisplay = ({ skills }) => {
  const [hover, setHover] = useState(false);
  const visibleSkills = skills.slice(0, 3);
  const remainingSkills = skills.slice(3);

  return (
    <div className="relative inline-block">
      {visibleSkills.map((skill, idx) => (
        <span
          key={idx}
          className="inline-block rounded bg-gray-100 p-2 mr-2 text-[14px] font-medium"
        >
          {skill}
        </span>
      ))}
      {remainingSkills.length > 0 && (
        <span
          className={`inline-block ml-2 cursor-pointer px-2 py-1 ${
            hover ? "underline" : ""
          }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {`${remainingSkills.length}+`}
        </span>
      )}
      {hover && (
        <div className={`absolute left-0 mt-2 rounded-lg border border-gray-100 bg-white p-3 shadow-xl z-10`}>
          <div className="grid grid-cols-2 gap-2">
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
};

export default SkillDisplay;