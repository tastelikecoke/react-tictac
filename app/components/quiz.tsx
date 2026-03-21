import { useState } from "react"


export type QuizQuestion = {
  question: string;
  answer: string;
  choices: [string];
}

export default function Quiz({questions}: {questions: [QuizQuestion]}) {
  const[quizState, setQuizState] = useState("question")
  const[selected, setSelected] = useState("")
  const[question, setQuestion] = useState(questions[0])
  const[qIndex, setQIndex] = useState(0)
  const[score, setScore] = useState(0)
  

  function submitHandler() {
    if (quizState === "question") {
      setQuizState("answer")
    }
    else if (quizState === "answer") {
      if (selected === question.answer) {
        setScore(score + 1)
      }
      if (questions.length <= qIndex + 1) {
        setQIndex(qIndex + 1)
        setQuizState("finished")
        setSelected('')
      }
      else {
        setQIndex(qIndex + 1)
        setQuizState("question")
        setSelected('')
        setQuestion(questions[qIndex + 1])
      }
    }
  }
  function selectHandler(choice: string) {
    if (quizState === "question") {
      setSelected(choice)
    }
  }
  function changeInputHandler(e) {
    if (quizState === "question") {
      setSelected(e.target.value)
    }
  }
  function resetHandler() {
    setQIndex(0)
    setQuizState("question")
    setSelected('')
    setQuestion(questions[0])
    setScore(0)
  }

  return <div className="quiz">
    <header>
      <section className="top">
        <span className="header-text">Quiz</span>
        <span className="expander"></span>
        {quizState !== "finished" &&
          <span className="header-score">{qIndex + 1}/{questions.length}</span>
        }
      </section>
      <section className="progress-bar">
        <div className="progress-fill" style={{width: `${1 + (qIndex / questions.length)*99}%`}}></div>
      </section>
    </header>
    <main>
      {
        quizState === "finished" ?
        <>
          <div className="finished">Quiz finished! {score}/{questions.length}</div>
        
          <div className="below">
            <button onClick={resetHandler}>Try Again</button>
          </div>
        </>
        :
        <>
          <div className="question">
            {question.question}
          </div>
          {question.choices && question.choices.map((choice: string) =>
            <div
              key={choice}
              className={`choice ${selected === choice ? 'selected':''} ${quizState === 'answer' ? 'answering':''} ${quizState === 'answer' && choice === question.answer ? 'answer':''}`}
              onClick={() => selectHandler(choice)}>
              {choice}
            </div>
          )}
          {
            !question.choices &&
            <>
              {
              quizState === 'question' ?
                <div className="input-choice">
                  <input type="text" onChange={changeInputHandler} placeholder="Answer here..."></input>
                </div>
              :
              <div className={`choice answering selected ${quizState === 'answer' && selected === question.answer ? 'answer':''}`}>
                {selected}
              </div>
              }
            </>
          }
          {selected !== '' && 
            <div className="below">
              <button onClick={submitHandler}>{ quizState === "question" ? "Submit" : "Next"}</button>
            </div>
          }
        </>
      }
    </main>
  </div>
}