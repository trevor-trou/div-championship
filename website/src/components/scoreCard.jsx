import * as React from "react";
import "../overrides.css";

/* Example instance prop:
 *   {
 *       date: Date,
 *       title: "Week 1 Tournament",
 *       players: ["playerOne", "playerTwo"],
 *       results: [0, 1, 0]
 *   }
 *
 * In this example, playerOne won the first and third games
 * (note that playerOne is index 0 in the players array)
 * and playerTwo won the second game
 */
export function ScoreCard(props) {
  // Get the score for each player
  let scores = new Array(props.instance.players.length);
  scores.fill(0);
  props.instance.results.forEach(r => {
    scores[r] += 1;
  });

  const winner = scores.indexOf(2);

  if (winner === -1) throw new Error("there wasn't a winner...");

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title is-size-3 has-text-centered is-inline">
          {props.instance.title}
        </p>
      </header>
      <div className="card-content">
        <table className="table is-fullwidth">
          <tbody className="no-border">
            <tr key={winner}>
              <td align="left">
                <p className="is-size-3 has-text-weight-bold">
                  {props.instance.players[winner]}
                </p>
              </td>
              <td align="right">
                <p className="is-size-3 has-text-weight-bold">
                  ({scores[winner]})
                </p>
              </td>
            </tr>
            {props.instance.players.map((p, i) => {
              if (i === winner) return null;

              return (
                <tr key={i}>
                  <td align="left">
                    <p className="is-size-4">{p}</p>
                  </td>
                  <td align="right">
                    <p className="is-size-4">({scores[i]})</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th key={-1} />
              {props.instance.players.map((p, i) => {
                return (
                  <th align="center" key={i}>
                    {p}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {props.instance.results.map((r, i) => {
              return (
                <tr key={i}>
                  <td align="left" key={-1}>
                    Game {i + 1}
                  </td>
                  {props.instance.players.map((p, j) => {
                    if (r === j) {
                      return (
                        <td align="center" key={j}>
                          <span className="icon">
                            <i className="fas fa-check" />
                          </span>
                        </td>
                      );
                    }
                    return (
                      <td align="center" key={j}>
                        <span className="icon">
                          <i className="fas fa-minus" />
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
