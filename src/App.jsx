import { useState, useRef, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const newGameBotton = useRef(null)

  let gameWon;
  if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
    gameWon = true
  } else {
    gameWon = false
  }

  useEffect(() => {
    if (gameWon){
      newGameBotton.current.focus()
    }
  }, [gameWon])

  const diceList = dice.map((obj) => (
    <Die key={obj.id} handleClick={() => hold(obj.id)} obj={obj} />
  ));

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => {
      return {
        id: crypto.randomUUID(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      };
    });
  }

  function rollDice() {
    if (gameWon){
      setDice(generateAllNewDice())
    }else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      }));

    }
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((dieObj) => {
        return dieObj.id === id
          ? { ...dieObj, isHeld: !dieObj.isHeld }
          : dieObj;
      })
    );
  }

  return (
    <>
      <main>
        {gameWon && <Confetti />}
        <h1>Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">{diceList}</div>
        {gameWon && <h2 className="game-won">Game won!🎉</h2>}
        <button className="roll" onClick={rollDice} ref={newGameBotton}>
          {gameWon ? "New game" : "Roll" }
        </button>
      </main>
    </>
  );
}

export default App;
