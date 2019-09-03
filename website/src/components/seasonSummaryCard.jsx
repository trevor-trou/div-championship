import * as React from "react";

/* Example instance prop:
 *  {
 *      title: "Summer '19",
 *      active: false,
 *      statistics: [
 *          {
 *              name: "Trevor",
 *              matches: 2,
 *              games: 4
 *          }
 *      ]
 *  }
 */
export function SeasonSummaryCard(props) {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title is-size-3 has-text-centered is-inline">
          {props.instance.title}
        </p>
      </header>
      {props.instance.statistics.length > 0
        ? getTable(props.instance)
        : noResultsBody()}
    </div>
  );
}

function noResultsBody() {
  return (
    <div className="card-content">
      <p className="has-text-centered is-size-5">
        Available after the first game is played
      </p>
    </div>
  );
}

function getTable(summary) {
  return (
    <div className="card-content">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Player</th>
            <th align="right">
              <abbr title="Matches Won">M</abbr>
            </th>
            <th align="right">
              <abbr title="Games Won">G</abbr>
            </th>
          </tr>
        </thead>
        <tbody className="no-border">
          {summary.statistics.map((stat, i) => {
            let pClassName =
              "is-size-4" +
              (i === 0 && !summary.active ? " has-text-weight-bold" : "");

            return (
              <tr key={i}>
                <td align="left">
                  <p className={pClassName}>
                    {stat.name}
                    {i === 0 && !summary.active ? " 🏆" : ""}
                  </p>
                </td>
                <td align="right">
                  <p className={pClassName}>{stat.matches}</p>
                </td>
                <td align="right">
                  <p className={pClassName}>{stat.games}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
