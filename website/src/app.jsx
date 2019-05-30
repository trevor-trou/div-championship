import * as React from "react";
import * as ReactDOM from "react-dom";
import { ScoreCard } from "./components/scoreCard";
import "./overrides.css";

const results = [
  {
    date: new Date("2019-05-24T13:00:00"),
    title: "Week 2",
    players: ["Trevor", "Alex", "Auston"],
    results: [0, 1, 2, 1]
  },
  {
    date: new Date("2019-05-24T13:00:00"),
    title: "Week 1",
    players: ["Trevor", "Alex", "Auston"],
    results: [1, 1]
  }
];

class DivMainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-1 is-family-code">
                &lt;div&gt; Championship Series &lt;/div&gt;
              </h1>
            </div>
          </div>
        </section>
        <div className="container flex">
          {results.map(r => {
            return (
              <div className="columns">
                <div className="column" />
                <div className="column is-half">
                  <ScoreCard instance={r} />
                </div>
                <div className="column" />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

ReactDOM.render(<DivMainPage />, document.getElementById("app"));
