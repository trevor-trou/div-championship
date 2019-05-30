import * as React from "react";
import * as ReactDOM from "react-dom";

class DivMainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Hello World</h1>;
    }
}

ReactDOM.render(<DivMainPage />, document.getElementById("app"));