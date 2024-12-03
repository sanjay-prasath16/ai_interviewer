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
      left: `${Math.round(radius + radius * Math.cos(angle))}px`,
      top: `${Math.round(radius - radius * Math.sin(angle))}px`,
    };
  };

  return (
    <div
      className={`w-[392px] h-[317px] relative bg-white rounded-[20px] shadow ${
        index === 2 ? "mx-5 mb-14" : "mx-3 mb-2"
      }
      ${index !== 0 && index !== 3 ? "ml-10" : ""}`}
      style={{ direction: "ltr" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0px 4px 3px rgba(0, 114, 220, 0.3)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div className={`h-[67px] left-[20px] top-[20px] absolute flex-col justify-center gap-2 inline-flex`}>
        <div className="w-[352px] h-[59px] relative justify-start items-start flex">
          <div className="pb-0.5 justify-center items-start gap-[9px] inline-flex">
            <img
              className="w-[45px] h-[45px] rounded-full shadow-inner"
              src={candidate.src}
              alt="Profile"
            />
            <div className="w-[166px] self-stretch flex-col justify-start items-start gap-[5px] inline-flex">
              <div className="self-stretch h-5 text-black text-[17px] font-medium">
                {candidate.name}
              </div>
              <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
                <div className="w-[178px] text-[#a5a5a7] text-[12px] font-normal mt-2">
                  {candidate.title} at {candidate.location}
                </div>
                <div className="self-stretch text-[#a5a5a7] text-[12px] font-normal">
                  {candidate.experience} years experience
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#a5a5a7] text-[10px] font-normal mt-1.5 ml-8">
            Applied {candidate.appliedDaysAgo} days ago
            <img src={Save} alt="" className="ml-20 mt-7" />
          </div>
        </div>
        <div className="w-[352px] h-[0px] border border-[#cacaca]"></div>
      </div>
      <div className="w-[88px] h-[46px] left-[286px] top-[149px] absolute text-[#09a31b] text-[40px] font-semibold">
        86%
      </div>
      {candidate.rounds.map((round, roundIndex) => (
        <div
          key={roundIndex}
          className="w-[69px] h-[132px] absolute"
          style={{ left: `${20 + roundIndex * 135}px`, top: "111px" }}
        >
          <div className="w-[63px] h-[61.66px] left-[1px] top-[31.66px] absolute">
            {generateDots(round.progress).map((style, index) => (
              <div
                key={index}
                className="w-[12.06px] h-[12.06px] absolute rounded-full"
                style={{
                  ...style,
                  ...getDotPosition(index, 25),
                }}
              />
            ))}
          </div>
          <div className="w-[27px] h-3.5 left-[21px] top-[58px] absolute text-center text-[#757575] text-xs font-bold">
            {round.progress}%
          </div>
          <div className="w-14 h-3 left-[11px] top-0 absolute text-center text-[#656565] text-[10px] font-normal">
            {round.name}
          </div>
          <div className="w-[75px] h-3 left-0 top-[120px] absolute text-[#656565] text-[12px] font-normal">
            {round.description}
          </div>
        </div>
      ))}
      <div className="w-[107px] h-[19px] left-[268px] top-[232px] absolute text-center text-black text-[12px] font-semibold">
        Cumulative score
      </div>
      <div className="w-[83px] h-8 px-px left-[289px] top-[262px] absolute justify-center items-center inline-flex">
        <div className="p-2.5 rounded-[30px] border border-[#0071db] justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-[#0071db] text-xs font-medium leading-[14px]">
            View more
          </div>
        </div>
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