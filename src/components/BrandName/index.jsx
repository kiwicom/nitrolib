// @flow strict
import * as React from "react";

import { Consumer as BrandConsumer } from "services/brand/context";

const BrandName = () => <BrandConsumer>{brand => brand.name}</BrandConsumer>;

export default BrandName;
