// @flow
import * as React from "react";

/* PROPS */
type Data = {|
  open: boolean,
  onToggle: () => void,
|}; // ...docs

type Props = {|
  children: (data: Data) => React.Node,
|};

type State = {|
  open: boolean,
|};

class Toggle extends React.Component<Props, State> {
  state = {
    open: false,
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
