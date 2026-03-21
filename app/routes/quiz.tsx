import type { Route } from "./+types/quiz";
import { useState } from "react";

export type QuizQuestion = {
  question: string;
  answer: string;
  choices: [string];
}
export type QuizType = {
  name: string;
  id: string;
  questions: [QuizQuestion];
}

export function Quiz({data}:{data: QuizType}) {
  const questions = data.questions

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
        <a href="/"><span className="header-text">Quizzes</span></a>
        <span className="header-text">{" / "}</span>
        <span className="header-text">{data.name}</span>
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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz" },
    { name: "description", content: "Starting a quiz." },
  ];
}

function randomizedQuestion(question: any) {
  return {
    ...question,
    choices: question.choices && question.choices.toSorted((a,b) => Math.random()-0.5),
  }
}

export async function loader({params}: Route.LoaderArgs) {
  const quizzes = await import("~/data.json");
  let quiz = quizzes.default.find((q) => q.id == params.name);
  console.log(quiz)
  if (quiz) {
    quiz.questions = quiz.questions.map(q => randomizedQuestion(q));
    return quiz;
  }
}

export default function Page({params, loaderData}: Route.ComponentProps) {
  if (loaderData) {
    return <Quiz data={loaderData as unknown as QuizType}></Quiz>
  }
  else return <>Quiz data could not be loaded.</>
}

