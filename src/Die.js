import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    numberLetters: ["one", "two", "three", "four", "five", "six"],
    val: Math.ceil(Math.random() * 6),
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.handleClick(this.props.idx);
  };

  render() {
    const { numberLetters, val, locked, disabled, isSpinning } = this.props;
    let diceNum = `Die fas fa-dice-${numberLetters[val - 1]} fa-5x `;
    if (locked) diceNum += "Die-locked";
    if (isSpinning && !locked) diceNum += "RotateDice";

    return (
      <i className={diceNum} onClick={this.handleClick} disabled={disabled}></i>
    );
  }
}

export default Die;
