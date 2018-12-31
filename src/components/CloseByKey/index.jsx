// @flow strict
import * as React from "react";

const ESCAPE = "Escape";

type Props = {|
  onClose: (ev: KeyboardEvent) => void,
  children: React.Node,
  // defaulted
  closeKey: string,
|};

export default class CloseByKey extends React.PureComponent<Props> {
  static defaultProps = {
    closeKey: ESCAPE,
  };

  componentDidMount() {
    const { body } = document;

    if (body) {
      body.addEventListener("keydown", this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    const { body } = document;

    if (body) {
      body.removeEventListener("keydown", this.handleKeyDown);
    }
  }

  handleKeyDown = (ev: KeyboardEvent) => {
    ev.stopPropagation();

    const { closeKey, onClose } = this.props;

    if (onClose && ev.key === closeKey) {
      onClose(ev);
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}
