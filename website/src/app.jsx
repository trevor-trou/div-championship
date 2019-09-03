import * as React from "react";
import * as ReactDOM from "react-dom";
import { Modal } from "./components/modal";
import "./overrides.css";
import { Navigation } from "./components/navigation";
import { CurrentSeason } from "./components/currentSeason";
import { PreviousSeasons } from "./components/previousSeasons";

class DivMainPage extends React.Component {
  constructor(props) {
    super(props);

    // page 0 = current season, page 1 = previous seasons
    this.state = {
      tournaments: null,
      seasonSummaries: null,
      alert: null,
      selectedPage: 0,
      modalOpen: false
    };

    this.getBody = this.getBody.bind(this);
    this.setPage = this.setPage.bind(this);
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

    fetch(`${API_BASE_URL}/getSeasonSummaries`)
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
        this.setState({ seasonSummaries: json });
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

    switch (this.state.selectedPage) {
      case 0:
        return <CurrentSeason tournaments={this.state.tournaments} />;
      case 1:
        return <PreviousSeasons seasonSummaries={this.state.seasonSummaries} />;
    }
  }

  toggleModal() {
    this.setState(prev => {
      return {
        modalOpen: !prev.modalOpen
      };
    });
  }

  setPage(pageNumber) {
    if (this.state.selectedPage !== pageNumber) {
      this.setState({
        selectedPage: pageNumber
      });
    }
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
        <section style={{ paddingBottom: "48px" }}>
          <Navigation page={this.state.selectedPage} setPage={this.setPage} />
        </section>
        <div className="container flex">{this.getBody()}</div>
        <a
          className="button is-rounded floating is-medium"
          onClick={this.toggleModal}
        >
          Rules
        </a>
        <Modal toggle={this.toggleModal} active={this.state.modalOpen} />
      </>
    );
  }
}

ReactDOM.render(<DivMainPage />, document.getElementById("app"));
