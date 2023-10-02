import { winnerCombos } from "../constants"

export const checkBoard = board => {
  
    for(const combo of winnerCombos){
      const [a, b, c] = combo
  
      if(board[a] !== null 
        && board[a] === board[b] 
        && board[a] === board[c]
        ){
          return true
        }
    }
  
    return false
  }
  
export const checkEndGame = board => {
  
    return board.every(square => square !== null)
}