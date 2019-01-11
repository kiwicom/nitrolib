// @flow
import * as React from "react";

type Data = {|
  open: boolean,
  onToggle: () => void,
|};

type Props = {|
  children: (data: Data) => React.Node,
  // defaulted
  initial: boolean,
|};

type State = {|
  open: boolean,
|};

class Toggle extends React.Component<Props, State> {
  static defaultProps = {
    initial: false,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    open: this.props.initial,
  };

  onToggle = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return children({
      open,
      onToggle: this.onToggle,
    });
  }
}

export default Toggle;
