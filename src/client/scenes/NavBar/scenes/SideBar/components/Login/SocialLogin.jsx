// @flow strict
import * as React from "react";
import styled from "styled-components";

import Text from "client/components/Text";
import Flex from "client/primitives/Flex";
import { Consumer as BrandConsumer } from "client/services/brand/context";
import type { ThemeProps } from "client/records/Brand";
import { brandDefault } from "client/records/Brand";

const Container = styled.div``;

const Or = styled.div`
  position: relative;
  padding: 12px 0;
`;

const OrLine = styled.hr`
  width: 100%;
  border-top: 1px solid ${({ theme }: ThemeProps) => theme.colors["grey-200"]};
`;

OrLine.defaultProps = {
  theme: brandDefault.theme,
};

const OrText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // vertical and horizontal center
  padding: 10px;
  background: ${({ theme }: ThemeProps) => theme.colors.white};
  text-transform: uppercase;
  color: ${({ theme }: ThemeProps) => theme.colors["grey-700"]};
  font-size: 14px;
`;

OrText.defaultProps = {
  theme: brandDefault.theme,
};

const SocialLogin = () => (
  <BrandConsumer>
    {brand => (
      <Container>
        <Flex>
          {brand.auth.social_facebook.enabled && (
            <button type="button">
              <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
            </button>
          )}
          {brand.auth.social_google.enabled && (
            <button type="button">
              <Text t={__("account.log_in_with")} values={{ provider: "Google" }} />
            </button>
          )}
        </Flex>
        <Or>
          <OrLine />
          <OrText>
            <Text t={__("common.or")} />
          </OrText>
        </Or>
      </Container>
    )}
  </BrandConsumer>
);

export default SocialLogin;
