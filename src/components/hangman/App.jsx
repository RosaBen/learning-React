import { clsx } from 'clsx';
import { useState } from 'react';
import { languages } from './languages';

export default function AssemblyEndgame() {
  const getRandomWord = () =>
    languages[Math.floor(Math.random() * languages.length)].name;
  // Static values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const word = [...currentWord.toUpperCase()];
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [showLetters, setShowLetters] = useState(
    word.map((letter, index) => ({
      name: letter,
      isVisible: false,
      id: index,
    }))
  );

  const addGuessedLetter = letter => {
    setGuessedLetters(prevGuessed =>
      prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter]
    );
  };

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    const classname = clsx('chip', isLanguageLost && 'lost');
    return (
      <span style={styles} key={lang.name} className={classname}>
        {lang.name}
      </span>
    );
  });

  const letterElements = showLetters.map((letterObj, index) => (
    <span key={index} className="letter">
      {letterObj.isVisible ? letterObj.name : '*'}
    </span>
  ));

  // const letterElements = currentWord
  //   .split('')
  //   .map((letter, index) => (
  //     <span key={index}>
  //       {guessedLetters.includes(letter) ? letter.toUpperCase() : '*'}
  //     </span>
  //   ));

  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.toLowerCase().includes(letter);
    const isWrong = isGuessed && !currentWord.toLowerCase().includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={`${className} keyboard-letter`}
        key={letter}
        // disabled={isGuessed || isGameOver}
        onClick={() => {
          addGuessedLetter(letter);
          correctLetter(letter.toUpperCase());
        }}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const newGame = () => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setGuessedLetters([]);
    const newWordArray = [...newWord.toUpperCase()];
    setShowLetters(
      newWordArray.map((letter, index) => ({
        name: letter,
        isVisible: false,
        id: index,
      }))
    );
  };

  const correctLetter = letterGuessed => {
    setShowLetters(prev =>
      prev.map(l => (l.name === letterGuessed ? { ...l, isVisible: true } : l))
    );
  };

  // const wrongGuesses = guessedLetters.filter(
  //   letter => !currentWord.toLowerCase().includes(letter)
  // );
  // const wrongGuessCount = wrongGuesses.length;
  // const hasWon = showLetters.every(letter => letter.isVisible);
  // const hasLost = wrongGuessCount >= 8;
  // const isGameOver = hasWon || hasLost;

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split('')
    .every(letter => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const newGameBtn = isGameOver ? (
    <button className="new-game" onClick={newGame}>
      New Game
    </button>
  ) : null;

  const gameStatusClass = clsx('game-status', {
    won: isGameWon,
    lost: isGameLost,
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
      <section className={gameStatusClass}>
        {isGameOver ? (
          isGameWon ? (
            <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>
          ) : (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly 😭</p>
            </>
          )
        ) : null}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      {newGameBtn}
    </main>
  );
}
