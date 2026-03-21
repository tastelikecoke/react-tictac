import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quizzes" },
    { name: "description", content: "Many quizzes!" },
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
