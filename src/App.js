import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizData } from "./redux/action";
import Scorecard from "./components/Scorecard";

function App() {
  const dispatch = useDispatch();
  const [showScoreCard, setShowScoreCard] = useState(false);
  const loadingState = useSelector((state) => state.app.loadingState);

  useEffect(() => {
    dispatch(fetchQuizData());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {loadingState === "LOADED" ? (
        <>
          <Quiz setShowScoreCard={setShowScoreCard} />
          {showScoreCard ? <Scorecard /> : null}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Loading Quiz...</p>
        </div>
      )}
    </div>
  );
}

export default App;
