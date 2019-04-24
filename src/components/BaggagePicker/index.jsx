// @flow strict
import React, { useState, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Button from "@kiwicom/orbit-components/lib/Button";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";

import Translate from "../Translate/index";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import Option from "./components/Option/index";
import type { BaggageCategory, PassengerGroup, BaggageType } from "../../records/Baggage";
import type { Airline } from "../../records/Airline";
import getPersonalItemPresence from "./services/getPersonalItemPresence";
import getTooltip from "./services/getTooltip";
import getOptions from "./services/getOptions";

type Props = {|
  changeBagCombination: (picker: BaggageCategory, item: number) => void,
  passengerCategory: PassengerGroup,
  passengerBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  shouldShowRecheckNote: boolean,
  airlines: { [string]: Airline },
  pickerType: BaggageCategory,
  context: "booking" | "mmb",
  currentCombination?: number,
  prioBoardingLinkHandler: (arg: Airline[]) => void,
|};

const IconWrapper = styled.div`
  height: 20px;
`;

const EmptyOptionWrapper = styled.div`
  padding: ${({ theme }) => theme.orbit.spaceSmall};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  border: 1px solid ${({ theme }: ThemeProps) => theme.orbit.borderColorCard};
`;

EmptyOptionWrapper.defaultProps = {
  theme: themeDefault,
};

const BaggagePicker = ({
  changeBagCombination,
  pickerType,
  passengerBaggage,
  passengerCategory,
  shouldShowRecheckNote,
  prioBoardingLinkHandler,
  context,
  airlines,
  currentCombination,
  baggage,
}: Props) => {
  const [options, setOptions] = useState(
    getOptions({
      baggage,
      passengerCategory,
      context,
      pickerType,
      currentCombination,
    }),
  );
  const [showedOptions, setShowedOptions] = useState(
    options.length > 4 ? options.slice(0, 3) : options,
  );
  const [numberOfHiddenOptions, setNumberOfHiddenOptions] = useState(
    options.length - showedOptions.length,
  );

  const hasOnlyEmptyOption = options.length === 1 && R.isEmpty(options[0].items);

  useEffect(() => {
    setOptions(
      getOptions({
        baggage,
        passengerCategory,
        context,
        pickerType,
        currentCombination,
      }),
    );
  }, [baggage, context, currentCombination, passengerCategory, pickerType]);

  useEffect(() => {
    if (options.length > 4) {
      const optionsToShow = options.slice(0, 3);
      const hiddenOptionsLength = options.length - optionsToShow.length;
      setShowedOptions(optionsToShow);
      setNumberOfHiddenOptions(hiddenOptionsLength);
    } else {
      setShowedOptions(options);
      setNumberOfHiddenOptions(0);
    }
  }, [options, options.length]);

  const handleShowOptions = opts => {
    setShowedOptions(opts);
    setNumberOfHiddenOptions(0);
  };

  return (
    <Stack spacing="condensed" spaceAfter="largest" dataTest={`BaggagePicker-${pickerType}`}>
      <Stack flex align="center" spaceAfter="medium" spacing="tight">
        <Text weight="bold" uppercase element="p">
          {pickerType === "handBag" ? (
            <Translate t="baggage_modal.subheader.cabin_baggage" />
          ) : (
            <Translate t="baggage_modal.subheader.checked_baggage" />
          )}
        </Text>
        <Tooltip content={getTooltip(pickerType)} preferredPosition="right" size="small">
          <IconWrapper>
            <InformationCircle size="small" color="secondary" />
          </IconWrapper>
        </Tooltip>
      </Stack>
      {options.length > 0 && (
        <Text>
          {context === "booking" ? (
            <Translate t="baggage_modal.subheader.select_option" />
          ) : (
            <Translate t="baggage_modal.subheader.switch_option" />
          )}
        </Text>
      )}
      {showedOptions.length > 0 && !hasOnlyEmptyOption ? (
        showedOptions.map((item, index) => (
          <Option
            key={item.originalIndex}
            airlines={airlines}
            dataTest={`BaggagePicker-Option-${index}`}
            pickerType={pickerType}
            items={item.items}
            price={item.price}
            isChecked={item.originalIndex === passengerBaggage[pickerType]}
            shouldShowRecheckNote={shouldShowRecheckNote}
            prioBoardingLinkHandler={prioBoardingLinkHandler}
            isCurrentCombination={item.originalIndex === currentCombination}
            onClick={() => changeBagCombination(pickerType, item.originalIndex)}
            isPersonalItemPresent={getPersonalItemPresence({ pickerType, options })}
          />
        ))
      ) : (
        <EmptyOptionWrapper data-test="BaggagePicker-EmptyOption">
          <Stack flex shrink align="center" spacing="compact">
            <Close size="medium" color="critical" />
            <Stack>
              <Text element="p">
                {pickerType === "handBag" ? (
                  <Translate t="baggage_modal.error.cabin_baggage_not_available" />
                ) : (
                  <Translate t="baggage_modal.error.checked_baggage_not_available" />
                )}
              </Text>
            </Stack>
          </Stack>
        </EmptyOptionWrapper>
      )}
      {numberOfHiddenOptions > 0 && (
        <Stack flex justify="center" spacing="none">
          <Button
            dataTest="BaggagePicker-ShowButton"
            onClick={() => handleShowOptions(options)}
            size="small"
            type="secondary"
            icon={<ChevronDown />}
          >
            <Translate
              t="baggage_modal.select.show_more"
              values={{ number: numberOfHiddenOptions }}
            />
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default BaggagePicker;
