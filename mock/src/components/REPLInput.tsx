import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLHistory } from "./REPLHistory";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  inputHistory: string[][];
  setInputHistory: Dispatch<SetStateAction<string[][]>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  commandDict: Map<string, REPLFunction>;
}
/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {
  (args: Array<string>): string;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [commandStringArr, setCommandStringArr] = useState<string[]>([]);
  // TODO WITH TA: build a handleSubmit function called in button onClick
  function handleClick() {
    setCommandStringArr(commandString.split(" "));
    var toCheck = props.commandDict.get(commandStringArr[0]);
    if (typeof toCheck !== "undefined") {
      props.setInputHistory([
        ...props.inputHistory,
        [commandString, toCheck(commandStringArr)],
      ]);
    } else {
      props.setInputHistory([
        ...props.inputHistory,
        [commandString, "Sorry, command not recognized"],
      ]);
    }

    setCommandString("");
    setCommandStringArr([]);
  }
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleClick()}>Submit</button>
    </div>
  );
}
