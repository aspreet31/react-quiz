import React from 'react'
import { useQuiz } from '../context/QuizContext';
export default function Options({question}) {
  const {answer,dispatch}=useQuiz();
  const hasAnswer = answer != null;
  return (
    <div className="options">
    {question.options.map((option,index)=><button className={`btn btn-option ${index===answer? "answer":"" } ${hasAnswer ? index===question.correctOption ?"correct":"wrong":""}`} disabled={answer != null} onClick={()=>dispatch({type:"newAnswer",payload:index})} key={option}>{option}</button>)}
    </div>
  )
}
