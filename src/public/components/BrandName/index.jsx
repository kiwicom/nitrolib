// @flow strict
import React from "react";

import { Consumer as BrandConsumer } from "public/services/brand/context";

const BrandName = () => <BrandConsumer>{brand => brand.name}</BrandConsumer>;

export default BrandName;
