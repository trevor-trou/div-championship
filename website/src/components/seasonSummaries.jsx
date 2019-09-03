import * as React from "react";
import { ScoreCard } from "./scoreCard";
import { SeasonSummaryCard } from "./seasonSummaryCard";

export function SeasonSummaries(props) {
  //  If still fetching (props.seasonSummaries === null), show a loader
  // else, show the tournaments.
  if (!props.seasonSummaries) {
    return (
      <div className="columns">
        <div className="column" />
        <div className="column is-one-third">
          <progress className="progress is-primary" />
        </div>
        <div className="column" />
      </div>
    );
  } else if (props.seasonSummaries.length === 0) {
    return (
      <div className="columns">
        <div className="column" />
        <div className="column is-half">
          <p className="has-text-centered is-size-5">
            No previous seasons to report
          </p>
        </div>
        <div className="column" />
      </div>
    );
  } else {
    return props.seasonSummaries.map((r, i) => {
      return (
        <div className="columns" key={i} style={{ marginRight: 0 }}>
          <div className="column" />
          <div className="column is-half" style={{ paddingRight: 0 }}>
            <SeasonSummaryCard instance={r} />
          </div>
          <div className="column" />
        </div>
      );
    });
  }
}
