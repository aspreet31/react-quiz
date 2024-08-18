import { createContext, useContext,useReducer ,useEffect} from "react";
const SECOND = 30;
const BASE_URL = "/questions.json";
//1 step to create context
const QuizContext = createContext();
//2 to provide value 
const initialState = {
  questions: [],
  //loading , error , ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECOND,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        secondRemaining: state.questions.length * SECOND,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}
function QuizProvider({children}){
      const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => curr.points + prev,
    0
  );
  
  useEffect(function () {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
     
    return (<QuizContext.Provider value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        numQuestions,maxPossiblePoints,
        dispatch
    }}>{children}
    </QuizContext.Provider>)
}

function useQuiz(){
    const context = useContext(QuizContext);
    if(context===undefined) throw new Error("Context is out of scope");
    
    return context;
}

export {QuizProvider,useQuiz}
