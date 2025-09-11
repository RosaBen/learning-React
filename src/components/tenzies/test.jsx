import { useState } from 'react';
import Die from './Die';

export default function App() {
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  }
  const [randomArray, setRandomArray] = useState(generateAllNewDice());
  /** map over dice here */
  const arrayValue = randomArray.map((nb, idx) =>
    setRandomArray(<Die key={idx} value={nb} />)
  );

  return (
    <main>
      <div className="dice-container">{arrayValue}</div>
    </main>
  );
}
