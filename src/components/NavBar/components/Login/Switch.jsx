// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import Tab from "../../../Tab";
import Flex from "../../../../primitives/Flex";
import Translate from "../../../Translate";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import mq from "../../../../styles/mq";

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
|};

const GtMiddleMobile = styled.div`
  display: none;
  ${mq.gtMiddleMobile(css`
    display: block;
  `)};
`;

const LtMiddleMobile = styled.div`
  display: none;
  ${mq.ltMiddleMobile(css`
    display: block;
  `)};
`;

const Switch = ({ open, onOpenMyBooking, onOpenRegister, onOpenSignIn }: Props) => (
  <>
    <GtMiddleMobile>
      <Flex>
        <Tab id="myBooking" active={open === "myBooking"} onClick={onOpenMyBooking}>
          <Translate t="account.oneBookingLogin" />
        </Tab>
        <BrandConsumer>
          {brand =>
            brand.auth.credentials && (
              <>
                <Tab id="register" active={open === "register"} onClick={onOpenRegister}>
                  <Translate t="account.sign_up" />
                </Tab>
                <Tab id="signIn" active={open === "signIn"} onClick={onOpenSignIn}>
                  <Translate t="account.sign_in" />
                </Tab>
              </>
            )
          }
        </BrandConsumer>
      </Flex>
    </GtMiddleMobile>
    <LtMiddleMobile>
      <Flex direction="column" x="stretch">
        <Tab id="myBooking" active={open === "myBooking"} onClick={onOpenMyBooking}>
          <Translate t="account.oneBookingLogin" />
        </Tab>
        <BrandConsumer>
          {brand =>
            brand.auth.credentials && (
              <>
                <Tab id="register" active={open === "register"} onClick={onOpenRegister}>
                  <Translate t="account.sign_up" />
                </Tab>
                <Tab id="signIn" active={open === "signIn"} onClick={onOpenSignIn}>
                  <Translate t="account.sign_in" />
                </Tab>
              </>
            )
          }
        </BrandConsumer>
      </Flex>
    </LtMiddleMobile>
  </>
);

export default Switch;
