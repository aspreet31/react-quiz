import { useQuiz } from "../context/QuizContext"

export default function Progress(){
    const {index,points,answer,numQuestions,maxPossiblePoints}=useQuiz();
   
    return <header className="progress">
        <progress max={numQuestions} value={index + Number(answer !== null)}/>
        <p>Question <strong>{index+1}</strong>/{numQuestions}</p>
        <p><strong>{points}</strong>/{maxPossiblePoints} points</p>
    </header>
}