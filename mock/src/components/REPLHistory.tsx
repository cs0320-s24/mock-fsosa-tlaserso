import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  inputHistory: String[][];
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div>
      {props.mode ? (
        <h1>
          {props.inputHistory.map((command) => (
            <p>{command[0]}</p>
          ))}
          ;
        </h1>
      ) : (
        <h1>
          {props.inputHistory.map((command) => (
            <p>
              input: {command[0]}
              output: {command[1]}
            </p>
          ))}
          ;
        </h1>
      )}
    </div>
  );
}
