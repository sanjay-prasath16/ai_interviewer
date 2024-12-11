import PropTypes from "prop-types";
import Save from "../assets/save.svg";

const Card = ({ index, candidate }) => {
  const generateDots = (progress) => {
    const totalDots = 10;
    const fullDotsCount = Math.floor((progress / 100) * totalDots);
    const hasHalfDot = progress % 10 >= 5;

    return Array.from({ length: totalDots }, (_, index) => {
      if (index < fullDotsCount) {
        return {
          background: "#0071db",
          boxShadow: "0px 0px 8px rgba(0, 113, 219, 0.4)",
        };
      }
      if (index === fullDotsCount && hasHalfDot) {
        return {
          background:
            "linear-gradient(to top left, #004a9f, #0071db, rgba(0, 113, 219, 0.2), #d9d9d9)",
          boxShadow: "0px 0px 8px rgba(0, 113, 219, 0.3)",
        };
      }
      return { background: "#d9d9d9" };
    });
  };

  const getDotPosition = (index, radius = 31) => {
    const angle = ((2.5 - index) / 10) * 2 * Math.PI;
    return {
      left: `${Math.round(radius + radius * Math.cos(angle))}%`,
      top: `${Math.round(radius - radius * Math.sin(angle))}%`,
    };
  };

  return (
    <div 
      className={`w-full md:w-[45%] lg:w-[30%] border border-white bg-white rounded-xl p-[21px] shadow-lg mb-10 ${index === 2 ? "mx-5" : "mx-3"} ${index !== 0 && index !== 3 ? "ml-10" : ""}`}
      style={{ direction: "ltr" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0px 4px 3px rgba(0, 114, 220, 0.3)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div className="flex">
        <img
          src={candidate.src}
          alt={candidate.name}
          className="w-12 h-12 rounded-full shadow-inner"
        />
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <p className="text-[17px] font-medium">{candidate.name}</p>
            <p className="text-xs text-gray-400">
              Applied {candidate.appliedDaysAgo} days ago
            </p>
          </div>
          <p className="text-[#A5A5A7]">
            {candidate.title} at {candidate.location}
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[#A5A5A7]">
              {candidate.experience} years experience
            </p>
            <img src={Save} alt="Save" className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-4 pt-4 relative">
        <div className="flex justify-between">
          {candidate.rounds.map((round, roundIndex) => (
            <div key={roundIndex} className="relative text-center">
              <div className="flex justify-center ml-[10px] mb-[23px]">
                <p className="mt-2 text-[10px] font-semibold text-[#656565]">
                  {round.name}
                </p>
              </div>
              <div className="relative w-[63px] h-[61px] mx-auto">
                {generateDots(round.progress).map((style, index) => (
                  <div
                    key={index}
                    className="absolute w-[12px] h-[12px] rounded-full"
                    style={{
                      ...style,
                      ...getDotPosition(index, 50),
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center ml-[10px] mt-[15px]">
                  <p className="font-bold text-[#767676]">
                    {round.progress}%
                  </p>
                </div>
              </div>
              <p className="text-[#656565] mt-[23px] ml-[10px]">{round.description}</p>
            </div>
          ))}
          <div className="flex flex-col justify-end">
            <p className="text-[40px] text-[#0AA31C] font-semibold mb-[25%]">86%</p>
            <p className="font-semibold">Cumulative score</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-[9px]">
        <p className="font-medium text-[#0072DC] border border-[#0072DC] rounded-full p-[10px] cursor-pointer">View more</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  candidate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    appliedDaysAgo: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    rounds: PropTypes.arrayOf(
      PropTypes.shape({
        progress: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Card;