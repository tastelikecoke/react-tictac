import type { Route } from "./+types/page1";
import TicTacToe from "../components/tictactoe";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page 1" },
    { name: "description", content: "New Page." },
  ];
}

export default function Home() {
  return <div className="oc-card">
    <div className="marathon">
      <p>Erica</p>
    </div>
    <div className="description">
      <ul>
        <li>Government Name: Erica.</li>
        <li>Height: 151cm.</li>
        <li>Zodiac: Virgo.</li>
      </ul>
    </div>
        
  </div>
}
