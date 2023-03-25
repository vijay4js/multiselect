import React from "react";
import "./chip.css";

function Chip({ value, onChipRemove, isHighlighted }) {
  return (
    <div
      className={`selected-value-container ${
        isHighlighted ? "highlighted" : ""
      }`}
    >
      <div className="selected-value">{value}</div>
      <button className="remove-chip" onClick={() => onChipRemove(value)}>
        x
      </button>
    </div>
  );
}

export default React.memo(Chip);
