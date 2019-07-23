// @flow strict
import * as React from "react";
import styled from "styled-components";
import PriorityBoarding from "@kiwicom/orbit-components/lib/icons/PriorityBoarding";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import Translate from "../../../../../Translate";
import { themeDefault } from "../../../../../../records/Theme";
import type { ThemeProps } from "../../../../../../records/Theme";
import type { Airline } from "../../../../../../records/Airline";

const FixWrapper = styled.div`
  &:last-child {
    margin-top: 6px !important;
  }
`;

const IconWrapper = styled.div`
  border-top: 1px solid ${({ theme }: ThemeProps) => theme.orbit.borderColorInput};
  min-width: 24px;
  text-align: center;
  padding-top: 6px;

  svg {
    vertical-align: start;
  }
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

const TextWrapper = styled.div`
  padding-top: 10px;
`;

type Props = {
  airlines: Airline[],
  prioBoardingLinkHandler?: (arg: Airline[]) => void,
};

const PriorityBoardingInfo = ({ airlines, prioBoardingLinkHandler }: Props) => (
  <FixWrapper>
    <Stack flex direction="row" spacing="condensed" dataTest="BaggagePicker-PriorityBoardingInfo">
      <IconWrapper>
        <PriorityBoarding reverseOnRtl color="secondary" size="small" />
      </IconWrapper>
      <TextWrapper>
        <Text size="small" element="p">
          <Translate
            t="baggage_modal.priority_boarding"
            values={{ airlines: airlines.map(a => a.name).join(", ") }}
          />{" "}
          <TextLink
            external={false}
            onClick={e => {
              if (prioBoardingLinkHandler) {
                e.stopPropagation();
                prioBoardingLinkHandler(airlines);
              }
            }}
            type="secondary"
          >
            <Translate t="baggage_modal.learn_more" />
          </TextLink>
        </Text>
      </TextWrapper>
    </Stack>
  </FixWrapper>
);

export default PriorityBoardingInfo;
