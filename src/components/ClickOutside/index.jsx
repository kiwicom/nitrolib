// @flow strict
import * as React from "react";

type Props = {|
  className?: string,
  onClickOutside: (ev: MouseEvent | FocusEvent) => void,
  active: boolean,
  children: React.Node | React.Node[],
|};

export default class ClickOutside extends React.PureComponent<Props> {
  static defaultProps = {
    active: true,
  };

  node: ?HTMLDivElement;

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
    document.addEventListener("focus", this.handleClickOutside, true); // needed to catch clicks into textfields, see https://gitlab.skypicker.com/frontend/nitrolib/issues/39
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
    document.removeEventListener("focus", this.handleClickOutside, true);
  }

  handleClickOutside = (ev: MouseEvent | FocusEvent) => {
    const { active, onClickOutside } = this.props;

    if (active && this.node && ev.target instanceof Node && !this.node.contains(ev.target)) {
      onClickOutside(ev);
    }
  };

  render() {
    const { className, children } = this.props;

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
