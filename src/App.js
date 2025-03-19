import "./App.css";
import Die from "./Components/Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti-boom";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null)
  const [count,setCount] = useState(0);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus()
    }
  },[gameWon])

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setCount(prevCount=>prevCount+1)
    } else {
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      hold={() => hold(dieObj.id)}
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
    />
  ));

  return (
    <main>
      <div className="title">
        <h1>Tenzies</h1>
        <p>Held all same numbers to win !!</p>
      </div>
      <div className="dice-container">{diceElements}</div> <br></br>
      <button ref={buttonRef} className="rollBtn" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll 🎲"}
      </button>
      {gameWon && (
        <Confetti
          mode="boom"
          launchSpeed={3}
          spreadDeg="15"
          particleCount="500"
        />
      )}
      <div className="sr-only" aria-live="polite">
        {gameWon && (
          <p>
            Congrats u wont the Game !!! Please pres the "New Game" to start a
            New Game
          </p>
        )}
      </div>
      {gameWon && <p className="won-text">Congrats!! You won with {count} rolls</p>}
    </main>
  );
}

export default App;
