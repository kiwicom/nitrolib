// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";
import styled from "styled-components";

import Button from "../NavBar/primitives/Button";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import Translate from "../Translate";
import TripsContainer from "../TripsContainer";
import StarredHeader from "./StarredHeader";
import StarredList from "./StarredList";
import StarredFooter from "./StarredFooter";
import { BADGE_MAX, MAX_TRIPS } from "./consts";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import { Consumer as StarredConsumer } from "../../services/starred/context";

const StarredBadge = styled.div`
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteOrangeLight};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteOrangeNormal};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusCircle};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightBold};
  text-align: center;
  line-height: 7.5px;
  padding: 5px;
  margin-left: 5px;
`;

StarredBadge.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  positionMenuDesktop: number,
  positionMenuTablet: number,
|};

const Starred = ({ positionMenuDesktop, positionMenuTablet }: Props) => (
  <StarredConsumer>
    {starred => {
      const { starredList, onClearStarred, onRemoveStarred, shareUrl, goToJourneyNitro } = starred;
      const starredShow = starredList && starredList.slice(0, MAX_TRIPS);
      const starredCount = starredList && starredList.length;
      const starredFooter = starredCount >= 1 && <StarredFooter tripsCount={starredCount} />;

      return (
        <Toggle>
          {({ open, onToggle }) => (
            <>
              {open && (
                <ClickOutside onClickOutside={onToggle}>
                  <TripsContainer
                    header={
                      <StarredHeader onClearStorage={onClearStarred} tripsCount={starredCount} />
                    }
                    footer={starredFooter}
                    positionMenuTablet={positionMenuTablet}
                    positionMenuDesktop={positionMenuDesktop}
                  >
                    <StarredList
                      onRemove={onRemoveStarred}
                      shareUrl={shareUrl}
                      trips={starredShow}
                      goToJourneyNitro={goToJourneyNitro}
                      tripsCount={starredCount}
                    />
                  </TripsContainer>
                </ClickOutside>
              )}
              <Desktop>
                <Button onClick={onToggle} color="secondary">
                  <Translate t={__("starred.starred")} />
                </Button>
              </Desktop>
              <Mobile>
                <Button onClick={onToggle} color="secondary">
                  <StarIcon color="primary" />
                </Button>
              </Mobile>
              {starredCount > 0 && (
                <StarredBadge>
                  {starredCount > BADGE_MAX ? `${BADGE_MAX}+` : starredCount}
                </StarredBadge>
              )}
            </>
          )}
        </Toggle>
      );
    }}
  </StarredConsumer>
);

export default Starred;
