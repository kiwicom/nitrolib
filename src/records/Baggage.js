// @flow

export type BaggageCategory = "holdBag" | "handBag";
export type BaggageSubCategory = "holdBag" | "personalItem" | "cabinBag";

export type BaggageGroup = "adult" | "child" | "infant";

export const CATEGORY_API_CONVERTER = {
  hold_bag: "holdBag",
  hand_bag: "handBag",
  personal_item: "personalItem",
  cabin_bag: "cabinBag",
};
export const CATEGORY_TO_API_CONVERTER = {
  holdBag: "hold_bag",
  handBag: "hand_bag",
  personalItem: "personal_item",
  cabinBag: "cabin_bag",
};

export type Definition<C: BaggageSubCategory> = {|
  note: ?string,
  price: number,
  currency: ?string,
  category: C,
  restrictions: {
    weight: number,
    height: number,
    width: number,
    length: number,
    dimensions_sum: number,
  },
|};

export type HandBagDefinition = Definition<"personalItem" | "cabinBag">;
export type HoldBagDefinition = Definition<"holdBag">;

export type Definitions = {|
  handBag: HandBagDefinition[],
  holdBag: HoldBagDefinition[],
|};

export type CombinationAllowanceGraph = {
  add: {
    // Bag with {BagIndex} is ADDED, {BaggageCombinationIndex} is the new combination
    [BagIndex: string]: number,
  },
  remove: {
    // Bag with {BagIndex} is REMOVED, {BaggageCombinationIndex} is the new combination
    [BagIndex: string]: number,
  },
};

export type Combination<C: BaggageCategory, G: BaggageGroup> = {|
  originalIndex: ?number, // index from original api array of combination
  category: C,
  group: G,
  allowanceGraph: CombinationAllowanceGraph,
  combination: number[],
  price: {
    currency: string,
    amount: number,
  },
|};

export type CombinationsGroup<G: BaggageGroup> = {|
  handBag: Combination<"handBag", G>[],
  holdBag: Combination<"holdBag", G>[],
|};

export type Combinations = {|
  adult: CombinationsGroup<"adult">,
  // $FlowFixMe
  child: CombinationsGroup<"child">,
  // $FlowFixMe
  infant: CombinationsGroup<"infant">,
|};

export type BaggageType = {
  definitions: Definitions, // Definitions same as from api
  combinations: Combinations,
};

export type Price = {
  amount: number,
  currency: string,
};

export type Restrictions = {
  dimensions_sum: number,
  height: number,
  length: number,
  weight: number,
  width: number,
};

export type Item = {
  amount: number,
  category: string,
  restrictions: Restrictions,
};

export type OptionBaggage = {
  originalIndex: number,
  bagType: string,
  price: Price,
  items: { [key: string]: Item },
};
