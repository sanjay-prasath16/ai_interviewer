import { useState } from 'react';
import Star from '../assets/Star confetti.svg';
import Star2 from '../assets/Star confetti2.svg';
import PropTypes from "prop-types";

const DashboardCard = ({ title, update, status, progress, imageUrl, pinned }) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const handleDoubleClick = () => {
    setIsDoubleClicked(!isDoubleClicked);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`border ${pinned ? 'border-[#F26112] sticky top-0 z-10' : 'border-white'} flex p-2 ml-8 rounded-xl mb-5 overflow-y-auto`}
      style={{
        fontFamily: 'Inter',
        backgroundColor: isDoubleClicked ? '#C0E1FF' : 'white',
      }}
    >
      <div>
        <img src={imageUrl} alt="" className="w-[78px] h-[63px]" />
      </div>
      <div className="w-full pl-3">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-[#575757]">{update}</p>
        </div>
        <div className="flex">
          {pinned && <img src={Star} alt="" className="w-5" />}
          <p
            className={`font-light mt-1.5 ${pinned && 'bg-[#ffe38f] border-b-2 border-b-[#F26112]'} inline-block`}
          >
            {status}
          </p>
          {pinned && <img src={Star2} alt="" className="w-5" />}
        </div>
        <p className="text-primary mt-0.5">{progress}</p>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  update: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  pinned: PropTypes.bool.isRequired
}

export default DashboardCard;