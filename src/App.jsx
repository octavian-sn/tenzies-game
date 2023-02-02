import React, { Component } from 'react';
import Die from './components/Die';
import uniqid from 'uniqid';
import Credits from './components/Credits';
import Confetti from 'react-confetti';
import Score from './components/Score';

function App() {
  const [numbers, setNumbers] = React.useState(renderDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [counter, setCounter] = React.useState({
    minutes: 0,
    seconds: 0,
  });
  const [bestScore, setBestScore] = React.useState(
    JSON.parse(localStorage.getItem('bestScore')) || {
      minutes: 0,
      seconds: 0,
      rolls: 0,
    }
  );

  React.useEffect(() => {
    !tenzies &&
      setTimeout(() => {
        setCounter((prevCounter) => {
          return {
            ...prevCounter,
            minutes:
              prevCounter.seconds === 59
                ? prevCounter.minutes + 1
                : prevCounter.minutes,
            seconds: prevCounter.seconds < 59 ? prevCounter.seconds + 1 : 0,
          };
        });
      }, 1000);
  }, [counter]);

  React.useEffect(() => {
    const winConditionOne = numbers.every((number) => number.isHeld === true);
    const winConditionTwo = numbers.every(
      (number) => number.value === numbers[0].value
    );
    if (winConditionOne && winConditionTwo) {
      updateBestScore();
      setTenzies(true);
    }
  }, [numbers]);

  function updateBestScore() {
    const currentTime = counter.minutes.toString() + counter.seconds;
    const bestTime = bestScore.minutes.toString() + bestScore.seconds;

    if (rolls < bestScore.rolls || bestScore.rolls === 0) {
      setBestScore((prevBestScore) => ({
        ...prevBestScore,
        rolls: rolls,
      }));
    }
    if (currentTime < bestTime || bestTime === '00') {
      setBestScore((prevBestScore) => ({
        ...prevBestScore,
        minutes: counter.minutes,
        seconds: counter.seconds,
      }));
    }
    localStorage.setItem('bestScore', JSON.stringify(bestScore));
  }

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
      setCounter({ minutes: 0, seconds: 0 });
      setRolls(0);
      return;
    }
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      if (numbers[i].isHeld) newArr.push(numbers[i]);
      else newArr.push(renderDice()[i]);
    }
    setNumbers(newArr);
    setRolls((prevRolls) => prevRolls + 1);
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
        <Score counter={counter} rolls={rolls} bestScore={bestScore} />
      </main>
      <Credits />
    </div>
  );
}

export default App;
