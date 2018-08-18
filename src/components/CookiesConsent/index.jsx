// @flow strict
import * as React from "react";

import CookiesBanner from "./components/CookiesBanner";

type Props = {|
  accepted: boolean, // eslint-disable-line react/no-unused-prop-types
  onAccept: () => void,
|};

type State = {|
  accepted: boolean,
|};

class CookiesConsent extends React.PureComponent<Props, State> {
  state = {
    accepted: false,
  };

  static getDerivedStateFromProps(props: Props) {
    return {
      accepted: props.accepted,
    };
  }

  handleAccept = () => {
    const { onAccept } = this.props;
    this.setState({ accepted: true });

    onAccept();
  };

  render() {
    const { accepted } = this.state;

    if (accepted) {
      return null;
    }

    return <CookiesBanner onAccept={this.handleAccept} />;
  }
}

export default CookiesConsent;
