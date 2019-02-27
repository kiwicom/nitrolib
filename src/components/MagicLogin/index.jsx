// @flow strict

import * as React from "react";
import Modal from "@kiwicom/orbit-components/lib/Modal";

import AccountNoAccount from "../AccountNoAccount";
import AccountSocialLogin from "../AccountSocialLogin";
import AccountCheckEmail from "../AccountCheckEmail";
import KiwiLoginScreen from "./components/KiwiLogin/index";
import IntroScreen from "./components/Intro/index";
import CreateAccountScreen from "./components/CreateAccount/index";
import SendMagicLink from "./mutations/SendMagicLink";
import type { Screen } from "./consts/types";
import errors from "../../consts/errors";
import { Consumer as BrandConsumer } from "../../services/brand/context";
import { Consumer as LogConsumer } from "../../services/log/context";
import { API_REQUEST_FAILED, API_ERROR } from "../../consts/events";
import * as loginEvents from "./consts/events";
import type { AuthUser, SocialProvider } from "../../records/Auth";
import type { Event, Props as EventProps } from "../../records/Event";
import type { Brand } from "../../records/Brand";

type ContainerProps = {|
  initialScreen: "intro" | "signUp",
  type: "mmb" | "help" | "refer",
  disableSocialLogin: boolean,
  onClose: () => void,
  onSignIn: (user: AuthUser) => void,
  onSocialLogin: (provider: SocialProvider) => Promise<void>,
|};

type Props = {|
  ...ContainerProps,
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
    log(loginEvents.CONTINUE_WITH_REGISTER);
    this.handleChangeScreen("signUp");
  };

  handleGoogleLogin = () => {
    const { onSocialLogin, log } = this.props;
    log(loginEvents.LOGIN_VIA_SOCIAL, { provider: "google" });

    this.setState({ successfulClose: true }, () => {
      onSocialLogin("google");
    });
  };

  handleFacebookLogin = () => {
    const { onSocialLogin, log } = this.props;
    log(loginEvents.LOGIN_VIA_SOCIAL, { provider: "facebook" });

    this.setState({ successfulClose: true }, () => {
      onSocialLogin("facebook");
    });
  };

  handleMagicLink = () => {
    const { email } = this.state;
    const { brand, log } = this.props;

    this.setState({ isSendingEmail: true, error: "" });

    SendMagicLink(email, brand.id)
      .then(res => {
        this.setState({ isSendingEmail: false });

        if (!res.sendMagicLink?.success) {
          log(API_REQUEST_FAILED, { operation: "sendMagicLink" });
          this.setState({ error: errors.general });
          return;
        }

        log(loginEvents.MAGIC_LINK_SENT);
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
    const { type, onSignIn, brand, disableSocialLogin } = this.props;
    const { screen, email, isSendingEmail, error } = this.state;

    return (
      // $FlowExpected: Broken modal section handling, fix here or in Orbit
      <Modal size="small" onClose={this.handleClose} dataTest="MagicLogin">
        {screen === "intro" && (
          <IntroScreen
            email={email}
            brandId={brand.id}
            magicLinkError={error}
            type={type}
            disableSocialLogin={disableSocialLogin}
            onEmailChange={this.handleEmailChange}
            onGoogleLogin={this.handleGoogleLogin}
            onFacebookLogin={this.handleFacebookLogin}
            onSendMagicLink={this.handleMagicLink}
            onChangeScreen={this.handleChangeScreen}
          />
        )}

        {screen === "noAccount" && (
          <AccountNoAccount
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
            brandName={brand.name}
            isSendingEmail={isSendingEmail}
            onChangeScreen={this.handleChangeScreen}
            onAskSignInLink={this.handleMagicLink}
            onClose={this.handleClose}
            onSignIn={onSignIn}
          />
        )}

        {screen === "googleLogin" && (
          <AccountSocialLogin
            email={email}
            pairedWith="google"
            onAskSignInLink={this.handleMagicLink}
            onSocialLogin={this.handleGoogleLogin}
          />
        )}

        {screen === "facebookLogin" && (
          <AccountSocialLogin
            email={email}
            pairedWith="facebook"
            onAskSignInLink={this.handleMagicLink}
            onSocialLogin={this.handleFacebookLogin}
          />
        )}

        {(screen === "signUpConfirmation" ||
          screen === "magicLink" ||
          screen === "resetPassword") && <AccountCheckEmail reason={screen} email={email} />}
      </Modal>
    );
  }
}

const MagicLogin = (props: ContainerProps) => (
  <BrandConsumer>
    {brand => (
      <LogConsumer>
        {({ log }) => <MagicLoginWithoutContext {...props} brand={brand} log={log} />}
      </LogConsumer>
    )}
  </BrandConsumer>
);

export default MagicLogin;
