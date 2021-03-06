// @flow strict

type SizeUnit = "CM" | "INCH";

type WeightUnit = "KG" | "POUND";

type SizeValue = {|
  value: string,
  unit: SizeUnit,
|};

type WeightValue = {|
  value: string,
  unit: WeightUnit,
|};

type BaggageInfo = {|
  height: SizeValue,
  length: SizeValue,
  width: SizeValue,
  weight: WeightValue,
|};

export type BagsInfo = {|
  hasNoCheckedBags: boolean,
  checkedBag: BaggageInfo,
  handBag: BaggageInfo,
|};
