import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  inputHistory: Array<Array<string | string[][]>>;
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div>
      {props.mode ? (
        <p>
          {props.inputHistory.map((command) => (
            <p>{command[1]}</p>
          ))}
        </p>
      ) : (
        <p>
          {props.inputHistory.map((command) => (
            <p>
              input: {command[0]} <br></br> output: {command[1]}
            </p>
          ))}
        </p>
      )}
    </div>
  );
}
