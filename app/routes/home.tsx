import type { Route } from "./+types/home";
import TicTacToe from "../components/tictactoe";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({params}: Route.LoaderArgs) {
    const quizzes = await import("~/data.json");
    return quizzes.default;
}

export default function Home({params, loaderData}: Route.ComponentProps) {
  return (
  <div className="home">
    <header>
      <section className="top">
        <span className="header-text">Quizzes</span>
        <span className="expander"></span>
      </section>
    </header>
    <main>
      {
        loaderData.map(quizData => 
          <a key={quizData.id} href={`/quiz/${quizData.id}`}>
            <div className="questions">{quizData.name}</div>
          </a>
        )
      }
    </main>
  </div>
  );
}
