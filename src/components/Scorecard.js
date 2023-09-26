import React from "react";

const Scorecard = ({ score, totalQuestions }) => {
  return (
    <div className="scorecard text-center p-10 bg-white shadow-md rounded-md">
      <h2 className="text-4xl font-semibold mb-4">Your Score</h2>
      <div className="mt-16 mb-8">
        <p className="text-lg">Total Questions: 10</p>
        <p className="text-lg">Correct Answers: {score} </p>
        <p className="text-lg">Incorrect Answers: {totalQuestions - score}</p>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Scorecard;
