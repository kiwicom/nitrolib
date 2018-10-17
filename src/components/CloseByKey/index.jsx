// @flow strict
import * as React from "react";

const ESCAPE = "Escape";

type Props = {|
  closeKey: string,
  children: React.Node,
  onClose: (event?: KeyboardEvent) => void,
|};

export default class CloseByKey extends React.PureComponent<Props> {
  static defaultProps = {
    closeKey: ESCAPE,
  };

  componentDidMount() {
    const { body } = document;

    if (body) {
      body.focus();
      body.addEventListener("keydown", this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    const { body } = document;

    if (body) {
      body.removeEventListener("keydown", this.handleKeyDown);
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();

    const { closeKey, onClose } = this.props;

    if (onClose && event.key === closeKey) {
      onClose(event);
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}
