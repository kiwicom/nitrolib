import * as React from "react";

type Props = {
  loader: React.ReactNode,
  children: React.ReactNode,
};

type State = {
  mounted: boolean,
};

export default class ClientOnly extends React.Component<Props, State> {
  static defaultProps = {
    loader: null,
  };

  state = {
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const { loader, children } = this.props;
    const { mounted } = this.state;

    if (!mounted) {
      return loader;
    }

    return children;
  }
}
