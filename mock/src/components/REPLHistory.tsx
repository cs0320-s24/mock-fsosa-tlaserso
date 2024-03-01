import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  inputHistory: Array<Array<string | string[][]>>;
  brief: boolean;
}
/**
 *This is the function that displays the history.  It uses map to display the output as a string or as an 
 html table, if the output is a 2d array instead of a string.
 * @param props The input history array and also a boolean indiciating which mode the output is in.
 * @returns
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.brief ? (
        <p>
          {props.inputHistory.map((command) => {
            if (typeof command[1] === "string") {
              return <p>{command[1]}</p>;
            } else {
              return (
                <table>
                  {command[1].map((command) => (
                    <tr>
                      {command.map((command2) => (
                        <th>{command2}</th>
                      ))}
                    </tr>
                  ))}
                </table>
              );
            }
          })}
        </p>
      ) : (
        <p>
          {props.inputHistory.map((command) => {
            if (typeof command[1] === "string") {
              return (
                <p>
                  input: {command[0]}
                  <br></br> output: {command[1]}
                </p>
              );
            } else {
              return (
                <p>
                  {" "}
                  input: {command[0]}
                  <br></br> output:
                  <br></br>
                  <table>
                    {command[1].map((command) => (
                      <tr>
                        {command.map((command2) => (
                          <th>{command2}</th>
                        ))}
                      </tr>
                    ))}
                  </table>
                </p>
              );
            }
          })}
        </p>
      )}
    </div>
  );
}
