import React from "react";
import "./option.css";

function Option({ option, onOptionSelect, isSelected }) {
  return (
    <div
      onClick={() => onOptionSelect(option)}
      className={`option ${isSelected ? "selected" : ""}`}
    >
      {option.label}
    </div>
  );
}

export default React.memo(Option);
