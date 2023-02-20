import { useEffect } from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PaymentKeypad = ({
  totalAmount,
  setTotalAmount,
  tempTotal,
  setTempTotal,
}) => {
  useEffect(() => {
    if (tempTotal > 0) {
      setTotalAmount((Number(tempTotal) / 100).toFixed(2));
    }
  }, [tempTotal]);

  const handleEvent = (number) => {
    setTempTotal(`${tempTotal}${number}`);
  };

  const handleBackSpace = () => {
    setTempTotal(tempTotal.slice(0, -1));
  };

  const handleClear = () => {
    setTotalAmount('0.00');
    setTempTotal(0);
  };
  return (
    <>
      <div className="passcode">
        <h3 className="">£{totalAmount}</h3>
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
      </div>
    </>
  );
};

export default PaymentKeypad;
