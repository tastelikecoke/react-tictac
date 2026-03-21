import { useState } from "react"

const questions = [
  {
    question: "にちの漢字はなんだ？",
    answer: "日",
    choices: ["二","日","人"]
  },
  {
    question: "ひとの漢字はなんだ？",
    answer: "人",
    choices: ["人","入","品"]
  }
]
function randomizedQuestion(question: any) {
  return {
    ...question,
    choices: question.choices.toSorted((a,b) => Math.random()-0.5),
  }
}

export default function Quiz() {
  const[quizState, setQuizState] = useState("question")
  const[selected, setSelected] = useState("")
  const[question, setQuestion] = useState(randomizedQuestion(questions[0]))
  const[qIndex, setQIndex] = useState(0)
  const[score, setScore] = useState(0)
  

  function submitHandler() {
    if (quizState === "question") {
      setQuizState("answer")
    }
    else if (quizState === "answer") {
      if (questions.length <= qIndex + 1) {
        setQuizState("finished")
        setSelected('')
      }
      else {
        setQIndex(qIndex + 1)
        setQuizState("question")
        setSelected('')
        setQuestion(randomizedQuestion(questions[qIndex + 1]))
      }
    }
  }
  function selectHandler(choice: string) {
    if (quizState === "question") {
      setSelected(choice)
    }
  }
  function resetHandler(choice: string) {
    setQIndex(0)
    setQuizState("question")
    setSelected('')
    setQuestion(randomizedQuestion(questions[0]))
  }

  return <div className="quiz">
    <header>
      <span className="header-text">Quiz</span>
    </header>
    <main>
      {
        quizState === "finished" ?
        <>
          <div className="finished">Finished!</div>
        
          <div className="below">
            <button onClick={resetHandler}>Try Again</button>
          </div>
        </>
        :
        <>
          <div className="question">
            {question.question}
          </div>
          {question.choices.map((choice: string) =>
            <div
              key={choice}
              className={`choice ${selected === choice ? 'selected':''} ${quizState === 'answer' ? 'answering':''} ${quizState === 'answer' && choice === question.answer ? 'answer':''}`}
              onClick={() => selectHandler(choice)}>
              {choice}
            </div>
          )}
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