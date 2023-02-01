import React, { Component } from 'react';
import Die from './components/Die';
import uniqid from 'uniqid';

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
        <div className="dice-container">{dices}</div>
        <button onClick={() => rollDice()}>Roll</button>
      </main>
    </div>
  );
}

export default App;
