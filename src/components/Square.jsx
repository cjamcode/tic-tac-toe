export const Square = ({children, handleClick, index, isSelected}) => {

    const squareClass = `square ${isSelected ? 'is-selected' : ''}`
  
    return(
      <div onClick={() => handleClick(index)} className={squareClass}>{children}</div>
    )
}