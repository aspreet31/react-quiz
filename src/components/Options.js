import React from 'react'
export default function Options({question,answer,dispatch}) {
  const hasAnswer = answer != null;
  return (
    <div className="options">
    {question.options.map((option,index)=><button className={`btn btn-option ${index===answer? "answer":"" } ${hasAnswer ? index===question.correctOption ?"correct":"wrong":""}`} disabled={answer != null} onClick={()=>dispatch({type:"newAnswer",payload:index})} key={option}>{option}</button>)}
    </div>
  )
}
