import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const KeyPad = () => {
  const onChange = (input) => {
    console.log("Input changed", input);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
  };

  return <Keyboard onChange={onChange()} onKeyPress={onKeyPress()} />;
};

export default KeyPad;
