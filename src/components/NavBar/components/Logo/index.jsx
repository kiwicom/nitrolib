// @flow strict
import React from "react";

import LogoRaw from "../../../Logo";
import { useIntl } from "../../../../services/intl/context";
import { useBrand } from "../../../../services/brand/context";

type Props = {|
  inverted?: boolean,
  onClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
|};

const Logo = ({ inverted, onClick }: Props) => {
  const brand = useBrand();
  const intl = useIntl();

  return (
    <LogoRaw
      id={brand.id}
      languageId={intl.language.id}
      redirectUrl={brand.home_redirect_url}
      poweredByKiwi={brand.powered_by_kiwi}
      title={brand.name}
      onClick={onClick}
      inverted={inverted}
    />
  );
};

export default Logo;
