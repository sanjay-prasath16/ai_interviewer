import smallJupitericon from "../assets/smallJupiter.png";
import PropTypes from "prop-types";

const PracticeSimulationQuestion = ({ onSmallJupiterClick }) => {
  return (
    <div className="w-[95%] h-full flex flex-col bg-transparent pl-5 text-red-700">
      <div className="flex h-[50%] relative">
        <div className="relative flex-grow">
          <div className="p-5 pl-10 rounded-[30px] questionBox relative overflow-hidden">
          <div className="absolute inset-0 rounded-[30px] bg-black opacity-[50%] cutout-box"></div>
            <div className="relative z-10 flex flex-col">
              <div className="absolute -top-5 -right-5 flex items-end">
                <img
                  className="relative h-[60px] w-[60px] cursor-pointer"
                  src={smallJupitericon}
                  alt=""
                  onClick={onSmallJupiterClick}
                />
              </div>
              <div className="text-[24px] pb-4 font-bold text-white">
                <h1>1 Question</h1>
              </div>
              <div className="mr-10 text-[16px] text-base leading-[22px] text-justify text-white">
                <p>
                  You are developing a system for a bookstore to manage its
                  inventory. The bookstore has a unique way of organizing books:
                  they are arranged in a circular queue, where the front of the
                  queue connects back to the rear. Each book in the queue has a
                  title and a price. The store owner wants to implement a
                  feature that finds the most expensive book within a given
                  range of the queue, considering its circular nature. Write a
                  function that takes the circular queue of books, a start
                  position, and the number of books to consider, and returns the
                  title of the most expensive book within that range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[45%] flex-col rounded-[30px]">
        <div className="relative flex-grow">
          <div className="absolute inset-0 rounded-[30px] bg-[#3E3B41] opacity-[40%]"></div>
          <div className="relative z-10 flex flex-col pl-10 pr-10">
            <div className="flex">
              <h1 className="text-[24px] pt-[2rem] pb-[2rem] text-white">
                Example:
              </h1>
            </div>
            <div className="flex flex-col text-[16px] text-base leading-[22px] text-white">
              <div className="flex pb-[2rem]">
                <p>
                  {`Input: Queue: [{'The Hobbit', 15}, ('1984', 10), ('To Kill a Mockingbird', 12), ('Pride and Prejudice', 9), ('The Great Gatsby', 11)] , Start: 2, Range: 4`}
                </p>
              </div>
              <div className="flex flex-col">
                <p>Output: The Hobbit</p>
                <p>
                  {`Explanation: Starting from ‘To Kill a Mockingbird’, considering 4 books, we wrap around to ‘The Hobbit’, which is the most expensive is $15.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PracticeSimulationQuestion.propTypes = {
  onSmallJupiterClick: PropTypes.func.isRequired,
};

export default PracticeSimulationQuestion;