// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import PriorityBoarding from "@kiwicom/orbit-components/lib/icons/PriorityBoarding";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Text from "@kiwicom/orbit-components/lib/Text";

import Translate from "../../../../../Translate/index";
import { themeDefault } from "../../../../../../records/Theme";
import type { ThemeProps } from "../../../../../../records/Theme";
import type { Airline } from "../../../../../../records/Airline";

const IconWrapper = styled.div`
  border-top: 1px solid ${({ theme }: ThemeProps) => theme.orbit.borderColorInput};
  min-width: 24px;
  text-align: center;
  padding: 6px 0px;

  ${mq.largeMobile(css`
    padding: 4px 0px;
  `)};
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {
  airlines: Airline[],
  prioBoardingLinkHandler?: (arg: Airline[]) => void,
};

const PriorityBoardingInfo = ({ airlines, prioBoardingLinkHandler }: Props) => {
  const handleClick = e => {
    if (prioBoardingLinkHandler) {
      e.stopPropagation();
      prioBoardingLinkHandler(airlines);
    }
  };
  return (
    <Stack
      flex
      direction="row"
      spacing="condensed"
      align="center"
      dataTest="BaggagePicker-PriorityBoardingInfo"
    >
      <IconWrapper>
        <PriorityBoarding color="secondary" size="small" />
      </IconWrapper>
      <Text size="small" element="p">
        <Translate
          t="baggage_modal.priority_boarding"
          values={{ airlines: airlines.map(a => a.name).join(", ") }}
        />{" "}
        <TextLink external={false} onClick={handleClick} type="secondary">
          <Translate t="baggage_modal.learn_more" />
        </TextLink>
      </Text>
    </Stack>
  );
};

export default PriorityBoardingInfo;
