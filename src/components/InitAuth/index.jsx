// @flow strict
import * as React from "react";
import type { Environment } from "react-relay";

import { authDefault } from "../../records/Auth";
import type { Auth, SocialProvider } from "../../records/Auth";
import type { Brand } from "../../records/Brand";
import * as api from "../../services/auth/api";
import type { MyBookingInput, RegisterInput } from "../../services/auth/api";
import { makeCall, makeEnvironment } from "../../services/utils/relay";

type Arg = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
  environment: Environment,
  onMyBooking: (input: MyBookingInput) => Promise<boolean>,
  onRegister: (input: RegisterInput) => Promise<boolean>,
  onSocialAuth: (provider: SocialProvider) => Promise<boolean>,
  onSignIn: (email: string, password: string) => Promise<boolean>,
  onSignOut: () => void,
|};

type Props = {|
  token: string | null,
  brand: Brand,
  redirectURL: string,
  onMyBooking: (token: string) => void,
  onRegister: () => void,
  onSocialAuth: (authURL: string) => void,
  onSignIn: (token: string) => void,
  onSignOut: () => void,
  children: (arg: Arg) => React.Node,
|};

type State = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
|};

export default class InitAuth extends React.PureComponent<Props, State> {
  state = {
    auth: authDefault,
    loading: false,
    error: "",
  };

  componentDidMount() {
    const { token } = this.props;
    if (token === null) {
      return;
    }

    this.setState({ loading: true });
    api
      .getTokenUser(token)
      .then(user => {
        this.setState({ auth: { user, token }, loading: false });
      })
      .catch(() => {
        // Ignoring errors here
        this.setState({ loading: false });
      });
  }

  handleMyBooking = (input: MyBookingInput): Promise<boolean> => {
    const { onMyBooking } = this.props;

    this.setState({ loading: true });
    return api
      .getMyBookingToken(input)
      .then(onMyBooking)
      .then(() => {
        this.setState({ error: "", loading: false });
        return true;
      })
      .catch(err => {
        this.setState({ error: String(err), loading: false });
        return false;
      });
  };

  handleRegister = (input: RegisterInput): Promise<boolean> => {
    const { brand, onRegister } = this.props;

    this.setState({ loading: true });
    return api
      .register(brand.id, input)
      .then(onRegister)
      .then(() => {
        this.setState({ error: "", loading: false });
        return true;
      })
      .catch(err => {
        this.setState({ error: String(err), loading: false });
        return false;
      });
  };

  handleSocialAuth = (provider: SocialProvider): Promise<boolean> => {
    const { redirectURL, onSocialAuth } = this.props;

    this.setState({ loading: true });
    return api
      .socialAuth(provider, redirectURL)
      .then(onSocialAuth)
      .then(() => {
        this.setState({ error: "", loading: false });
        return true;
      })
      .catch(err => {
        this.setState({ error: String(err), loading: false });
        return false;
      });
  };

  handleSignIn = (email: string, password: string): Promise<boolean> => {
    const { brand, onSignIn } = this.props;

    this.setState({ loading: true });
    return api
      .signIn({ email, password, brand: brand.id })
      .then(auth => {
        onSignIn(auth.token);
        this.setState({ auth, error: "", loading: false });
        return true;
      })
      .catch(err => {
        this.setState({ auth: null, error: String(err), loading: false });
        return false;
      });
  };

  handleSignOut = () => {
    const { onSignOut } = this.props;

    onSignOut();
    this.setState({ auth: null });
  };

  render() {
    const { auth, loading, error } = this.state;
    const { children } = this.props;

    return children({
      auth,
      loading,
      error,
      environment: makeEnvironment(makeCall(auth !== null ? auth.token : "")),
      onMyBooking: this.handleMyBooking,
      onRegister: this.handleRegister,
      onSocialAuth: this.handleSocialAuth,
      onSignIn: this.handleSignIn,
      onSignOut: this.handleSignOut,
    });
  }
}
