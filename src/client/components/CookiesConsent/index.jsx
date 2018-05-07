// @flow strict
import * as React from "react";

import ClientOnly from "client/components/ClientOnly";
import * as cookiesStore from "client/components/CookiesConsent/services/store";
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

    return (
      <ClientOnly>
        {!isAccepted && ( // TODO: Add continent check
          <React.Fragment>
            <Banner onAccept={this.handleAccept} onShowInfo={this.handleShowInfo} />
            {infoShown && <InfoModal onClose={this.handleHideInfo} />}
          </React.Fragment>
        )}
      </ClientOnly>
    );
  }
}

export default CookiesConsent;
