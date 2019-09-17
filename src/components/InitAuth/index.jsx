// @flow strict
import * as React from "react";
import type { Environment } from "@kiwicom/relay";

import { authDefault } from "../../records/Auth";
import type { Auth, SocialProvider } from "../../records/Auth";
import type { Brand } from "../../records/Brand";
import * as api from "../../services/auth/api";
import type { MyBookingInput, RegisterInput, OnMyBookingArg } from "../../services/auth/api";
import makeEnvironment from "../../services/utils/relay";
import * as session from "../../services/session/session";
import { ACCOUNT_ID, EMAIL } from "../../consts/session";
import handleAffiliateId from "../../services/utils/handleAffiliateId";
import { UA_SESSION_TOKEN } from "../../consts/cookies";
import { load, save } from "../../services/session/cookies";

type Arg = {|
  auth: Auth | null,
  loading: boolean,
  environment: Environment,
  onMyBooking: (input: MyBookingInput) => Promise<void>,
  onRegister: (input: RegisterInput) => Promise<void>,
  onSocialAuth: (provider: SocialProvider) => Promise<void>,
  onSignIn: (email: string, password: string) => Promise<void>,
  onSignOut: () => void,
|};

type Props = {|
  brand: Brand,
  redirectURL: string,
  onMyBooking: (arg: OnMyBookingArg) => void,
  onRegister: () => void,
  onSocialAuth: (authURL: string) => void,
  onSignIn: (auth: Auth) => void,
  onSignOut: () => void,
  children: (arg: Arg) => React.Node,
|};

type State = {|
  auth: Auth | null,
  loading: boolean,
|};

export default class InitAuth extends React.PureComponent<Props, State> {
  state = {
    auth: authDefault,
    loading: false,
  };

  componentDidMount() {
    const token = load(UA_SESSION_TOKEN);

    if (token) {
      this.setState({ loading: true });
      api
        .getTokenUser(token)
        .then(user => {
          session.save(ACCOUNT_ID, user.id);
          session.save(EMAIL, user.email);
          handleAffiliateId(user.affiliateId);

          this.setState({ auth: { type: "user", user, token }, loading: false });
        })
        .catch(() => {
          // Ignoring errors here
          this.setState({ loading: false });
        });
    }
  }

  handleMyBooking = (input: MyBookingInput): Promise<void> => {
    const { onMyBooking } = this.props;

    this.setState({ loading: true });
    return api
      .getMyBookingToken(input)
      .then(onMyBooking)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        return Promise.reject(err);
      });
  };

  handleRegister = (input: RegisterInput): Promise<void> => {
    const { brand, onRegister } = this.props;

    this.setState({ loading: true });
    return api
      .register(brand.id, input)
      .then(onRegister)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        return Promise.reject(err);
      });
  };

  handleSocialAuth = (provider: SocialProvider): Promise<void> => {
    const { redirectURL, onSocialAuth } = this.props;

    this.setState({ loading: true });
    return api
      .socialAuth(provider, redirectURL)
      .then(onSocialAuth)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        return Promise.reject(err);
      });
  };

  handleSignIn = (email: string, password: string): Promise<void> => {
    const { brand, onSignIn } = this.props;

    this.setState({ loading: true });
    return api
      .signIn({ email, password, brand: brand.id })
      .then(auth => {
        session.save(ACCOUNT_ID, auth.user.id);
        session.save(EMAIL, auth.user.email);
        handleAffiliateId(auth.user.affiliateId);
        save(UA_SESSION_TOKEN, auth.token);
        onSignIn(auth);
        this.setState({ auth, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        return Promise.reject(err);
      });
  };

  handleSignOut = () => {
    const { onSignOut } = this.props;

    session.remove(ACCOUNT_ID);
    session.remove(EMAIL);

    onSignOut();
    this.setState({ auth: null });
  };

  render() {
    const { auth, loading } = this.state;
    const { children } = this.props;

    return children({
      auth,
      loading,
      environment: makeEnvironment({ Authorization: auth?.token || "" }),
      onMyBooking: this.handleMyBooking,
      onRegister: this.handleRegister,
      onSocialAuth: this.handleSocialAuth,
      onSignIn: this.handleSignIn,
      onSignOut: this.handleSignOut,
    });
  }
}
