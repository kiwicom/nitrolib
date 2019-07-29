import React from "react";

import LogoRaw from "../../../Logo";
import { Consumer as IntlConsumer } from "../../../../services/intl/context";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";

type Props = {
  inverted?: boolean,
  onClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
};

const Logo = ({ inverted, onClick }: Props) => (
  <IntlConsumer>
    {({ language }) => (
      <BrandConsumer>
        {brand => (
          <LogoRaw
            id={brand.id}
            languageId={language.id}
            redirectUrl={brand.home_redirect_url}
            poweredByKiwi={brand.powered_by_kiwi}
            title={brand.name}
            onClick={onClick}
            inverted={inverted}
          />
        )}
      </BrandConsumer>
    )}
  </IntlConsumer>
);

export default Logo;
