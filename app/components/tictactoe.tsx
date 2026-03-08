import { useState } from "react"

function Cell({handleClick, content}: {handleClick: () => void, content: string}) {
  return <div className="border-white border-[1px] size-[100px] text-[50px] text-center" onClick={handleClick}>
    {content}
  </div>
}
function Row({handleClick, content}: {handleClick: (x: number) => void, content: string[]}) {
  return <div className="columns-3">
    <Cell handleClick={() => handleClick(0)} content={content[0]} />
    <Cell handleClick={() => handleClick(1)} content={content[1]} />
    <Cell handleClick={() => handleClick(2)} content={content[2]} />
  </div>
}


export default function TicTacToe() {
  const initialState = [["","",""],["","",""],["","",""]]
  const [gameState, setGameState] = useState(initialState)

  function handleClickCell(x: number, y: number) {
    setGameState(gameState.map(
      (row: string[], y_data) => {return row.map((cell, x_data) => (x === x_data && y === y_data) ? 'X' : cell)}))
  }
  return <div className="">
    <Row handleClick={(x: number) => handleClickCell(x, 0)} content={gameState[0]} />
    <Row handleClick={(x: number) => handleClickCell(x, 1)} content={gameState[1]} />
    <Row handleClick={(x: number) => handleClickCell(x, 2)} content={gameState[2]} />
  </div>
}
