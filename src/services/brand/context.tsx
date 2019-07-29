import * as React from "react";

import { brandDefault } from "../../records/Brand";
import { Brand } from "../../records/Brand";

const context: React.Context<Brand> = React.createContext(brandDefault);

export const { Consumer, Provider } = context;

export default context;
