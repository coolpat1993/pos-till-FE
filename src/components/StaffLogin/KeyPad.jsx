import { useState } from "react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const Keypad = ({ passcodeGuess, setPasscodeGuess }) => {
  console.log(passcodeGuess);
  const handleEvent = (number) => {
    if (passcodeGuess.length >= 4) {
      return null;
    } else {
      setPasscodeGuess(`${passcodeGuess}${number}`);
    }
  };
  const handleBackSpace = () => {
    setPasscodeGuess(passcodeGuess.slice(0, -1));
  };

  const handleClear = () => {
    setPasscodeGuess("");
  };
  return (
    <>
      <h1>{passcodeGuess}</h1>
      <div className="grid-container">
        {numbers.map((number) => {
          return (
            <div key={number}>
              <button
                className="grid-items"
                onClick={() => {
                  handleEvent(number);
                }}
              >
                {number}
              </button>
            </div>
          );
        })}
        <br></br>
        <button
          className="grid-items"
          onClick={() => {
            handleBackSpace();
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            handleClear();
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default Keypad;
