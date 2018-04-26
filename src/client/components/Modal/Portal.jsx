// @flow
import * as React from "react";
import ReactDOM from "react-dom";

type Props = {|
  children: React.Node,
|};

export default class Portal extends React.Component<Props> {
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

  node = document.getElementById("modal");
  el = document.createElement("div");

  render() {
    if (!this.el) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
