// @flow strict
import * as React from "react";

import ClientOnly from "client/components/ClientOnly";

import * as cookiesStore from "client/services/cookies/store";

import Banner from "./Banner";
import InfoModal from "./InfoModal";

type State = {|
  isAccepted: boolean,
  infoShown: boolean,
|};

// TODO: Show consent only in Europe
class CookiesConsent extends React.PureComponent<*, State> {
  state: State = {
    isAccepted: cookiesStore.isAccepted(),
    infoShown: false,
  };

  accept = () => {
    this.setState({ isAccepted: true });

    cookiesStore.saveAccepted();
  };

  showInfo = () => {
    this.setState({ infoShown: true });
  };

  hideInfo = () => {
    this.setState({ infoShown: false });
  };

  render() {
    const { isAccepted, infoShown } = this.state;

    return (
      <ClientOnly>
        {!isAccepted && ( // TODO: Add continent check
          <React.Fragment>
            <Banner accept={this.accept} showInfo={this.showInfo} />
            {infoShown && <InfoModal close={this.hideInfo} />}
          </React.Fragment>
        )}
      </ClientOnly>
    );
  }
}

export default CookiesConsent;
