import { useState } from "react";

const SkillDisplay = ({ skills }) => {
  const [hover, setHover] = useState(false);
  const visibleSkills = skills.slice(0, 4);
  const remainingSkills = skills.slice(4);

  return (
    <div className="relative inline-block">
      {/* Display visible skills (up to 4) */}
      {visibleSkills.map((skill, idx) => (
        <span
          key={idx}
          className="inline-block rounded bg-gray-100 px-2 py-1 mr-2 text-xs font-medium text-gray-600"
        >
          {skill}
        </span>
      ))}
      {/* Show remaining skills as +N if there are more than 4 */}
      {remainingSkills.length > 0 && (
        <span
          className={`inline-block ml-2 cursor-pointer px-2 py-1 text-xs font-medium text-gray-600 ${
            hover ? "underline" : ""
          }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {`${remainingSkills.length}+`}
        </span>
      )}
      {/* Display hidden skills on hover */}
      {hover && (
        <div className="absolute left-0 mt-2 w-auto rounded-lg border border-gray-100 bg-white p-3 shadow-xl z-10">
          {/* Display skills in a 2-column grid */}
          <div className="grid grid-cols-2 gap-2">
            {remainingSkills.map((skill, idx) => (
              <p
                key={idx}
                className="px-2 py-1 text-xs font-medium text-gray-600 border border-gray-200 bg-gray-200 rounded"
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

export default SkillDisplay;