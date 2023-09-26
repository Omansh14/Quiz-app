import React, { useEffect } from 'react';
import Quiz from './components/Quiz';
import { useDispatch } from 'react-redux';
import { fetchQuizData } from './redux/action';
// import Scorecard from './components/Scorecard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizData());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Quiz />
      {/* <Scorecard/> */}
    </div>
  );
}

export default App;