import React from "react";
import Rectangle_7172grilimg from "../assets/Rectangle_7172grilimg.png";
const Card1 = () => {
  return (
    <div className="relative rounded-3xl w-full max-w-4xl mx-auto p-4">
      <div
        className="rounded-3xl bg-cover bg-center h-96 relative flex"
        style={{
          backgroundImage: "url('Rectangle_7172grilimg')", // Ensure 'car.png' is also in the public folder
        }}>
        <div className="absolute inset-0 bg-custom-gradient rounded-3xl"></div>
        <div className="relative p-6 text-white">
          <h2 className="text-2xl font-bold mb-32">
            Courses to upgrade your Skill Stack <br /> score
          </h2>
          <h3 className="text-lg mt-32 mb-4 font-semibold">
            Basics of Machine Learning
          </h3>
          <p className="text-md mb-3">
            Lorem ipsum dolor sit amet, consectetur amet Lorem
            <br /> ipsum dolor sit amet.
          </p>
          <div className="flex items-center text-sm space-x-4">
            <div className="flex items-center">
              <img
                src="/assets/clock.png"
                alt="Clock Icon"
                className="w-5 h-5 mr-1"
              />
              2 hours 30 minutes
            </div>
            <div className="flex items-center">
              <img
                src="/assets/level.png"
                alt="Level Icon"
                className="w-5 h-5 mr-1"
              />
              Up to +25 points
            </div>
          </div>
        </div>
      </div>
      <button className="absolute bottom-4 right-4 text-white rounded-full border border-white px-2 py-2 m-5 text-sm hover:bg-green-200 hover:text-black">
        View More
      </button>
    </div>
  );
};

export default Card1;
