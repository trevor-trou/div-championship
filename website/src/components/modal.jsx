import * as React from "react";
import { Rules } from "./rules";
export function Modal(props) {
  return (
    <div className={props.active ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={props.toggle} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Rules of the Game</p>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <Rules />
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={props.toggle}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
