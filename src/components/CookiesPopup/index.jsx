// @flow strict
import * as React from "react";

import CookiesBanner from "./components/CookiesBanner";
import CookiesCustomize from "./components/CookiesCustomize";
import Popup from "./components/CookiesPopup";

type Props = {|
  onAccept: ({|
    performance: boolean,
    marketing: boolean,
    advertisement: boolean,
  |}) => void,
  type: "popup" | "banner",
|};

type State = {|
  accepted: boolean,
  customize: boolean,
|};

class CookiesPopup extends React.PureComponent<Props, State> {
  static defaultProps = {
    type: "popup",
  };

  state = {
    accepted: false,
    customize: false,
  };

  handleAccept = (
    cookiePolicy: {|
      performance: boolean,
      marketing: boolean,
      advertisement: boolean,
    |} = {
      performance: true,
      marketing: true,
      advertisement: true,
    },
  ) => {
    const { onAccept } = this.props;
    this.setState({ accepted: true, customize: false });

    onAccept(cookiePolicy);
  };

  openCustomize = () => {
    this.setState({ customize: true });
  };

  closeCustomize = () => {
    this.setState({ customize: false });
  };

  render() {
    const { accepted, customize } = this.state;
    const { type } = this.props;

    if (accepted) {
      return null;
    }

    return (
      <section
        id="cookie_consent" // For ads/i-don't-care-about-cookies blockers
        data-test="CookiesPopup"
      >
        {customize && (
          <CookiesCustomize onClose={this.closeCustomize} onAccept={this.handleAccept} />
        )}
        {type === "popup" ? (
          !customize && <Popup onAccept={this.handleAccept} onCustomize={this.openCustomize} />
        ) : (
          <CookiesBanner onAccept={this.handleAccept} onCustomize={this.openCustomize} />
        )}
      </section>
    );
  }
}

export default CookiesPopup;
