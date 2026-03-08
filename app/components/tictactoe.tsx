import { useState } from "react"

function Cell({handleClick, content}: {handleClick: () => void, content: string}) {
  return <div className="border-white border-[1px] text-[50px] text-center size-[100px]" onClick={handleClick}>
    {content}
  </div>
}
function Row({handleClick, content}: {handleClick: (x: number) => void, content: string[]}) {
  return <div className="row">
    <Cell handleClick={() => handleClick(0)} content={content[0]} />
    <Cell handleClick={() => handleClick(1)} content={content[1]} />
    <Cell handleClick={() => handleClick(2)} content={content[2]} />
  </div>
}


export default function TicTacToe() {
  const initialState = [["","",""],["","",""],["","",""]]
  const [gameState, setGameState] = useState(initialState)
  const [currentTurn, setCurrentTurn] = useState(true)
  const [winner, setWinner] = useState('')

  function handleClickCell(x: number, y: number) {
    const currentMarker = currentTurn ? 'X' : 'O' 
    const nextState = gameState.map(
      (row: string[], y_data) => {return row.map((cell, x_data) => (x === x_data && y === y_data) ? currentMarker : cell)})
    setGameState(nextState)
    setCurrentTurn(!currentTurn)
    let isWin = false
    isWin = isWin || nextState.some(row => row.every(cell => cell == 'X') || row.every(cell => cell == 'O'))
    for(let x_pos = 0; x_pos < 3; ++x_pos) {
      let match_x = true
      let match_o = true
      for(let y_pos = 0; y_pos < 3; ++y_pos) {
        match_x = match_x && nextState[y_pos][x_pos] == 'X'
        match_o = match_o && nextState[y_pos][x_pos] == 'O'
      }
      isWin = isWin || match_x || match_o
    }
    if (isWin)
      setWinner(currentMarker)
  }
  return <div className="tictactoe">
    {currentTurn ?
      <p>X's Turn</p>
      :
      <p>O's Turn</p>
    }
    <Row handleClick={(x: number) => handleClickCell(x, 0)} content={gameState[0]} />
    <Row handleClick={(x: number) => handleClickCell(x, 1)} content={gameState[1]} />
    <Row handleClick={(x: number) => handleClickCell(x, 2)} content={gameState[2]} />
    {winner != '' &&
      <p>{winner} Wins</p>
    }
  </div>
}
