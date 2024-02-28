import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLFunction, REPLInput } from "./REPLInput";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  const [inputHistory, setInputHistory] = useState<string[][]>([]);
  // shared state for mode command, false=brief mode, true=verbose
  const [mode, setMode] = useState<boolean>(false);
  const [commandDict, setCommandDict] = useState<Map<string, REPLFunction>>(
    new Map()
  );

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory inputHistory={inputHistory} mode={mode} />
      <hr></hr>
      <REPLInput
        inputHistory={inputHistory}
        setInputHistory={setInputHistory}
        mode={mode}
        setMode={setMode}
        commandDict={commandDict}
      />
    </div>
  );
}
