// @flow strict

import * as React from "react";
import Modal, { ModalSection } from "@kiwicom/orbit-components/lib/Modal";

import AccountNoAccount from "../AccountNoAccount";
import AccountSocialLogin from "../AccountSocialLogin";
import AccountCheckEmail from "../AccountCheckEmail";
import KiwiLoginScreen from "./components/KiwiLogin/index";
import IntroScreen from "./components/Intro/index";
import CreateAccountScreen from "./components/CreateAccount/index";
import SendMagicLink from "./mutations/SendMagicLink";
import type { LoginType, Screen } from "./consts/types";
import errors from "../../consts/errors";
import brandContext from "../../services/brand/context";
import type { AuthUser, SocialProvider } from "../../records/Auth";

type Props = {|
  initialScreen: "intro" | "signUp",
  type: LoginType,
  onClose: () => void,
  onSignIn: (user: AuthUser) => void,
  onSocialLogin: (provider: SocialProvider) => Promise<void>,
|};

type State = {|
  email: string,
  screen: Screen,
  isSendingEmail: boolean,
  error: string,
|};

class MagicLogin extends React.Component<Props, State> {
  static defaultProps = {
    type: "mmb",
  };

  static contextType = brandContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      screen: props.initialScreen,
      isSendingEmail: false,
      error: "",
    };
  }

  handleEmailChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handleToIntro = () => {
    this.setState({ screen: "intro" });
  };

  handleToSignUp = () => {
    this.setState({ screen: "signUp" });
  };

  handleGoogleLogin = () => {
    const { onSocialLogin } = this.props;

    onSocialLogin("google");
  };

  handleFacebookLogin = () => {
    const { onSocialLogin } = this.props;

    onSocialLogin("facebook");
  };

  handleMagicLink = () => {
    const { email } = this.state;
    const brand = this.context;

    this.setState({ isSendingEmail: true, error: "" });

    SendMagicLink(email, brand.id)
      .then(res => {
        this.setState({ isSendingEmail: false });

        if (!res.sendMagicLink?.success) {
          this.setState({ error: errors.general });
          return;
        }

        this.setState({ screen: "magicLink" });
      })
      .catch(() => {
        // TODO log error
        this.setState({ isSendingEmail: false, error: errors.general });
      });
  };

  handleSignUpConfirmation = () => {
    this.setState({ screen: "signUpConfirmation" });
  };

  handleChangeScreen = (screen: Screen) => {
    this.setState({ screen });
  };

  handleResetMagicLinkError = () => {
    this.setState({ error: "" });
  };

  render() {
    const { type, onClose, onSignIn } = this.props;
    const brand = this.context;
    const { screen, email, isSendingEmail, error } = this.state;

    return (
      <Modal size="small" onClose={onClose} dataTest="MagicLogin">
        <ModalSection>
          {screen === "intro" && (
            <IntroScreen
              email={email}
              brandId={brand.id}
              magicLinkError={error}
              type={type}
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
              onClose={onClose}
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
        </ModalSection>
      </Modal>
    );
  }
}

export default MagicLogin;
