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
  

  function submitHandler() {
    if (quizState === "question") {
      setQuizState("answer")
    }
    else if (quizState === "answer") {
      setQuizState("question")
      setSelected('')
      setQuestion(randomizedQuestion(questions[0]))
    }
  }
  function selectHandler(choice: string) {
    if (quizState === "question") {
      setSelected(choice)
    }
  }

  return <div className="quiz">
    <header>
      <span className="header-text">Quiz</span>
    </header>
    <main>
      <div className="question">
        {question.question}
      </div>
      {question.choices.map(choice =>
        <div
          key={choice}
          className={`choice ${selected === choice ? 'selected':''} ${quizState === 'answer' ? 'answering':''} ${quizState === 'answer' && choice === question.answer ? 'answer':''}`}
          onClick={() => selectHandler(choice)}>
          {choice}
        </div>
      )}
      <div className="below" onClick={submitHandler}>
        <button>{ quizState === "question" ? "Submit" : "Next"}</button>
      </div>
    </main>
  </div>
}