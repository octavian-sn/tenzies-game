import React, { Component } from 'react';

function Score(props) {
  return (
    <div className="score">
      <div className="score--titles">
        <div>CURRENT Time / Rolls:</div>
        <div>BEST Time / Rolls:</div>
      </div>
      <div className="score--time">
        <div className="result">{`${props.counter.minutes}:${props.counter.seconds} / ${props.rolls}`}</div>
        <div className="result">{`0:0 / 0`}</div>
      </div>
    </div>
  );
}

export default Score;
