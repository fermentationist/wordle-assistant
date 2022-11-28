import SimpleKeyboard from "react-simple-keyboard";
import "./Keyboard.css";
import "react-simple-keyboard/build/css/index.css";

const Keyboard = ({ className, onKeyPress }) => {
  return (
    <SimpleKeyboard
      onKeyPress={onKeyPress}
      className={className ? className : ""}
      layout={{
        default: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L {bksp}",
          "Z X C V B N M {enter}",
        ],
      }}
      display={{
        "{bksp}": "🔙",
        "{enter}": "Enter",
        "@": "at",
      }}
      theme="hg-theme-default virtual-keyboard-style"
    />
  );
};

export default Keyboard;
