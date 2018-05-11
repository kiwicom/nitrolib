// @flow strict
import * as React from "react";

type Props = {|
  onClickOutside: (ev: MouseEvent) => void,
  children: React.Node | React.Node[],
|};

export default class ClickOutside extends React.PureComponent<Props> {
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  node: ?HTMLDivElement;

  handleClickOutside = (ev: MouseEvent) => {
    if (this.node && ev.target instanceof Node && !this.node.contains(ev.target)) {
      this.props.onClickOutside(ev);
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        {children}
      </div>
    );
  }
}
