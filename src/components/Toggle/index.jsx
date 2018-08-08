// @flow
import * as React from "react";

type Data = {|
  open: boolean,
  active: boolean,
  onToggle: () => void,
|};

type Props = {|
  children: (data: Data) => React.Node,
|};

type State = {|
  open: boolean,
  active: boolean,
|};

class Toggle extends React.Component<Props, State> {
  state = {
    open: false,
    active: false,
  };

  onToggle = () => {
    this.setState(state => ({
      open: !state.open,
      active: !state.active,
    }));
  };

  render() {
    const { children } = this.props;
    const { open, active } = this.state;

    return children({
      open,
      active,
      onToggle: this.onToggle,
    });
  }
}

export default Toggle;
