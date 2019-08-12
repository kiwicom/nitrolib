// @flow strict

import * as React from "react";
import Modal from "@kiwicom/orbit-components/lib/Modal";

import NoAccount from "./components/screens/NoAccount";
import SocialLogin from "./components/screens/SocialLogin";
import AccountCheckEmail from "./components/screens/CheckEmail";
import KiwiLoginScreen from "./components/KiwiLogin";
import IntroScreen from "./components/Intro";
import CreateAccountScreen from "./components/CreateAccount";
import sendMagicLink from "./mutations/sendMagicLink";
import type { Screen } from "./records/Screen";
import errors from "../../consts/errors";
import BrandContext from "../../services/brand/context";
import LogContext from "../../services/log/context";
import IntlContext from "../../services/intl/context";
import { API_REQUEST_FAILED, API_ERROR } from "../../consts/events";
import * as loginEvents from "./consts/events";
import makeEnvironment from "../../services/utils/relay";
import type { AuthUser, SocialProvider, AuthToken } from "../../records/Auth";
import type { Event, Props as EventProps } from "../../records/Event";
import type { Brand } from "../../records/Brand";
import type { LangInfo } from "../../records/LangInfo";
import GetSingleBooking from "./components/GetSingleBooking/index";
import TailoredHeader, { type LoginType } from "./components/TailoredHeader";

type ContainerProps = {|
  initialScreen: "intro" | "signUp",
  type: LoginType,
  disableSocialLogin: boolean,
  onClose: () => void,
  onSignIn: (user: AuthUser) => void,
  onSocialLogin: (provider: SocialProvider) => Promise<void>,
  onGetSimpleToken?: AuthToken => void,
|};

type Props = {|
  ...ContainerProps,
  langInfo: LangInfo,
  log: (event: Event, props: EventProps) => void,
  brand: Brand,
|};

type State = {|
  email: string,
  screen: Screen,
  isSendingEmail: boolean,
  error: string,
  successfulClose: boolean,
|};

class MagicLoginWithoutContext extends React.Component<Props, State> {
  static defaultProps = {
    type: "mmb",
    disableSocialLogin: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      screen: props.initialScreen,
      isSendingEmail: false,
      error: "",
      successfulClose: false,
    };
  }

  componentDidMount() {
    const { log } = this.props;
    const { screen } = this.state;

    log(loginEvents.MAGIC_LOGIN_MODAL_SHOWN, { screen });
  }

  componentWillUnmount() {
    const { log } = this.props;
    const { successfulClose, screen } = this.state;
    const successfulScreens = ["signUpConfirmation", "magicLink", "resetPassword"];

    if (successfulClose || screen === "magicLink") {
      log(loginEvents.LOGIN_PATH_FULFILLED, { withMagicLink: screen === "magicLink" });
    }

    if (!(successfulClose || successfulScreens.includes(screen))) {
      log(loginEvents.LOGIN_ABANDONED, { screen });
    }
  }

  handleClose = (successfulClose: boolean = false) => {
    const { onClose } = this.props;

    this.setState({ successfulClose }, () => {
      onClose();
    });
  };

  handleEmailChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handleToIntro = () => {
    this.handleChangeScreen("intro");
  };

  handleToSignUp = () => {
    const { log } = this.props;
    log(loginEvents.CONTINUE_WITH_REGISTER, {});
    this.handleChangeScreen("signUp");
  };

  handleGoogleLogin = () => {
    const { onSocialLogin, log } = this.props;
    const { screen } = this.state;
    log(loginEvents.LOGIN_VIA_SOCIAL, { provider: "google", screen });

    this.setState({ successfulClose: true }, () => {
      onSocialLogin("google");
    });
  };

  handleFacebookLogin = () => {
    const { onSocialLogin, log } = this.props;
    const { screen } = this.state;
    log(loginEvents.LOGIN_VIA_SOCIAL, { provider: "facebook", screen });

    this.setState({ successfulClose: true }, () => {
      onSocialLogin("facebook");
    });
  };

  handleMagicLink = () => {
    const { email } = this.state;
    const { brand, log, langInfo } = this.props;
    const environment = makeEnvironment({ "Accept-Language": langInfo.iso });

    this.setState({ isSendingEmail: true, error: "" });

    sendMagicLink(environment, email, brand.id)
      .then(res => {
        this.setState({ isSendingEmail: false });

        if (!res.sendMagicLink?.success) {
          log(API_REQUEST_FAILED, { operation: "sendMagicLink" });
          this.setState({ error: errors.general });
          return;
        }

        log(loginEvents.MAGIC_LINK_SENT, {});
        this.handleChangeScreen("magicLink");
      })
      .catch(err => {
        log(API_ERROR, { error: String(err), operation: "sendMagicLink" });
        this.setState({ isSendingEmail: false, error: errors.general });
      });
  };

  handleSignUpConfirmation = () => {
    this.handleChangeScreen("signUpConfirmation");
  };

  handleChangeScreen = (screen: Screen) => {
    const { log } = this.props;
    log(loginEvents.SCREEN_CHANGED, { screen });
    this.setState({ screen });
  };

  handleResetMagicLinkError = () => {
    this.setState({ error: "" });
  };

  render() {
    const { type, onSignIn, brand, disableSocialLogin, onGetSimpleToken } = this.props;
    const { screen, email, isSendingEmail, error } = this.state;

    return (
      // $FlowExpected: Broken modal section handling, fix here or in Orbit
      <Modal size="small" onClose={this.handleClose} dataTest="MagicLogin">
        {screen === "intro" && (
          <IntroScreen
            email={email}
            brandId={brand.id}
            magicLinkError={error}
            disableSocialLogin={disableSocialLogin}
            tailoredHeader={<TailoredHeader type={type} />}
            onEmailChange={this.handleEmailChange}
            onGoogleLogin={this.handleGoogleLogin}
            onFacebookLogin={this.handleFacebookLogin}
            onSendMagicLink={this.handleMagicLink}
            onChangeScreen={this.handleChangeScreen}
          />
        )}

        {screen === "noAccount" && (
          <NoAccount
            onBack={this.handleToIntro}
            onRegister={this.handleToSignUp}
            onGoogleLogin={this.handleGoogleLogin}
            onFacebookLogin={this.handleFacebookLogin}
          />
        )}

        {screen === "signUp" && (
          <CreateAccountScreen
            email={email}
            brandId={brand.id}
            onEmailChange={this.handleEmailChange}
            onSignUpConfirmation={this.handleSignUpConfirmation}
          />
        )}

        {screen === "kiwiLogin" && (
          <KiwiLoginScreen
            email={email}
            onResetMagicLinkError={this.handleResetMagicLinkError}
            magicLinkError={error}
            brandId={brand.id}
            isSendingEmail={isSendingEmail}
            tailoredHeader={<TailoredHeader type={type} />}
            onChangeScreen={this.handleChangeScreen}
            onAskSignInLink={this.handleMagicLink}
            onClose={this.handleClose}
            onSignIn={onSignIn}
          />
        )}

        {screen === "googleLogin" && (
          <SocialLogin
            email={email}
            pairedWith="google"
            onAskSignInLink={this.handleMagicLink}
            onSocialLogin={this.handleGoogleLogin}
          />
        )}

        {screen === "facebookLogin" && (
          <SocialLogin
            email={email}
            pairedWith="facebook"
            onAskSignInLink={this.handleMagicLink}
            onSocialLogin={this.handleFacebookLogin}
          />
        )}

        {(screen === "signUpConfirmation" ||
          screen === "magicLink" ||
          screen === "resetPassword") && <AccountCheckEmail reason={screen} email={email} />}

        {screen === "getSingleBooking" && (
          <GetSingleBooking
            onBack={this.handleToIntro}
            onClose={this.handleClose}
            onGetSimpleToken={onGetSimpleToken}
          />
        )}
      </Modal>
    );
  }
}

const MagicLogin = (props: ContainerProps) => {
  const { log } = React.useContext(LogContext);
  const brand = React.useContext(BrandContext);
  const { language } = React.useContext(IntlContext);

  return <MagicLoginWithoutContext {...props} brand={brand} log={log} langInfo={language} />;
};

export default MagicLogin;
