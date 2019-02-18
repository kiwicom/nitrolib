// @flow

export type BaggageCategory = "holdBag" | "handBag";
export type BaggageSubCategory = "holdBag" | "personalItem" | "cabinBag";
export type PassengerGroup = "adult" | "child" | "infant";

export type PriceType = {
  currency: string,
  amount: number,
  base: number,
  merchant?: ?string,
  service: number,
  serviceFlat: number,
};

export type Restrictions = {|
  weight: number,
  height: number,
  width: number,
  length: number,
  dimensionsSum: ?number,
|};

export type Definition<C: BaggageSubCategory> = {
  category: C,
  price: PriceType,
  restrictions: Restrictions,
  conditions: {
    isPriority?: Array<string>,
    passengerGroups: Array<PassengerGroup>,
  },
};

export type HandBagDefinition = Definition<"personalItem" | "cabinBag">;
export type HoldBagDefinition = Definition<"holdBag">;

export type Definitions = {|
  handBag: Array<HandBagDefinition>,
  holdBag: Array<HoldBagDefinition>,
|};

export type Combination = {|
  indices: Array<number>,
  price: PriceType,
  conditions: {
    passengerGroups: Array<PassengerGroup>,
  },
|};

export type Combinations = {|
  handBag: Array<Combination>,
  holdBag: Array<Combination>,
|};

export type BaggageType = {
  definitions: Definitions,
  combinations: Combinations,
};

export type TileItem = {
  category: BaggageSubCategory,
  restrictions: Restrictions,
};
export type ItemType = TileItem & {
  amount: number,
  conditions: {
    isPriority?: Array<string>,
    passengerGroups: Array<PassengerGroup>,
  },
};

export type OptionBaggage = {
  originalIndex: number,
  pickerType: BaggageCategory,
  price: PriceType,
  items: { [key: string]: ItemType },
};

export type OrderStatusType = "unpaid" | "processing" | "notAvailable";

export type Gender = "male" | "female";
