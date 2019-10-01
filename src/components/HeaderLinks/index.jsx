// @flow strict
import * as React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import AirplaneUp from "@kiwicom/orbit-components/lib/icons/AirplaneUp";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";
import Desktop from "@kiwicom/orbit-components/lib/Desktop";
import NavigationList from "@kiwicom/orbit-components/lib/NavigationList";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import useOnClickOutside from "@kiwicom/orbit-components/lib/hooks/useClickOutside";

import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./components/Links";
// Services
import getNavBarLinks from "./services/api";
import type { SearchForm, HeaderLinksContext } from "./records/HeaderLink";
import { useLog } from "../../services/log/context";
import type { Splitster, Response } from "./services/api";
import { HEADER_LINKS_ERROR } from "./consts/events";

type Props = {|
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
  active?: string,
  onFetch?: (services: Response) => void,
  testResponse?: Response, // TODO solve using DI
  context?: HeaderLinksContext,
  newDesign?: boolean,
|};

const Headerlinks = ({
  languageId,
  currencyId,
  searchForm,
  testResponse,
  splitster,
  onFetch,
  context,
  newDesign,
  active,
}: Props) => {
  const [allServices, setServices] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);
  const node = React.useRef(null);

  const { log } = useLog();

  useOnClickOutside(node, () => setOpen(false));

  const getLinks = React.useCallback(async () => {
    if (testResponse) {
      setServices(testResponse.items);
      return;
    }

    try {
      const services = await getNavBarLinks({
        languageId,
        currencyId,
        searchForm,
        splitster,
        context,
      });

      setServices(services.items);

      if (onFetch) {
        onFetch(services);
      }
    } catch (err) {
      log(HEADER_LINKS_ERROR, { error: String(err) });
    }
  }, [context, currencyId, languageId, log, onFetch, searchForm, splitster, testResponse]);

  React.useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (!allServices) return null;

  return (
    <>
      <Mobile>
        {isOpen && (
          <Popup ref={node}>
            <Stack direction="column">
              <Links newDesign={newDesign} services={allServices} active={active} />
            </Stack>
          </Popup>
        )}
        {allServices && allServices.length > 0 && (
          <IconWrapper aria-label="open" act={isOpen} onClick={() => setOpen(true)}>
            {newDesign ? <Airplane /> : <AirplaneUp />}
            <ChevronDown size="small" />
          </IconWrapper>
        )}
      </Mobile>

      <Desktop>
        {allServices && allServices.length > 0 && (
          <NavigationList type="inline">
            <Links newDesign={newDesign} services={allServices} active={active} />
          </NavigationList>
        )}
      </Desktop>
    </>
  );
};

export default Headerlinks;
