import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      isSpinning: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.spinner = this.spinner.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
    this.spinner();
  }

  spinner() {
    this.setState({ isSpinning: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }

  restart() {
    this.spinner();
    this.setState({
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    });
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState((st) => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      isSpinning: false,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft !== 0 && !this.state.isSpinning) {
      this.setState((st) => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1),
        ],
      }));
    } else {
      return this.state.locked;
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.spinner();
  }

  render() {
    const { scores, dice, locked, rollsLeft, isSpinning } = this.state;
    const gameOver = Object.values(scores).every(
      (value) => value !== undefined
    );
    if (!gameOver) {
      return (
        <div className="Game">
          <header className="Game-header">
            <h1 className="App-title">Yahtzee!</h1>
            <section className="Game-dice-section">
              <Dice
                dice={dice}
                locked={locked}
                handleClick={this.toggleLocked}
                disabled={rollsLeft === 0}
                isSpinning={isSpinning}
              />
              <div className="Game-button-wrapper">
                <button
                  className="Game-reroll"
                  disabled={locked.every((x) => x) || isSpinning}
                  onClick={this.spinner}
                >
                  {isSpinning ? (
                    "Rolling ..."
                  ) : (
                    <div>
                      {rollsLeft}{" "}
                      {rollsLeft === 1 ? "Reroll Left" : "Rerolls Left"}
                    </div>
                  )}
                </button>
              </div>
            </section>
          </header>
          <ScoreTable
            doScore={this.doScore}
            scores={scores}
            isSpinning={isSpinning}
          />
        </div>
      );
    } else {
      return (
        <div className="Game">
          <header className="Game-header">
            <h1 className="App-title">Game Over!</h1>
            <section className="Game-dice-section">
              <div className="Game-button-wrapper">
                <button className="Game-reroll" onClick={this.restart}>
                  Play Again?
                </button>
              </div>
            </section>
          </header>
          <ScoreTable
            doScore={this.doScore}
            scores={scores}
            isSpinning={isSpinning}
          />
        </div>
      );
    }
  }
}

export default Game;
