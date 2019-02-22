// @flow strict

import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";

import Translate from "../../../Translate/index";

type Props = {
  icon: React.Node,
  t: string,
};

const SectionHeading = ({ icon, t }: Props) => (
  <Stack direction="row" spacing="compact" spaceAfter="large">
    {icon}
    <Heading element="h3" type="title2">
      <Translate t={t} />
    </Heading>
  </Stack>
);

export default SectionHeading;
