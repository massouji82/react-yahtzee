import React, { Component } from "react";
import "./RuleRow.css";

class RuleRow extends Component {
  render() {
    const { score, doScore, name, description, isSpinning } = this.props;
    const scoreIsUndefined = score === undefined;

    return (
      <tr
        className={`RuleRow RuleRow-${
          scoreIsUndefined ? "active" : "disabled"
        }`}
        onClick={scoreIsUndefined && !isSpinning ? doScore : null}
      >
        <td className="RuleRow-name">{name}</td>
        <td className="RuleRow-score">
          {scoreIsUndefined ? description : score}
        </td>
      </tr>
    );
  }
}

export default RuleRow;
