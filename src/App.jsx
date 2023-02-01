import React, { Component } from 'react';
import Die from './components/Die';
import uniqid from 'uniqid';
import Credits from './components/Credits';

function App() {
  const [numbers, setNumbers] = React.useState(renderDice());

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
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{dices}</div>
        <button onClick={() => rollDice()}>Roll</button>
      </main>
      <Credits />
    </div>
  );
}

export default App;
