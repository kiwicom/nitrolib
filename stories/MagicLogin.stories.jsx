// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";

import MagicLogin from "../src/components/MagicLogin";
import Text from "../src/components/Text";
import Intro from "../src/components/MagicLogin/components/screens/Intro";
import Password from "../src/components/MagicLogin/components/screens/Password";
import NoAccount from "../src/components/MagicLogin/components/screens/NoAccount";
import CheckEmail from "../src/components/MagicLogin/components/screens/CheckEmail";
import CreateAccount from "../src/components/MagicLogin/components/CreateAccount";
import SocialLogin from "../src/components/MagicLogin/components/screens/SocialLogin";
import GetSingleBooking from "../src/components/MagicLogin/components/screens/GetSingleBooking";
import TailoredHeader from "../src/components/MagicLogin/components/TailoredHeader";
import withData from "./decorators/withData";

const type = {
  mmb: "mmb",
  help: "help",
  refer: "refer",
};

const GROUP_ID = "Component";

storiesOf("MagicLogin", module)
  .addDecorator(withKnobs)
  .addDecorator(withData)
  .add("intro", () => (
    <MagicLogin
      initialScreen="intro"
      type={select("Type", type, "mmb", GROUP_ID)}
      onClose={action("Close")}
      onSignIn={action("Sign in")}
      onSocialLogin={action("Social login")}
      onGetSimpleToken={action("Get single token")}
    />
  ))
  .add("sign up", () => (
    <MagicLogin
      initialScreen="signUp"
      type={select("Type", type, "mmb", GROUP_ID)}
      onClose={action("Close")}
      onSignIn={action("Sign in")}
      onSocialLogin={action("Social login")}
      onGetSimpleToken={action("Get single token")}
    />
  ))
  .add("without socials", () => (
    <MagicLogin
      disableSocialLogin
      initialScreen="intro"
      type={select("Type", type, "mmb", GROUP_ID)}
      onClose={action("Close")}
      onSignIn={action("Sign in")}
      onSocialLogin={action("Social login")}
      onGetSimpleToken={action("Get single token")}
    />
  ))
  .add("Screen - Intro", () => (
    <Intro
      email=""
      error={<Text t="common.api_error" />}
      tailoredHeader={<TailoredHeader type="mmb" />}
      onEmailChange={() => {}}
      onEmailBlur={() => {}}
      onFacebookLogin={() => {}}
      onGoogleLogin={() => {}}
      onContinue={() => {}}
      onIncorrectEmail={action("onIncorrectLogin")}
    />
  ))
  .add("Screen - checkEmail", () => <CheckEmail email="joe.doe@example.com" reason="magicLink" />)
  .add("Screen - NoAccount", () => (
    <NoAccount
      onBack={() => {}}
      onRegister={() => {}}
      onFacebookLogin={() => {}}
      onGoogleLogin={() => {}}
    />
  ))
  .add("Screen - Password", () => (
    <Password
      tailoredHeader={<TailoredHeader type="mmb" />}
      onAskSignInLink={() => {}}
      onChangeEmail={() => {}}
      onPasswordChange={() => {}}
      onForgotPassword={() => {}}
      onSignIn={() => {}}
      password="asdfg"
      email="example@example.com"
      isSigningIn
      isSendingEmail
    />
  ))
  .add("Screen - SocialLogin", () => (
    <SocialLogin
      onAskSignInLink={() => {}}
      onSocialLogin={() => {}}
      email="email@example.com"
      pairedWith="facebook"
    />
  ))
  .add("Screen - CreateAccount", () => (
    <CreateAccount
      brandId="kiwicom"
      email="testemail@kiwi.com"
      onSignUpConfirmation={() => {}}
      onEmailChange={() => {}}
    />
  ))
  .add("Screen - GetSingleBooking", () => (
    <GetSingleBooking
      IATA=""
      IATAError=""
      bookingId=""
      bookingIdError=""
      email=""
      emailError=""
      departureDate={null}
      departureDateError=""
      onBack={action("onBack")}
      onBookingIdChange={action("onBookingIdChange")}
      onDepartureDateChange={action("onDepartureDateChange")}
      onEmailChange={action("onEmailChange")}
      onIATAChange={action("onIATAChange")}
      onSubmit={action("onSubmit")}
    />
  ));
