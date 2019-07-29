import * as React from "react";

type Data = {
  onClick: () => void,
};

type Props = {
  value: string,
  onChange: (value: string) => void,
  children: (data: Data) => React.ReactNode,
};

export default class ValueBind extends React.Component<Props> {
  handleClick = () => {
    const { value, onChange } = this.props;

    onChange(value);
  };

  render() {
    const { children } = this.props;

    return children({ onClick: this.handleClick });
  }
}
