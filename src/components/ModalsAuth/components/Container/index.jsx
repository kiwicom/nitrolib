// @flow strict
import * as React from "react";

import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import { Consumer as AuthConsumer } from "../../../../services/auth/context";
import SocialLogin from "../SocialLogin";
import Switch from "../Switch";

type Props = {|
  value: string,
  onChange: (value?: string) => void,
  children: React.Node,
|};

const Login = ({ value, onChange, children }: Props) => (
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
        <Switch value={value} onChange={onChange} />
        {children}
      </>
    )}
  </AuthConsumer>
);

export default Login;
