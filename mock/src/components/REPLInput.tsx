import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLHistory } from "./REPLHistory";
import { MockedSearch, MockedView } from "./mockedBackEnd";
import path from "path";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  //input History is a 2d array storing either strings or another 2d array.  Typechecking is used to know which.
  inputHistory: Array<Array<string | string[][]>>;
  setInputHistory: Dispatch<SetStateAction<Array<Array<string | string[][]>>>>;
  brief: boolean;
  setBrief: Dispatch<SetStateAction<boolean>>;
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

/**
 * This is the main input function.  It handles all usage of the input box and the submit button.  It internally uses
 * a map from strings to functions of type REPLFunction to store commands.  New commands can be added by creating a function
 * implementing REPLFunction and then adding it to the map.
 * @param props
 * @returns
 */
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [pathString, setPathString] = useState<string>("");
  let Mode: REPLFunction;
  /**
   * This is an example of an implementing function.  This one is mode.
   */
  Mode = function (args: Array<string>): string {
    if (args.length > 1) {
      return "wrong number of args (mode takes no input)";
    }
    if (props.brief) {
      props.setBrief(false);
      return "changed to verbose";
    } else {
      props.setBrief(true);
      return "changed to brief";
    }
  };
  let Load_File: REPLFunction;
  /**
   * This is the implementation of the load file function.  For now, it just sets a saved string to be the input path.
   */
  Load_File = function (args: Array<string>): string {
    if (args.length == 2) {
      setPathString(args[1]);
      return "Path changed to ".concat(args[1]);
    } else {
      return "wrong number of args.  Load_File only takes the filepath";
    }
  };
  /**
   * This is the view function.  It returns the table gotten from the source (the mocked back end)
   */
  let View: REPLFunction;
  View = function (args: Array<string>): string[][] | string {
    if (args.length == 1 && pathString != "") {
      return MockedView(pathString);
    } else if (pathString == "") {
      return "Sorry, no file has been loaded";
    } else {
      return "Sorry, wrong number of args.  View takes no args.";
    }
  };
  /**
   * This is the search function.  It returns the table gotten from the source (the mocked back end)
   */
  let Search: REPLFunction;
  Search = function (args: Array<string>): string[][] | string {
    if (args.length == 3 && pathString != "") {
      return MockedSearch(pathString, args);
    } else if (pathString == "") {
      return "Sorry, no file has been loaded";
    } else {
      return "Sorry, wrong number of args.  Search takes <column> <value> args.";
    }
  };
  props.setCommandDict(props.commandDict.set("Mode", Mode));
  props.setCommandDict(props.commandDict.set("Load_File", Load_File));
  props.setCommandDict(props.commandDict.set("View", View));
  props.setCommandDict(props.commandDict.set("Search", Search));
  /**
   * This is the click handler.  It first checks the type of the command map, making sure it is a REPLfunction
   * if it is, it adds the result of the function to the history output.  If not, it adds an error message to the
   * output.
   */
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
      <button onClick={() => handleClick()}>Submit</button>
    </div>
  );
}
