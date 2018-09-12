// @flow strict
import * as React from "react";
import styled from "styled-components";

import { padding } from "../../../../../../styles";
import { themeDefault } from "../../../../../../records/Theme";
import type { ThemeProps } from "../../../../../../records/Theme";
import { Consumer as BrandConsumer } from "../../../../../../services/brand/context";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
import { Consumer as AuthConsumer } from "../../../../../../services/auth/context";
import SocialLogin from "./SocialLogin";
import Switch from "./Switch";
import MyBooking from "../MyBooking";
import Register from "../Register";
import SignIn from "../SignIn";

const Container = styled.div`
  width: 400px;
  padding: ${padding.page}px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
`;

Container.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
  onOpenForgotPassword: () => void,
|};

const Login = ({
  open,
  onOpenMyBooking,
  onOpenRegister,
  onOpenSignIn,
  onOpenForgotPassword,
}: Props) => (
  <Container>
    <BrandConsumer>
      {brand =>
        (brand.auth.social_facebook.enabled || brand.auth.social_google.enabled) && (
          <SocialLogin
            facebook={brand.auth.social_facebook.enabled}
            google={brand.auth.social_google.enabled}
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
    {open === "myBooking" && (
      <IntlConsumer>{intl => <MyBooking lang={intl.language.id} />}</IntlConsumer>
    )}
    {open === "register" && (
      <BrandConsumer>{brand => <Register brandId={brand.id} />}</BrandConsumer>
    )}
    {open === "signIn" && (
      <BrandConsumer>
        {brand => (
          <AuthConsumer>
            {auth => (
              <SignIn
                brandId={brand.id}
                onSetAuth={auth.setAuth}
                onOpenForgotPassword={onOpenForgotPassword}
              />
            )}
          </AuthConsumer>
        )}
      </BrandConsumer>
    )}
  </Container>
);

export default Login;
