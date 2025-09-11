import { useState } from "react";
import { languages } from "./languages"

export default function AssemblyEndgame() {
       const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const chips = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span style={styles} key={lang.name} className="chip">{lang.name}</span>
        )
    })
    const [currentWord] = useState("Hello")
    const [guessed, setGuessed] = useState([]);
    // const selectedKey = (letter) => {
    // setGuessed(prevGuessed => prevGuessed.includes(letter)? prevGuessed: [...prevGuessed,letter])
    // };

    const selectedKey = (letter)=>{
      setGuessed(prev => {
        const letters = new Set(prev)
        letters.add(letter)
        return Array.from(letters)
      })
    }
    console.log(guessed);
    const keyboard = alphabet.split('').map(letter =>
      <button key={letter} className="keyboard-letter" onClick={() => selectedKey(letter)}>{letter.toUpperCase()}</button>
    );
    const word = [...currentWord.toUpperCase()]
    const letters = word.map((letter, index) => <span key={index} className="letter">{letter}</span>)


    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
              <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
              </section>
              <section className="language-chips">
                {chips}
              </section>
              <section className="word">
                {letters}
              </section>
              <section className="keyboard">
                {keyboard}
              </section>
        </main>
    )
}