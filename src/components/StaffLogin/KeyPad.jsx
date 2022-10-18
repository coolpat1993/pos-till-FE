import { useState } from "react";
import { Container } from "react-bootstrap";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
      <Container>
        <div className="">
          <h1 className="ml-10">{passcodeGuess}</h1>
          <div className="grid-container col-4">
            {numbers.map((number) => {
              return (
                <div key={number}>
                  <button
                    className="grid-items-button "
                    onClick={() => {
                      handleEvent(number);
                    }}
                  >
                    {number}
                  </button>
                </div>
              );
            })}
            <div>
              <button
                className="grid-items-button"
                onClick={() => {
                  handleBackSpace();
                }}
              >
                &#60;
              </button>
            </div>
            <div>
              <button
                className="grid-items-button"
                onClick={() => {
                  handleEvent();
                }}
              >
                0
              </button>
            </div>
            <div>
              <button
                className="grid-items-button"
                onClick={() => {
                  handleClear();
                }}
              >
                C
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Keypad;
