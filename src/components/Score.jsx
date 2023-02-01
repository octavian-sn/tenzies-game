import React, { Component } from 'react';

function Score({ rolls, time, bestRolls, bestTime }) {
  return (
    <div className="score">
      <div className="score--titles">
        <div>CURRENT Time / Rolls:</div>
        <div>BEST Time / Rolls:</div>
      </div>
      <div className="score--time">
        <div className="result">{`${time} / ${rolls}`}</div>
        <div className="result">{`12:34:57 / 03`}</div>
      </div>
    </div>
  );
}

export default Score;
