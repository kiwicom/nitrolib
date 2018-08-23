// @flow strict
import React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";

import mq from "../../styles/mediaQuery";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./Links";
import type { Provider } from "./services/link";

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
  provider: Provider,
|};

const HeaderLinks = ({ provider }: Props) => (
  <>
    <MediaTablet>
      <Toggle>
        {({ open, active, onToggle }) => (
          <>
            {open && (
              <ClickOutside onClickOutside={onToggle}>
                <Popup>
                  <Links provider={provider} />
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
      <Links provider={provider} />
    </MediaDesktop>
  </>
);

export default HeaderLinks;
