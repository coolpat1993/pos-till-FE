const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Keypad = ({ passcodeGuess, setPasscodeGuess }) => {
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
    setPasscodeGuess('');
  };
  return (
    <>
      <div className="pass-box">{passcodeGuess}</div>
      <div className="grid-container">
        {numbers.map((number) => {
          return (
            <div key={number}>
              <button
                className="grid-items-button"
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
              handleEvent(0);
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
    </>
  );
};

export default Keypad;
