import * as React from "react";

type Data = {
  value: string,
  onChange: (value?: string) => void,
};

type Props = {
  children: (data: Data) => React.ReactNode,
  // defaulted
  initial: string,
};

type State = {
  value: string,
};

export default class Value extends React.Component<Props, State> {
  static defaultProps = {
    initial: ,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.initial,
  };

  handleChange = (value?: string = ) => {
    this.setState({ value });
  };

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return children({ value, onChange: this.handleChange });
  }
}
