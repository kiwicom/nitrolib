// @flow strict
import * as React from "react";

type Data = {|
  open: boolean,
  onToggle: () => void,
|};

type Props = {|
  open: boolean,
  onToggle: () => void,
  onOpen: () => void,
  children: (data: Data) => React.Node,
|};

export default class Core extends React.PureComponent<Props> {
  handleToggle = () => {
    const { onOpen, open, onToggle } = this.props;

    if (!open) {
      onOpen();
    }
    onToggle();
  };

  render() {
    const { open, children } = this.props;

    return children({ open, onToggle: this.handleToggle });
  }
}
