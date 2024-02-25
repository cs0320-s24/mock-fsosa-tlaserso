import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  inputHistory: String[];
  outputHistory: String[];
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return <div className="repl-history">{forLoop(props)}</div>;
}

function forLoop(props: REPLHistoryProps) {
  if (!props.mode) {
    return props.inputHistory.map((command) => <p>{command}</p>);
  } else {
    for (let i = 0; i < props.inputHistory.length; i++) {
      return (
        <p>
          Command: {props.inputHistory[i]} Output: {props.outputHistory[i]}
        </p>
      );
    }
  }
}
