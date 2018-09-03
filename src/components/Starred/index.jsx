// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";

import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Button from "../NavBar/primitives/Button";
import mq from "../../styles/mediaQuery";
import Desktop from "../../primitives/Desktop";
import Mobile from "../../primitives/Mobile";

const Popup = styled.div`
  position: absolute;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  top: 50px;
  right: 0;
  min-height: 400px;
  width: auto;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};
  ${mq.mobile(css`
    right: 0;
    left: 0;
    margin: 0 auto;
    min-width: 230px;
    width: 95%;
  `)};
  ${mq.gtTablet(css`
    min-width: 550px;
  `)};
`;

Popup.defaultProps = {
  theme: themeDefault,
};

const StarredHeader = styled.div`
  display: flex;
  height: 40px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 40px;
  padding: 0 20px;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};
`;

StarredHeader.defaultProps = {
  theme: themeDefault,
};

const StarredContent = styled.div`
  padding: 12px;
  line-height: 18px;
`;

const TripsCounter = styled.span`
  line-height: 40px;
  font-weight: 700;
`;

const Starred = () => (
  <Toggle>
    {({ open, onToggle, active }) => (
      <>
        {open && (
          <ClickOutside onClickOutside={onToggle}>
            <Popup>
              <StarredHeader>
                <TripsCounter>Starred trips(0)</TripsCounter>
              </StarredHeader>
              <StarredContent>
                No Starred trips. Click the star icon on any search result to add it to your Starred
                trips.
              </StarredContent>
            </Popup>
          </ClickOutside>
        )}
        <Desktop>
          <Button onClick={onToggle}>Starred</Button>
        </Desktop>
        <Mobile>
          <Button onClick={onToggle}>
            <StarIcon color={active ? "secondary" : "primary"} />
          </Button>
        </Mobile>
      </>
    )}
  </Toggle>
);

export default Starred;
