import { useState } from "react"

const initial = {
  question: "にちの漢字はなんだ？",
  answer: "日",
  choices: ["二","日","人"]
}

export default function Quiz() {
  const[quizState, setQuizState] = useState("question")
  const[question, setQuestion] = useState(initial)
  const[selected, setSelected] = useState("")

  function submitHandler() {
    if (quizState === "question") {
      setQuizState("answer")
    }
    else if (quizState === "answer") {
      setQuizState("question")
    }
  }
  function selectHandler(choice: string) {
    console.log(choice)
    setSelected(choice)
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
        <div key={choice} className={"choice" + (selected === choice ? " selected" : "")} onClick={() => selectHandler(choice)}>
          {choice}
        </div>
      )}
      <div className="below" onClick={submitHandler}>
        <button>{ quizState === "question" ? "Submit" : "Next"}</button>
      </div>
    </main>
  </div>
}