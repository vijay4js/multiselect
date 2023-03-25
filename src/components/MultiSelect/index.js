import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import Chip from "../Chip";
import Option from "../Option";
import { getFilteredOptions } from "../../utils";
import "./multiselect.css";

function MultiSelect({ options, onOptionSelected, onOptionRemoved }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightedValue, setHighlightedValue] = useState("");
  const [optionsContainerLeftPos, setOptionsContainerLeftPos] = useState(0);
  const selectContainerRef = useRef(null);
  const optionsContainerRef = useRef(null);
  const inputContainerRef = useRef(null);
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current.focus();
    const inputLeftOffset = inputContainerRef.current.offsetLeft;
    const clientWidth = document.documentElement.clientWidth;
    const MARGIN = 40;
    const OPTIONS_CONTAINER_WIDTH = 200;

    if (inputLeftOffset + MARGIN + OPTIONS_CONTAINER_WIDTH < clientWidth) {
      setOptionsContainerLeftPos(inputContainerRef.current?.offsetLeft + "px");
    } else {
      setOptionsContainerLeftPos("0px");
    }
  }, [selectedValues]);

  const handleOutsideClick = useCallback(() => setIsOpen(false), []);
  useOutsideClick(selectContainerRef, handleOutsideClick);

  const filteredOptions = getFilteredOptions(
    options,
    selectedValues,
    searchTerm
  );

  const onChipRemove = React.useCallback(
    (value) => {
      const optionRemoved = options.filter((v) => v.value === value);
      setSelectedValues((prevValues) => prevValues.filter((v) => v !== value));
      onOptionRemoved(optionRemoved);
    },
    [options, onOptionRemoved]
  );

  const onOptionSelect = React.useCallback(
    (option) => {
      if (!selectedValues.includes(option.value)) {
        setSelectedValues((prevValues) => [...prevValues, option.value]);
        setSearchTerm("");
        setActiveIndex(0);
        setHighlightedValue("");
        onOptionSelected(option);
      }
    },
    [selectedValues, onOptionSelected]
  );

  const handleSearch = (e) => {
    setIsOpen(true);
    setSearchTerm(e.target.value);
  };

  const handleInputClick = (e) => {
    setIsOpen(true);
  };

  const handleKeyPress = (e) => {
    switch (e.code) {
      case "ArrowUp":
        if (activeIndex > 0) {
          setActiveIndex((prevIndex) => prevIndex - 1);
        }
        break;
      case "ArrowDown":
        if (!isOpen) setIsOpen(true);
        if (activeIndex < filteredOptions.length - 1) {
          setActiveIndex((prevIndex) => prevIndex + 1);
        }
        break;
      case "Enter":
        let selectedOption = filteredOptions[activeIndex];
        if (selectedOption) {
          onOptionSelect(selectedOption);
        }
        break;
      case "Backspace":
        const selectedChipslength = selectedValues.length;
        if (searchTerm || !selectedChipslength) {
          break;
        }
        if (highlightedValue) {
          onChipRemove(highlightedValue);
          setHighlightedValue("");
        } else {
          setHighlightedValue(selectedValues[selectedChipslength - 1]);
        }
        setIsOpen(false);
        break;
      case "Escape":
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      default:
        setHighlightedValue("");
        break;
    }
  };

  const handleInputFocus = (e) => {
    inputRef.current.focus();
    setIsOpen(true);
  };

  //Send primitives so that it need not re-render after memo

  const renderDropDownOptions = () => {
    if (!filteredOptions.length) return null;
    return (
      <div
        ref={optionsContainerRef}
        style={{ left: optionsContainerLeftPos }}
        className="dropdown-options-container"
      >
        {filteredOptions.map((option, id) => {
          const isSelected = activeIndex === id;
          return (
            <Option
              option={option}
              key={id}
              onOptionSelect={onOptionSelect}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    );
  };

  //Send primitives so that it need not re-render after memo
  const renderSelectedValues = () => {
    return selectedValues.map((value, id) => {
      return (
        <Chip
          key={id}
          isHighlighted={highlightedValue === value}
          onChipRemove={onChipRemove}
          value={value}
        />
      );
    });
  };

  return (
    <div tabIndex="-1" ref={selectContainerRef} className="select-container">
      <div
        onClick={handleInputFocus}
        onFocus={handleInputFocus}
        className="selected-values"
      >
        {renderSelectedValues()}
        <div ref={inputContainerRef} className="input-container">
          <input
            value={searchTerm}
            onChange={handleSearch}
            onKeyUp={handleKeyPress}
            onClick={handleInputClick}
            ref={inputRef}
            type="text"
            className="select-input"
          />
        </div>
      </div>

      {isOpen ? renderDropDownOptions() : null}
    </div>
  );
}

export default MultiSelect;
