import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Quiz = ({ setShowScoreCard }) => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Store selected options for each question
  const [selectedOptions, setSelectedOptions] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const quizList = useSelector((state) => state.app.quiz);
  let score = useSelector((state) => state.app.score);

  useEffect(() => {
    // Shuffle the options array when the current question changes
    const options = quizList[currentQuestion]?.options.slice();
    shuffleArray(options);
    setShuffledOptions(options);
  }, [quizList, currentQuestion]);

  const shuffleArray = (array) => {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleOptionSelect = (option) => {
    // Store the selected option for the current question
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: option,
    });
    const prev = quizList;
    prev[currentQuestion].answer = option;
    if (option === quizList[currentQuestion].correct_answer) {
      score += 5;
    } else {
      score -= 1;
    }
    dispatch({ type: "ADD_SCORE", payload: score });
    dispatch({ type: "RECEIVE_QUIZ_DATA", payload: prev });
  };

  const handleNextQuestion = () => {
    if (selectedOptions[currentQuestion] !== undefined) {
      // Move to the next question
      setSelectedOptions({
        ...selectedOptions,
        [currentQuestion]: selectedOptions[currentQuestion],
      });
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevQuestion = () => {
    // Move to the previous question if not on the first question
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div>
      <div className="relative">
        <h1 className="text-2xl font-semibold mb-4 text-white bg-gray-700 p-5">
          Quiz App
        </h1>
        <div className="bg-white rounded-lg shadow-md p-7 h-96">
          <div className="mb-4">
            <p className="text-lg font-medium mb-2">
              {quizList[currentQuestion]?.question}
            </p>
            {shuffledOptions?.map((option, index) => (
              <label key={index} className="block my-2">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOptions[currentQuestion] === option}
                  onChange={() => handleOptionSelect(option)}
                  className="mr-2"
                  disabled={selectedOptions[currentQuestion] !== undefined}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="flex justify-between absolute bottom-5 w-11/12">
            <div className="flex justify-start gap-4">
              <button
                className={`bg-blue-700 text-white font-semibold border py-2 px-5 rounded-lg ${
                  currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className={`bg-green-700 text-white font-semibold border py-2 px-5 rounded-lg ${
                  selectedOptions[currentQuestion] === undefined ||
                  currentQuestion === quizList.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleNextQuestion}
                disabled={currentQuestion === quizList.length - 1}
              >
                Next
              </button>
            </div>
            <button
              className={`bg-gray-700 text-white font-semibold border py-2 px-5 rounded-lg ${
                quizList[quizList.length - 1].answer === ""
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={quizList[quizList.length - 1].answer === ""}
              onClick={() => setShowScoreCard(true)}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
