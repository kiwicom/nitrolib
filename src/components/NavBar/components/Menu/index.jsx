// @flow strict
import * as React from "react";
import styled from "styled-components";
import Passenger from "@kiwicom/orbit-components/lib/icons/Passenger";

import Desktop from "../../../Desktop";
import Translate from "../../../Translate";
import ValueBind from "../../../ValueBind";
import Flex from "../../../../primitives/Flex";
import { Consumer as ModalConsumer } from "../../../../services/modal/context";
import { Consumer as AuthConsumer } from "../../../../services/auth/context";
import Button from "../../primitives/Button";
import SideNav from "../SideNav";
import * as MODALS from "../../../../consts/modals";
import type { Modal } from "../../../../consts/modals";
import marginMixin from "../../styles/marginMixin";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

const Wrapper = styled.div`
  ${marginMixin};
`;

const UserName = styled.div`
  max-width: 65px;
  display: inline;
  overflow: hidden;
  direction: ltr;
  text-overflow: ellipsis;
`;

const UserWrapper = styled.div`
  display: flex;
  padding-left: 5px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLightActive};
`;

UserWrapper.defaultProps = {
  theme: themeDefault,
};

const TripsActionLabel = styled.div`
  margin-left: ${({ theme }: ThemeProps) => theme.orbit.spaceXXSmall};
`;

TripsActionLabel.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  chat: React.Node,
  subscription: React.Node,
  starred: React.Node,
  debug?: React.Node,
  portal: string,
  inverted: boolean,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onToggleTrips: () => void,
  onOpenStarred: (e: SyntheticEvent<any>) => void,
  onOpenFaq: ?() => void,
|};

const Menu = ({
  chat,
  subscription,
  starred,
  debug,
  portal,
  inverted,
  onSaveLanguage,
  onToggleTrips,
  onSetModal,
  onOpenStarred,
  onOpenFaq,
}: Props) => (
  <ModalConsumer>
    {({ onChange }) => (
      <>
        <Desktop display="flex">
          <Wrapper>
            <AuthConsumer>
              {({ auth }) =>
                auth === null ? (
                  <ValueBind value={MODALS.MY_BOOKING} onChange={onChange}>
                    {({ onClick }) => (
                      <Button onClick={onClick} color={!inverted && "secondary"}>
                        <Translate t="account.my_bookings_action" />
                      </Button>
                    )}
                  </ValueBind>
                ) : (
                  <Flex y="center">
                    <Passenger size="small" />
                    <Button onClick={onToggleTrips} color="secondary">
                      <TripsActionLabel>
                        <Translate t="account.my_bookings_action" />
                      </TripsActionLabel>
                      <UserWrapper>
                        <span>(</span>
                        <UserName>{`${
                          auth.type === "user" ? auth.user.firstname : auth.email
                        }...`}</UserName>
                        <span>)</span>
                      </UserWrapper>
                    </Button>
                  </Flex>
                )
              }
            </AuthConsumer>
          </Wrapper>
        </Desktop>
        <Wrapper>
          <SideNav
            chat={chat}
            subscription={subscription}
            starred={starred}
            debug={debug}
            inverted={inverted}
            portal={portal}
            onOpenModal={onChange}
            onSaveLanguage={onSaveLanguage}
            onOpenStarred={onOpenStarred}
            onOpenFaq={onOpenFaq}
            onSetModal={onSetModal}
            onToggleTrips={onToggleTrips}
          />
        </Wrapper>
      </>
    )}
  </ModalConsumer>
);

export default Menu;
