import { useState } from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  let gameWon;
  if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
    gameWon = true
  } else {
    gameWon = false
  }

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
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }));
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
        <h1>Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">{diceList}</div>
        <button className="roll" onClick={rollDice}>
          {gameWon ? "New game" : "Roll" }
        </button>
      </main>
    </>
  );
}

export default App;
