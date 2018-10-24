// @flow strict
import * as React from "react";
import styled from "styled-components";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import { padding } from "../../../../../../styles";
import { themeDefault } from "../../../../../../records/Theme";
import type { ThemeProps } from "../../../../../../records/Theme";
import { Consumer as BrandConsumer } from "../../../../../../services/brand/context";
import { Consumer as AuthConsumer } from "../../../../../../services/auth/context";
import SocialLogin from "./SocialLogin";
import Switch from "./Switch";
import MyBooking from "../MyBooking";
import Register from "../Register";
import SignIn from "../SignIn";

const Container = styled.div`
  padding: ${padding.page}px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const FieldWrap = styled.div`
  margin: 15px 0;
`;

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onCloseSuccess: () => void,
  onOpenSignIn: () => void,
  onOpenForgotPassword: () => void,
|};

class Login extends React.Component<Props> {
  componentDidMount() {
    this.handleCSS();
  }

  componentWillUnmount() {
    this.handleCSS();
  }

  handleCSS = () => {
    const mainview = document.querySelector(".MainView");
    return (
      mainview &&
      (mainview.classList.toggle("MainView_nitro-modal"), mainview.classList.toggle("_fixed"))
    );
  };

  render() {
    const {
      open,
      onOpenMyBooking,
      onCloseSuccess,
      onOpenRegister,
      onOpenSignIn,
      onOpenForgotPassword,
    } = this.props;
    return (
      <Container>
        <AuthConsumer>
          {auth => (
            <>
              <BrandConsumer>
                {brand =>
                  (brand.auth.social_facebook.enabled || brand.auth.social_google.enabled) && (
                    <SocialLogin
                      facebook={brand.auth.social_facebook.enabled}
                      google={brand.auth.social_google.enabled}
                      onSocialAuth={auth.onSocialAuth}
                    />
                  )
                }
              </BrandConsumer>
              <Switch
                open={open}
                onOpenMyBooking={onOpenMyBooking}
                onOpenRegister={onOpenRegister}
                onOpenSignIn={onOpenSignIn}
              />
              {auth.error && (
                <FieldWrap>
                  <Alert type="critical">{auth.error}</Alert>
                </FieldWrap>
              )}
              {open === "myBooking" && (
                <MyBooking
                  loading={auth.loading}
                  onMyBooking={auth.onMyBooking}
                  onCloseSuccess={onCloseSuccess}
                />
              )}
              {open === "register" && (
                <Register
                  loading={auth.loading}
                  onRegister={auth.onRegister}
                  onCloseSuccess={onCloseSuccess}
                />
              )}
              {open === "signIn" && (
                <SignIn
                  loading={auth.loading}
                  onSignIn={auth.onSignIn}
                  onCloseSuccess={onCloseSuccess}
                  onOpenForgotPassword={onOpenForgotPassword}
                />
              )}
            </>
          )}
        </AuthConsumer>
      </Container>
    );
  }
}

export default Login;
