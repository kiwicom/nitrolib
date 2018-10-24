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

  handleClickOutside = (ev: MouseEvent) => {
    const { onClickOutside } = this.props;

    if (this.node && ev.target instanceof Node && !this.node.contains(ev.target)) {
      ev.stopPropagation();
      onClickOutside(ev);
    }
  };

  node: ?HTMLDivElement;

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
