import Header from "./Header";
import Error from "./Error";
import Loader from "./Loader";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../context/QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (<div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finish" && <Finish />}
      </Main>
    </div>
  );
}
