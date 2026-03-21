import Quiz from "~/components/quiz";
import { type QuizQuestion} from "~/components/quiz";
import type { Route } from "../+types/root";

function randomizedQuestion(question: any) {
  return {
    ...question,
    choices: question.choices && question.choices.toSorted((a,b) => Math.random()-0.5),
  }
}

export async function loader({params}: Route.LoaderArgs) {
    const quiz = await import("~/data.json");
    console.log(quiz)
    return quiz.default.map(q => randomizedQuestion(q));
}

export default function Page2({loaderData}: Route.ComponentProps) {
    if (loaderData) {
        return <Quiz questions={loaderData}></Quiz>
    }
    else return <>Quiz data could not be loaded.</>
}