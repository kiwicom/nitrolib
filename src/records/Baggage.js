// @flow

export type BaggageCategory = "holdBag" | "handBag";
export type BaggageSubCategory = "holdBag" | "personalItem" | "cabinBag";

export type BaggageGroup = "adult" | "child" | "infant";

export type Price = {
  currency: string,
  amount: number,
};

export type Restrictions = {|
  weight: number,
  height: number,
  width: number,
  length: number,
  dimensions_sum: ?number,
|};

export type Definition<C: BaggageSubCategory> = {
  note: ?string,
  price: Price,
  category: C,
  restrictions: Restrictions,
  conditions?: {
    is_priority: Array<string>,
  },
};

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
  price: Price,
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
  combinations: Combinations, // Combinations same as from api
};

export type Item = {
  amount: number,
  category: string,
  restrictions: Restrictions,
  conditions?: {
    is_priority: Array<string>,
  },
};

export type OptionBaggage = {
  originalIndex: number,
  bagType: string,
  price: Price,
  items: { [key: string]: Item },
};
