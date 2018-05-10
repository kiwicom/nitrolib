// @flow strict
import * as React from "react";
import styled from "styled-components";

import { padding } from "client/styles";
import { brandDefault } from "client/records/Brand";
import type { ThemeProps } from "client/records/Brand";
import { Consumer as BrandConsumer } from "client/services/brand/context";
import SocialLogin from "./SocialLogin";
import Switch from "./Switch";
import MyBooking from "../../scenes/MyBooking";

const Container = styled.div`
  width: 400px;
  padding: ${padding.page}px;
  background: ${({ theme }: ThemeProps) => theme.colors["neutral-100"]};
`;

Container.defaultProps = {
  theme: brandDefault.theme,
};

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
|};

const Login = (props: Props) => (
  <Container>
    <BrandConsumer>
      {brand =>
        (brand.auth.social_facebook.enabled || brand.auth.social_google.enabled) && <SocialLogin />
      }
    </BrandConsumer>
    <Switch
      open={props.open}
      onOpenMyBooking={props.onOpenMyBooking}
      onOpenRegister={props.onOpenRegister}
      onOpenSignIn={props.onOpenSignIn}
    />
    {props.open === "myBooking" && <MyBooking />}
  </Container>
);

export default Login;
