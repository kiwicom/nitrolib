// @flow strict
import * as React from "react";

import CookiesBanner from "./components/CookiesBanner";

type Props = {|
  onAccept: () => void,
|};

type State = {|
  accepted: boolean,
|};

class CookiesConsent extends React.PureComponent<Props, State> {
  state = {
    accepted: false,
  };

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
