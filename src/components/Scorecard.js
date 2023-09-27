import React from "react";
import { useSelector } from "react-redux";

const Scorecard = () => {
  const score = useSelector((state) => state.app.score);
  return (
    <div className="scorecard text-center p-10 bg-white shadow-md rounded-md">
      <h2 className="text-4xl font-semibold mb-4">Scorecard</h2>
      <div className="mt-8 mb-8">
        <p className="text-lg">Total Questions: 10</p>
        <p className="text-lg">Total Score: 50 </p>
        <p className="text-lg">Your Score: {score} </p>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Scorecard;
