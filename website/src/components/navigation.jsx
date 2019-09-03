import * as React from "react";

export function Navigation(props) {
  return (
    <div className="tabs is-toggle is-centered">
      <ul>
        <li className={props.page === 0 ? "is-active" : ""}>
          <a
            onClick={() => {
              props.setPage(0);
            }}
          >
            <span>Current Season</span>
          </a>
        </li>
        <li className={props.page === 1 ? "is-active" : ""}>
          <a
            onClick={() => {
              props.setPage(1);
            }}
          >
            <span>Previous Seasons</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
