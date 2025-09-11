// import { useEffect } from 'react'
export default function Die({value, isHeld, key, hold}){
const styles ={
  backgroundColor: isHeld? "#59E391" : "white"
}
  return(
    <div className="diceContainer">
        <button 
        className="die-face" 
        key={key} 
        style={styles} 
        onClick={hold}
        aria-pressed={isHeld}
        aria-label={`Die with value ${value}, 
            ${isHeld ? "held" : "not held"}`}
        >{value}</button>
    </div>
  )
}