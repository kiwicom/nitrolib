// @flow

import * as React from "react";
import Modal from "@kiwicom/orbit-components/lib/Modal";

import AccountNoAccount from "../AccountNoAccount";
import AccountSocialLogin from "../AccountSocialLogin";
import AccountCheckEmail from "../AccountCheckEmail";
import KiwiLoginScreen from "./screens/KiwiLogin";
import IntroScreen from "./screens/Intro";
import CreateAccountScreen from "./screens/CreateAccount";
import SendMagicLink from "./mutations/SendMagicLink";
import type { LoginType, Screen } from "./types";
import { errors } from "./const";
import type { SignInUser } from "./mutations/__generated__/SignInUser.graphql";
import { Consumer as BrandConsumer } from "../../services/brand/context";

type ContainerProps = {|
  onSocialLogin: (provider: "google" | "facebook") => Promise<any>,
  initialScreen: "intro" | "signUp",
  type: LoginType,
  onClose: () => void,
  onSignIn: (graphQLUser: SignInUser) => void,
|};

type Props = {|
  ...ContainerProps,
  brandingId: string,
  brandName: string,
|};

type State = {|
  email: string,
  screen: Screen,
  isSendingEmail: boolean,
  magicLinkError: string,
|};

// make flow happy
const getReason = (screen: Screen) => {
  if (screen === "signUpConfirmation") {
    return "signUpConfirmation";
  }

  if (screen === "resetPassword") {
    return "resetPassword";
  }

  return "magicLink";
};

class MagicLoginModal extends React.Component<Props, State> {
  static defaultProps = {
    type: "mmb",
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      screen: props.initialScreen,
      isSendingEmail: false,
      magicLinkError: "",
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
    this.sendMagicLink();
  };

  handleSignUpConfirmation = () => {
    this.setState({ screen: "signUpConfirmation" });
  };

  handleChangeScreen = (screen: Screen) => {
    this.setState({ screen });
  };

  resetMagicLinkError = () => {
    this.setState({ magicLinkError: "" });
  };

  sendMagicLink = () => {
    const { brandingId } = this.props;
    this.setState({ isSendingEmail: true, magicLinkError: "" }, async () => {
      let response = null;
      const { email } = this.state;

      try {
        response = await SendMagicLink(email, brandingId);
      } catch (error) {
        // TODO log error
        this.setState({ isSendingEmail: false, magicLinkError: errors.general });
        return;
      }

      this.setState({ isSendingEmail: false });

      const success = response && response.sendMagicLink && response.sendMagicLink.success;

      if (success) {
        this.setState({ screen: "magicLink" });
        return;
      }

      this.setState({ magicLinkError: errors.general });
    });
  };

  render() {
    const { brandingId, brandName, type, onClose, onSignIn } = this.props;
    const { screen, email, isSendingEmail, magicLinkError } = this.state;

    return (
      // $FlowExpected: Fails because Modal doesn't allow <Consumer /> as child
      <Modal size="small" onClose={onClose} dataTest="magicLoginModal">
        {screen === "intro" ? (
          <IntroScreen
            email={email}
            brandingId={brandingId}
            magicLinkError={magicLinkError}
            type={type}
            onEmailChange={this.handleEmailChange}
            onGoogleLogin={this.handleGoogleLogin}
            onFacebookLogin={this.handleFacebookLogin}
            onSendMagicLink={this.handleMagicLink}
            onChangeScreen={this.handleChangeScreen}
          />
        ) : null}
        {screen === "noAccount" ? (
          <AccountNoAccount
            onBack={this.handleToIntro}
            onRegister={this.handleToSignUp}
            onGoogleLogin={this.handleGoogleLogin}
            onFacebookLogin={this.handleFacebookLogin}
          />
        ) : null}
        {screen === "signUp" ? (
          <CreateAccountScreen
            email={email}
            brandingId={brandingId}
            onEmailChange={this.handleEmailChange}
            onSignUpConfirmation={this.handleSignUpConfirmation}
          />
        ) : null}
        {screen === "kiwiLogin" ? (
          <KiwiLoginScreen
            email={email}
            resetMagicLinkError={this.resetMagicLinkError}
            magicLinkError={magicLinkError}
            brandingId={brandingId}
            brandName={brandName}
            isSendingEmail={isSendingEmail}
            onChangeScreen={this.handleChangeScreen}
            onAskSignInLink={this.handleMagicLink}
            onClose={onClose}
            onSignIn={onSignIn}
          />
        ) : null}
        {["googleLogin", "facebookLogin"].includes(screen) ? (
          <AccountSocialLogin
            email={email}
            pairedWith={screen === "googleLogin" ? "google" : "facebook"}
            onAskSignInLink={this.handleMagicLink}
            onSocialLogin={
              screen === "googleLogin" ? this.handleGoogleLogin : this.handleFacebookLogin
            }
          />
        ) : null}
        {["signUpConfirmation", "magicLink", "resetPassword"].includes(screen) ? (
          <AccountCheckEmail reason={getReason(screen)} email={email} />
        ) : null}
      </Modal>
    );
  }
}

const MagicLogin = (props: ContainerProps) => (
  <BrandConsumer>
    {brand => <MagicLoginModal {...props} brandingId={brand.id} brandName={brand.name} />}
  </BrandConsumer>
);

export default MagicLogin;
