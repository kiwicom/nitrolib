// @flow strict
import * as React from "react";
import ReactDOM from "react-dom";

type Props = {|
  children: React.Node,
|};

export default class Portal extends React.Component<Props> {
  node = document.getElementById("sidenav") || document.body;

  el = document.createElement("div");

  componentDidMount() {
    if (this.node) {
      this.node.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeChild(this.el);
    }
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.el);
  }
}
