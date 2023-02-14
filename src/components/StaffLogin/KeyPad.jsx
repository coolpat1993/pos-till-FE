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
      <div className="passcode">
        {passcodeGuess === '' ? (
          <p>Enter passcode below</p>
        ) : (
          <p>{passcodeGuess}</p>
        )}
      </div>
      <div className="numpad">
        {numbers.map((number) => {
          return (
            <div key={number}>
              <button
                className="numpad__button"
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
            className="numpad__button"
            onClick={() => {
              handleBackSpace();
            }}
          >
            &#60;
          </button>
        </div>
        <div>
          <button
            className="numpad__button"
            onClick={() => {
              handleEvent(0);
            }}
          >
            0
          </button>
        </div>
        <div>
          <button
            className="numpad__button"
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
