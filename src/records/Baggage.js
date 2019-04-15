// @flow strict
import type { PriceType } from "./Price";

export type BaggageCategory = "holdBag" | "handBag";
export type BaggageSubCategory = "holdBag" | "personalItem" | "cabinBag";
export type PassengerGroup = "adult" | "child" | "infant";
export type OrderStatusType = "unpaid" | "processing" | "notAvailable";
export type Gender = "male" | "female";
export type OverviewContextType = "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking";

export type Restrictions = {|
  weight: number,
  height: number,
  width: number,
  length: number,
  dimensionsSum: number | null,
|};

export type Definition<C: BaggageSubCategory> = {|
  category: C,
  price: PriceType,
  restrictions: Restrictions,
  conditions: {
    isPriority?: string[],
    passengerGroups: PassengerGroup[],
  },
|};

export type HandBagDefinition = Definition<"personalItem" | "cabinBag">;
export type HoldBagDefinition = Definition<"holdBag">;

export type HandBagDefinitionWithId = {| ...HandBagDefinition, id: number |};
export type HoldBagDefinitionWithId = {| ...HoldBagDefinition, id: number |};

export type HandBagTileDefinition = {|
  ...HandBagDefinition,
  originalIndex?: number,
  isCurrent?: boolean,
|};
export type HoldBagTileDefinition = {|
  ...HoldBagDefinition,
  originalIndex?: number,
  isCurrent?: boolean,
|};

export type Definitions = {|
  handBag: HandBagDefinition[],
  holdBag: HoldBagDefinition[],
|};

export type Combination = {|
  indices: number[],
  price: PriceType,
  conditions: {
    passengerGroups: PassengerGroup[],
  },
|};

export type Combinations = {|
  handBag: Combination[],
  holdBag: Combination[],
|};

export type BaggageType = {|
  definitions: Definitions,
  combinations: Combinations,
|};

export type TileItem = {|
  category: BaggageSubCategory,
  restrictions: Restrictions,
|};

export type ItemType = {|
  ...TileItem,
  amount: number,
  conditions: {
    isPriority?: string[],
    passengerGroups: PassengerGroup[],
  },
|};

export type OptionBaggage = {|
  originalIndex: number,
  pickerType: BaggageCategory,
  price: PriceType,
  items: { [key: string]: ItemType },
|};

export type FAQLinksHandlerType = BaggageSubCategory => void;

export type BaggagePassengerType = {|
  paxId: number,
  firstName: string,
  middleName?: string,
  lastName: string,
|};

export type Passenger = {|
  ...BaggagePassengerType,
  baggage: {
    holdBag: number, // index of baggage combination
    handBag: number, // index of baggage combination
  },
|};

export type DefinitionWithPassenger = {|
  originalIndex: number,
  category: BaggageSubCategory,
  restrictions: Restrictions,
  passengers: BaggagePassengerType[],
|};
