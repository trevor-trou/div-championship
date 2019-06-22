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
  let scores = props.instance.players.map(player => {
    return {
      score: 0,
      player
    };
  });

  props.instance.results.forEach(r => {
    scores[r].score += 1;
  });

  scores.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    }

    if (a.score < b.score) {
      return 1;
    }

    return 0;
  });

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
            {scores.map((score, i) => {
              if (i === 0) {
                return (
                  <tr key={i}>
                    <td align="left">
                      <p className="is-size-3 has-text-weight-bold">
                        {score.player}
                      </p>
                    </td>
                    <td align="right">
                      <p className="is-size-3 has-text-weight-bold">
                        ({score.score})
                      </p>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={i}>
                  <td align="left">
                    <p className="is-size-4">{score.player}</p>
                  </td>
                  <td align="right">
                    <p className="is-size-4">({score.score})</p>
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
