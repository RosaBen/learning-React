import { clsx } from 'clsx';
import { useState } from 'react';
import { languages } from './languages';

export default function AssemblyEndgame() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const [currentWord] = useState('Hello');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span style={styles} key={lang.name} className="chip">
        {lang.name}
      </span>
    );
  });

  const word = [...currentWord.toUpperCase()];
  const letterElements = word.map((letter, index) => (
    <span key={index} className="letter">
      {letter}
    </span>
  ));

  const addGuessedLetter = letter => {
    setGuessedLetters(prevGuessed =>
      prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter]
    );
  };

  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={`${className} keyboard-letter`}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
    </main>
  );
}
