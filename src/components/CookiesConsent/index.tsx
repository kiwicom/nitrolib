import * as React from "react";

import CookiesBanner from "./components/CookiesBanner";

type Props = {
  onAccept: () => void,
};

type State = {
  accepted: boolean,
};

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

    return (
      <section
        id="cookie_consent" // For ads/i-don't-care-about-cookies blockers
        data-test="CookiesConsent"
      >
        <CookiesBanner onAccept={this.handleAccept} />
      </section>
    );
  }
}

export default CookiesConsent;
