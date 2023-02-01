import React, { Component } from 'react';
import Die from './components/Die';
import uniqid from 'uniqid';
import Credits from './components/Credits';
import Confetti from 'react-confetti';

function App() {
  const [numbers, setNumbers] = React.useState(renderDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const winConditionOne = numbers.every((number) => number.isHeld === true);
    const winConditionTwo = numbers.every(
      (number) => number.value === numbers[0].value
    );
    if (winConditionOne && winConditionTwo) {
      setTenzies(true);
      console.log('you won');
    }
  }, [numbers]);

  function renderDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.floor(Math.random() * (6 - 1 + 1) + 1),
        isHeld: false,
        id: uniqid(),
      });
    }
    return arr;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setNumbers(renderDice());
      return;
    }
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      if (numbers[i].isHeld) newArr.push(numbers[i]);
      else newArr.push(renderDice()[i]);
    }
    setNumbers(newArr);
  }

  function holdDie(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((number) => {
        if (number.id === id)
          return {
            ...number,
            isHeld: !number.isHeld,
          };
        return number;
      })
    );
  }

  const dices = numbers.map((number) => (
    <Die
      value={number.value}
      key={number.id}
      id={number.id}
      isHeld={number.isHeld}
      holdDie={holdDie}
    />
  ));

  return (
    <div id="project">
      <main>
        {tenzies && <Confetti numberOfPieces={300} />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{dices}</div>
        <button onClick={() => rollDice()}>
          {tenzies ? 'New game' : 'Roll'}
        </button>
      </main>
      <Credits />
    </div>
  );
}

export default App;
