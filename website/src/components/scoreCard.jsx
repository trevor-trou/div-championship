import * as React from "react";
import "../overrides.css";
/* Example prop:
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
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title is-size-3 has-text-centered is-inline">
          Week 1
        </p>
      </header>
      <div className="card-content">
        <table className="table is-fullwidth">
          <tbody className="no-border">
            <tr>
              <td align="left">
                <p className="is-size-3 has-text-weight-bold">Alex</p>
              </td>
              <td align="right">
                <p className="is-size-3 has-text-weight-bold">(2)</p>
              </td>
            </tr>
            <tr>
              <td align="left">
                <p className="is-size-4">Trevor</p>
              </td>
              <td align="right">
                <p className="is-size-4">(0)</p>
              </td>
            </tr>
            <tr>
              <td align="left">
                <p className="is-size-4">Auston</p>
              </td>
              <td align="right">
                <p className="is-size-4">(0)</p>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th />
              <th align="center">Alex</th>
              <th align="center">Trevor</th>
              <th align="center">Auston</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="left">Game 1</td>
              <td align="center">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </td>
              <td align="center">
                <span className="icon">
                  <i className="fas fa-minus" />
                </span>
              </td>
              <td align="center">
                <span className="icon">
                  <i className="fas fa-minus" />
                </span>
              </td>
            </tr>
            <tr>
              <td align="left">Game 2</td>
              <td align="center">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </td>
              <td align="center">
                <span className="icon">
                  <i className="fas fa-minus" />
                </span>
              </td>
              <td align="center">
                <span className="icon">
                  <i className="fas fa-minus" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
