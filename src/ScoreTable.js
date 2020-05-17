import React, { Component } from "react";
import RuleRow from "./RuleRow";
import "./ScoreTable.css";
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
} from "./Rules";

class ScoreTable extends Component {
  render() {
    const { scores, doScore, isSpinning } = this.props;
    let totalScore = 0;
    for (const score of Object.values(scores)) {
      if (score !== undefined) {
        totalScore += score;
      }
    }
    return (
      <div className="ScoreTable">
        <section className="ScoreTable-section">
          <h2>Upper</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow
                description="1 point per 1"
                name="Ones"
                score={scores.ones}
                doScore={(evt) => doScore("ones", ones.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="2 points per 2"
                name="Twos"
                score={scores.twos}
                doScore={(evt) => doScore("twos", twos.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="3 points per 3"
                name="Threes"
                score={scores.threes}
                doScore={(evt) => doScore("threes", threes.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="4 points per 4"
                name="Fours"
                score={scores.fours}
                doScore={(evt) => doScore("fours", fours.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="5 points per 5"
                name="Fives"
                score={scores.fives}
                doScore={(evt) => doScore("fives", fives.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="6 points per 6"
                name="Sixes"
                score={scores.sixes}
                doScore={(evt) => doScore("sixes", sixes.evalRoll)}
                isSpinning={isSpinning}
              />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section ScoreTable-section-lower">
          <h2>Lower</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow
                description="Sum all dices if 3 are the same"
                name="Three of Kind"
                score={scores.threeOfKind}
                doScore={(evt) => doScore("threeOfKind", threeOfKind.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="Sum all dices if 4 are the same"
                name="Four of Kind"
                score={scores.fourOfKind}
                doScore={(evt) => doScore("fourOfKind", fourOfKind.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="25 points for a Full House"
                name="Full House"
                score={scores.fullHouse}
                doScore={(evt) => doScore("fullHouse", fullHouse.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="30 points for a Small Straight"
                name="Small Straight"
                score={scores.smallStraight}
                doScore={(evt) =>
                  doScore("smallStraight", smallStraight.evalRoll)
                }
                isSpinning={isSpinning}
              />
              <RuleRow
                description="40 points for a Large Straight"
                name="Large Straight"
                score={scores.largeStraight}
                doScore={(evt) =>
                  doScore("largeStraight", largeStraight.evalRoll)
                }
                isSpinning={isSpinning}
              />
              <RuleRow
                description="50 points for Yahtzee"
                name="Yahtzee"
                score={scores.yahtzee}
                doScore={(evt) => doScore("yahtzee", yahtzee.evalRoll)}
                isSpinning={isSpinning}
              />
              <RuleRow
                description="Sum of all dice"
                name="Chance"
                score={scores.chance}
                doScore={(evt) => doScore("chance", chance.evalRoll)}
                isSpinning={isSpinning}
              />
            </tbody>
          </table>
          <h2>TOTAL SCORE: {totalScore}</h2>
        </section>
      </div>
    );
  }
}

export default ScoreTable;
