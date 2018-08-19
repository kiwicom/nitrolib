// @flow strict
import React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";

import ClickOutside from "../ClickOutside";
import mq from "styles/mediaQuery";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./Links";
import type { Splitster } from "records/Splitster";

// TODO: should be fixed according to later Navbar changes
const MediaTablet = styled.div`
  display: none;

  ${mq.mobile(css`
    display: flex;
    width: 50%;
    margin-left: 20px;
  `)};
`;

const MediaDesktop = styled.div`
  position: absolute;
  display: flex;
  left: 100px;

  ${mq.mobile(css`
    display: none;
  `)};
`;

type Props = {|
  splitster?: Splitster,
|};

const HeaderLinks = ({ splitster }: Props) => (
  <>
    <MediaTablet>
      <Toggle>
        {({ open, active, onToggle }) => (
          <>
            {open && (
              <ClickOutside onClickOutside={onToggle}>
                <Popup>
                  <Links splitster={splitster} />
                </Popup>
              </ClickOutside>
            )}
            <IconWrapper hover onClick={onToggle} act={active}>
              <Airplane />
              <ChevronDown size="small" />
            </IconWrapper>
          </>
        )}
      </Toggle>
    </MediaTablet>
    <MediaDesktop>
      <Links splitster={splitster} />
    </MediaDesktop>
  </>
);

export default HeaderLinks;
