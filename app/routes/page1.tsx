import type { Route } from "./+types/page1";
import TicTacToe from "../components/tictactoe";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page 1" },
    { name: "description", content: "New Page." },
  ];
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setRunning(true);
    const interval = setInterval(() => {
      setTime(time => time + 1);
    }, 1);
    setCurrentInterval(interval);
  };

  const stopTimer = () => {
    setRunning(false);
    if (currentInterval) {
      clearInterval(currentInterval);
    }
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {time}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default function Page1() {
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

    <Stopwatch />
        
  </div>
}

