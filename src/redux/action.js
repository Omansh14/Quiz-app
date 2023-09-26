import axios from "axios";

export const marks = (data) => {
  return {
    type: "ADD_MARKS",
    payload: data,
  };
};


export const fetchQuizData = () => {
  return (dispatch) => {
    dispatch({ type: "REQUEST_QUIZ_DATA" });

    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((res) => {
        const data = res.data.results;
        const mappedData = data.map((item) => ({
          ...{...item, options: [item.correct_answer, ...item.incorrect_answers]},
          answered: false,
        }));
        dispatch({ type: "RECEIVE_QUIZ_DATA", payload: mappedData });
      })
      .catch((err) => {
        dispatch({ type: "ERROR_QUIZ_DATA", payload: err.message });
      });
  };
};
