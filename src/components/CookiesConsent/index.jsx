// @flow strict
import * as React from "react";

import CookiesBanner from "./components/CookiesBanner";
import CookiesModal from "./components/CookiesModal";

type Props = {|
  accepted: boolean, // eslint-disable-line react/no-unused-prop-types
  onAccept: () => void,
|};

type State = {|
  accepted: boolean,
  infoShown: boolean,
|};

class CookiesConsent extends React.PureComponent<Props, State> {
  state = {
    accepted: false,
    infoShown: false,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      accepted: props.accepted,
      infoShown: state.infoShown,
    };
  }

  handleAccept = () => {
    const { onAccept } = this.props;
    this.setState({ accepted: true });

    onAccept();
  };

  handleShowInfo = () => {
    this.setState({ infoShown: true });
  };

  handleHideInfo = () => {
    this.setState({ infoShown: false });
  };

  render() {
    const { accepted, infoShown } = this.state;

    if (accepted) {
      return null;
    }

    return (
      <>
        <CookiesBanner onAccept={this.handleAccept} onShowInfo={this.handleShowInfo} />
        {infoShown && <CookiesModal onClose={this.handleHideInfo} />}
      </>
    );
  }
}

export default CookiesConsent;
