import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLHistory } from "./REPLHistory";
import { MockedSearch, MockedView } from "./mockedJson";
import path from "path";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  inputHistory: Array<Array<string | string[][]>>;
  setInputHistory: Dispatch<SetStateAction<Array<Array<string | string[][]>>>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  commandDict: Map<string, REPLFunction>;
  setCommandDict: Dispatch<SetStateAction<Map<string, REPLFunction>>>;
}
/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [pathString, setPathString] = useState<string>("");
  let Mode: REPLFunction;
  Mode = function (args: Array<string>): string {
    if (args.length > 1) {
      return "wrong number of args (mode takes no input)";
    }
    if (props.mode) {
      props.setMode(false);
      return "changed to verbose";
    } else {
      props.setMode(true);
      return "changed to brief";
    }
  };
  let Load_File: REPLFunction;
  Load_File = function (args: Array<string>): string {
    if (args.length == 2) {
      setPathString(args[1]);
      return "Path changed to ".concat(args[1]);
    } else {
      return "wrong number of args.  Load_File only takes the filepath";
    }
  };
  let View: REPLFunction;
  View = function (args: Array<string>): string[][] | string {
    if (args.length == 1) {
      return MockedView(pathString);
    } else {
      return "Sorry, wrong number of args.  View takes no args.";
    }
  };
  let Search: REPLFunction;
  Search = function (args: Array<string>): string[][] | string {
    if (args.length == 3) {
      return MockedSearch(pathString, args);
    } else {
      return "Sorry, wrong number of args.  Search takes <column> <value> args.";
    }
  };
  props.setCommandDict(props.commandDict.set("Mode", Mode));
  props.setCommandDict(props.commandDict.set("Load_File", Load_File));
  props.setCommandDict(props.commandDict.set("View", View));
  props.setCommandDict(props.commandDict.set("Search", Search));
  // TODO WITH TA: build a handleSubmit function called in button onClick
  function handleClick() {
    let commandarray = commandString.split(" ");
    var toCheck = props.commandDict.get(commandarray[0]);
    if (typeof toCheck !== "undefined") {
      props.setInputHistory([
        ...props.inputHistory,
        [commandString, toCheck(commandarray)],
      ]);
    } else {
      props.setInputHistory([
        ...props.inputHistory,
        [commandString, "Sorry, command not recognized"],
      ]);
    }

    setCommandString("");
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
