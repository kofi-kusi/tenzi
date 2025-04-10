import { useState } from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

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
        <div className="dice-container">{diceList}</div>
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      </main>
    </>
  );
}

export default App;
