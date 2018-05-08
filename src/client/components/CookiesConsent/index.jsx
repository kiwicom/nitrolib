// @flow strict
import * as React from "react";

import * as cookiesStore from "./services/store";
import Banner from "./Banner";
import InfoModal from "./InfoModal";

type State = {|
  isAccepted: boolean,
  infoShown: boolean,
|};

// TODO: Show consent only in Europe
class CookiesConsent extends React.PureComponent<{}, State> {
  state: State = {
    isAccepted: cookiesStore.isAccepted(),
    infoShown: false,
  };

  handleAccept = () => {
    this.setState({ isAccepted: true });

    cookiesStore.saveAccepted();
  };

  handleShowInfo = () => {
    this.setState({ infoShown: true });
  };

  handleHideInfo = () => {
    this.setState({ infoShown: false });
  };

  render() {
    const { isAccepted, infoShown } = this.state;

    if (isAccepted) {
      return null;
    }

    return (
      <>
        <Banner onAccept={this.handleAccept} onShowInfo={this.handleShowInfo} />
        {infoShown && <InfoModal onClose={this.handleHideInfo} />}
      </>
    );
  }
}

export default CookiesConsent;
