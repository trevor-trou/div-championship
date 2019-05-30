import * as React from "react";
import * as ReactDOM from "react-dom";
import { ScoreCard } from "./components/scoreCard";
import "./overrides.css";

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
        <div className="container flex full-height">
          <div className="columns">
            <div className="column is-half">
              <ScoreCard />
            </div>
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<DivMainPage />, document.getElementById("app"));
