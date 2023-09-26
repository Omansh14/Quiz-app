import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Fetch quiz data from the API and set it in the state
    async function fetchQuizData() {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10');
        const quizQuestions = response.data.results;
        // Shuffle the correct answer into the options randomly
        const shuffledQuestions = quizQuestions.map((question) => {
          const options = [...question.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          options.splice(randomIndex, 0, question.correct_answer);
          return {
            ...question,
            options,
          };
        });
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    }

    fetchQuizData();
  }, []);

  const handleOptionSelect = (option) => {
    // Allow selecting an option only if no option is already selected
    if (selectedOption === null) {
      setSelectedOption(option);
    }
  };

  console.log(selectedOption);
  const handleNextQuestion = () => {
    // Check if an option is selected before moving to the next question
    if (selectedOption !== null) {
      // Logic for calculating and storing the score
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Reset selected option
    }
  };

  const handlePrevQuestion = () => {
    // Move to the previous question if not on the first question
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null); // Reset selected option
    }
  };

  return (
    <div>
      {questions.length > 0 ? (
        <div className='relative'>
          <h1 className="text-2xl font-semibold mb-4 text-white bg-gray-700 p-5">Quiz App</h1>
          <div className="bg-white rounded-lg shadow-md p-7 h-96">
            <div className="mb-4">
              <p className="text-lg font-medium mb-2">
                {questions[currentQuestion].question}
              </p>
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className="block my-2"
                >
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between absolute bottom-5 w-11/12">
              <div className='flex justify-start gap-4'>
              <button
                className={`bg-blue-700 text-white font-semibold border py-2 px-5 rounded-lg ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0 || selectedOption !== null}
              >
                Previous
              </button>
              <button
                className={`bg-green-700 text-white font-semibold border py-2 px-5 rounded-lg ${selectedOption === null || currentQuestion === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleNextQuestion}
                disabled={selectedOption === null || currentQuestion === questions.length - 1}
              >
                Next
              </button>
              </div>
              <button className="bg-gray-700 text-white font-semibold border py-2 px-5 rounded-lg">Submit</button>
            </div>
            </div>
          </div>
      ) : (
        <p>Loading quiz data...</p>
      )}
    </div>
  );
}

export default Quiz;
