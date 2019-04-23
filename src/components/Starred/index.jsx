// @flow strict
import * as React from "react";
import StarFull from "@kiwicom/orbit-components/lib/icons/StarFull";
import styled from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import Button from "../NavBar/primitives/Button";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import Translate from "../Translate";
import TripsContainer from "../TripsContainer";
import StarredHeader from "./components/StarredHeader";
import StarredList from "./components/StarredList";
import StarredFooter from "./components/StarredFooter";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import { Consumer as StarredConsumer } from "../../services/starred/context";

const MAX_TRIPS = 3;
const BADGE_MAX = 9;

const StarredBadge = styled.div`
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteOrangeLight};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteOrangeNormal};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusCircle};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightBold};
  text-align: center;
  line-height: 7.5px;
  padding: 5px;
  margin-${/* sc-custom "left" */ left}: 5px;
`;

StarredBadge.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  positionMenuDesktop: number,
  positionMenuTablet: number,
  inverted: boolean,
|};

const Starred = ({ positionMenuDesktop, positionMenuTablet, inverted }: Props) => (
  <StarredConsumer>
    {starred => {
      const { starredList, onClear, onRemove, shareUrl, onGoToStarred } = starred;
      const starredCount = starredList.length || 0;
      const buttonColor = inverted ? null : "secondary";

      return (
        <Toggle>
          {({ open, onToggle }) => (
            <>
              {open && (
                <ClickOutside onClickOutside={onToggle}>
                  <TripsContainer
                    header={<StarredHeader onClear={onClear} tripsCount={starredCount} />}
                    footer={starredCount >= 1 && <StarredFooter tripsCount={starredCount} />}
                    positionMenuTablet={positionMenuTablet}
                    positionMenuDesktop={positionMenuDesktop}
                  >
                    <StarredList
                      onRemove={(id, e) => onRemove(id, e)}
                      shareUrl={shareUrl}
                      trips={starredList && starredList.slice(0, MAX_TRIPS)}
                      onGoToStarred={onGoToStarred}
                      tripsCount={starredCount}
                    />
                  </TripsContainer>
                </ClickOutside>
              )}

              <Stack inline spacing="tight" align="center">
                <Desktop>
                  <Button onClick={onToggle} color={buttonColor}>
                    <Translate t="starred.starred" />
                  </Button>
                </Desktop>
                <Mobile>
                  <Button onClick={onToggle} color={buttonColor}>
                    {inverted ? <StarFull customColor="#fff" /> : <StarFull color="primary" />}
                  </Button>
                </Mobile>
                {starredCount > 0 && (
                  <StarredBadge>
                    {starredCount > BADGE_MAX ? `${BADGE_MAX}+` : starredCount}
                  </StarredBadge>
                )}
              </Stack>
            </>
          )}
        </Toggle>
      );
    }}
  </StarredConsumer>
);

export default Starred;
