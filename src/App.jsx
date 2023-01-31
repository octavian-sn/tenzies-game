import React, { Component } from 'react';
import Die from './components/Die';
import uniqid from 'uniqid';

function App() {
  const [numbers, setNumbers] = React.useState(renderDice());

  function renderDice() {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(Math.floor(Math.random() * (6 - 1 + 1) + 1));
    }
    return numbers;
  }

  const dices = numbers.map((number) => <Die value={number} key={uniqid()} />);

  return (
    <div id="project">
      <main>
        <div className="dice-container">{dices}</div>
        <button onClick={() => setNumbers(renderDice())}>Roll</button>
      </main>
    </div>
  );
}

export default App;
