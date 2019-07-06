import * as React from "react";
import * as ReactDOM from "react-dom";
import { ScoreCard } from "./components/scoreCard";
import { Modal } from "./components/modal";
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

    this.state = {
      tournaments: null,
      alert: null,
      modalOpen: false
    };

    this.getBody = this.getBody.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/getScoreboard`)
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.error(err);
        this.setState({
          alert: "Unable to load... Please try again later."
        });
      })
      .then(json => {
        this.setState({ tournaments: json });
      });
  }

  getBody() {
    // If we have an error, show it.
    if (this.state.alert) {
      return (
        <div className="columns">
          <div className="column" />
          <div className="column is-half">
            <article className="message is-danger">
              <div className="message-body">{this.state.alert}</div>
            </article>
          </div>
          <div className="column" />
        </div>
      );
    }

    // If still fetching (this.state.tournaments === null), show a loader
    // else, show the tournaments.
    if (!this.state.tournaments) {
      return (
        <div className="columns">
          <div className="column" />
          <div className="column is-one-third">
            <progress className="progress is-primary" />
          </div>
          <div className="column" />
        </div>
      );
    } else {
      return this.state.tournaments.map((r, i) => {
        return (
          <div className="columns" key={i} style={{marginRight: 0}}>
            <div className="column" />
            <div className="column is-half" style={{paddingRight: 0}}>
              <ScoreCard instance={r} />
            </div>
            <div className="column" />
          </div>
        );
      });
    }
  }

  toggleModal() {
    this.setState(prev => {
      return {
        modalOpen: !prev.modalOpen
      };
    });
  }

  render() {
    return (
      <>
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-size-2-mobile is-size-1-tablet is-family-code">
                &lt;div&gt; Championship Series &lt;/div&gt;
              </h1>
            </div>
          </div>
        </section>
        <div className="container flex">{this.getBody()}</div>
        <a
          className="button is-rounded floating is-medium"
          onClick={this.toggleModal}
        >
          Rules
        </a>
        <Modal toggle={this.toggleModal} active={this.state.modalOpen}/>
      </>
    );
  }
}

ReactDOM.render(<DivMainPage />, document.getElementById("app"));
