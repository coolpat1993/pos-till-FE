import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PaymentKeypad = ({ totalAmount, setTotalAmount }) => {

    const [tempTotal, setTempTotal] = useState(0.00)



    useEffect(() => {
        if (tempTotal > 0) {
            setTotalAmount((Number(tempTotal) / 100).toFixed(2))
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
        setTempTotal(0)
    };
    return (
        <>
            <Container>
                <div className="">
                    <h1 className="ml-10">£{totalAmount}</h1>
                    <div className="grid-container col-4">
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
                </div>
            </Container>
        </>
    );
};

export default PaymentKeypad;
