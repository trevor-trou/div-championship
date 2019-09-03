import * as React from "react";
import { ScoreCard } from "./scoreCard";

export function CurrentSeason(props) {
  //  If still fetching (props.tournaments === null), show a loader
  // else, show the tournaments.
  if (!props.tournaments) {
    return (
      <div className="columns">
        <div className="column" />
        <div className="column is-one-third">
          <progress className="progress is-primary" />
        </div>
        <div className="column" />
      </div>
    );
  } else if (props.tournaments.length === 0) {
    return (
      <div className="columns">
        <div className="column" />
        <div className="column is-half">
          <p className="has-text-centered is-size-5">
            No results have been posted for this season
          </p>
        </div>
        <div className="column" />
      </div>
    );
  } else {
    return props.tournaments.map((r, i) => {
      return (
        <div className="columns" key={i} style={{ marginRight: 0 }}>
          <div className="column" />
          <div className="column is-half" style={{ paddingRight: 0 }}>
            <ScoreCard instance={r} />
          </div>
          <div className="column" />
        </div>
      );
    });
  }
}
