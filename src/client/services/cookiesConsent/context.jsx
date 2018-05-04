// @flow strict
/* eslint-disable react/no-unused-state */
import * as React from "react";

import * as cookiesConsentStore from "./store";

const { Consumer, Provider } = React.createContext({
  isAccepted: true,
  accept: () => {},
});

export type Context = {|
  isAccepted: boolean,
  accept: () => void,
|};

type Props = {|
  value: boolean,
  children: React.Node,
|};

type State = Context;

class CookiesConsentProvider extends React.Component<Props, State> {
  static defaultProps = {
    value: cookiesConsentStore.isAccepted(),
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isAccepted: props.value,
      accept: this.accept,
    };
  }

  accept = () => {
    this.setState({ isAccepted: true });

    cookiesConsentStore.saveAccepted();
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { Consumer, CookiesConsentProvider as Provider };
