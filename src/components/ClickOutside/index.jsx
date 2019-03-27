// @flow strict
import * as React from "react";

type Props = {|
  onClickOutside: (ev: MouseEvent) => void,
  active: boolean,
  children: React.Node | React.Node[],
  className?: string,
|};

export default class ClickOutside extends React.PureComponent<Props> {
  static defaultProps = {
    active: true,
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (ev: MouseEvent) => {
    const { active, onClickOutside } = this.props;

    if (active && this.node && ev.target instanceof Node && !this.node.contains(ev.target)) {
      onClickOutside(ev);
    }
  };

  node: ?HTMLDivElement;

  render() {
    const { children, className } = this.props;

    return (
      <div
        className={className}
        ref={node => {
          this.node = node;
        }}
      >
        {children}
      </div>
    );
  }
}
