// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import Tab from "../../../Tab/index";
import Flex from "../../../../primitives/Flex";
import Translate from "../../../Translate/index";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import * as MODALS from "../../../../consts/modals";

type Props = {|
  value: string,
  onChange: (value: string) => void,
|};

const GtMiddleMobile = styled.div`
  display: none;
  ${mq.mediumMobile(css`
    display: block;
  `)};
`;

const LtMiddleMobile = styled.div`
  display: block;
  ${mq.mediumMobile(css`
    display: none;
  `)};
`;

const Switch = ({ value, onChange }: Props) => (
  <>
    <GtMiddleMobile>
      <Flex>
        <Tab id={MODALS.MY_BOOKING} active={value === MODALS.MY_BOOKING} onClick={onChange}>
          <Translate t="account.oneBookingLogin" />
        </Tab>
        <BrandConsumer>
          {brand =>
            brand.auth.credentials && (
              <>
                <Tab id={MODALS.REGISTER} active={value === MODALS.REGISTER} onClick={onChange}>
                  <Translate t="account.sign_up" />
                </Tab>
                <Tab id={MODALS.SIGN_IN} active={value === MODALS.SIGN_IN} onClick={onChange}>
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
        <Tab id={MODALS.MY_BOOKING} active={value === MODALS.MY_BOOKING} onClick={onChange}>
          <Translate t="account.oneBookingLogin" />
        </Tab>
        <BrandConsumer>
          {brand =>
            brand.auth.credentials && (
              <>
                <Tab id={MODALS.REGISTER} active={value === MODALS.REGISTER} onClick={onChange}>
                  <Translate t="account.sign_up" />
                </Tab>
                <Tab id={MODALS.SIGN_IN} active={value === MODALS.SIGN_IN} onClick={onChange}>
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
