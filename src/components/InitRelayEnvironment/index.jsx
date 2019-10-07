// @flow strict
import * as React from "react";
import { RelayEnvironmentProvider } from "@kiwicom/relay";

import makeEnvironment from "../../services/utils/relay";
import { useIntl } from "../../services/intl/context";
import { useAuth } from "../../services/auth/context";

type Props = {|
  clientID: string,
  uri?: string,
  children: React.Node,
|};

const InitRelayEnvironment = ({ children, clientID, uri }: Props) => {
  const intl = useIntl();
  const { auth } = useAuth();
  const headers: { [header: string]: string, ... } = {
    "Accept-Language": intl.language.iso,
    "X-Client": clientID,
  };

  if (auth && auth.type === "user") {
    headers.Authorization = auth.token;
  } else if (auth && auth.type === "magic") {
    headers["KW-Auth-Token"] = auth.token;
  }

  return (
    <RelayEnvironmentProvider environment={makeEnvironment(headers, uri)}>
      {children}
    </RelayEnvironmentProvider>
  );
};

export default InitRelayEnvironment;
