import confetti from "canvas-confetti"
import { useState } from "react"

import { TURN } from "./constants.js"
import { checkBoard, checkEndGame } from "./logic/board"

import { Square } from "./components/Square" 
import { WinnerModal } from "./components/WinnerModal"


export const App = () => {

  const [board, setBoard] = useState(
    JSON.parse(localStorage.getItem('board')) ?? Array(9).fill(null)
  )
  const [turn, setTurn] = useState(
    localStorage.getItem('turn') ?? TURN.x
  )
  const [winner, setWinner] = useState(null)

  const resetGame = () =>{

    setBoard(Array(9).fill(null))
    setTurn(TURN.x)
    setWinner(null)

    localStorage.removeItem('board')
    localStorage.removeItem('turn')
  }

  const updateBoard = index =>{

    if(board[index] || winner)
      return

    const newBoard = [...board]
    newBoard[index] = turn

    const newTurn = turn === TURN.x ? TURN.o : TURN.x
  
    setBoard(newBoard)
    setTurn(newTurn)

    
    if(checkBoard(newBoard)){
      
      setWinner(turn)
      confetti()
    }
    else if(checkEndGame(newBoard))
      setWinner(false)
  
  
  
    localStorage.setItem('board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)
    
  }

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <section className="game">
        {
          board.map((square, index) => 

            <Square 
              key={index} 
              handleClick={updateBoard}
              index={index}
            >
              {square}
            </Square>
          )
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURN.x}>{TURN.x}</Square>
        <Square isSelected={turn === TURN.o}>{TURN.o}</Square>
      </section>

      <WinnerModal 
        winner={winner}
        resetGame={resetGame}
      >
      </WinnerModal>
      
    </main>
  )
}
