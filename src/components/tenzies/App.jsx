import { useState, useEffect, useRef} from 'react'
import { nanoid } from 'nanoid';
import Die from './Die'
import Confetti from "react-confetti"

export default function App(){
    //   function generateAllNewDice() {
    //     return new Array(10)
    //         .fill(0)
    //         .map(() => ({
            //     value: Math.ceil(Math.random() * 6), 
            //     isHeld: false,
            //      id : nanoid()
            // }))

    const generateAllNewDice = () => {
        const randNbArray = [];
        for (let i = 0; i < 10; i++) {
            randNbArray.push({
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            });
        }
        return randNbArray;
    };

    const [dice, setDice] = useState(() => generateAllNewDice());

    const gameWon = dice.every(die=>die.isHeld)&& dice.every(die=> die.value === dice[0].value)
     
    // map over dice here
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} hold={() => hold(die.id)} />
    ));

       function rollDice() {
        // keep the numbers which are held and change only the others
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }

    const hold = (id) => {
        setDice(prevDice =>
            prevDice.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    };

    const focusSection = useRef(null)
    
    useEffect(()=>{
       if(gameWon){
        focusSection.current.focus()
       }
    },[gameWon])

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}

            </div>
                      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button onClick={rollDice} ref={focusSection}>{gameWon?"New Game":"Roll dice"}</button>
        </main>
    );
}