// @flow strict
import type { PriceType } from "./Price";

export type BaggageCategory = "holdBag" | "handBag";
export type BaggageSubCategory = "holdBag" | "personalItem" | "cabinBag";
export type PassengerGroup = "adult" | "teen" | "child" | "infant";
export type OrderStatusType = "unpaid" | "processing" | "notAvailable";
export type OverviewContextType = "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking";

export type Restrictions = {|
  weight: ?number,
  height: ?number,
  width: ?number,
  length: ?number,
  dimensionsSum: ?number,
|};

export type Conditions = {
  isPriority?: string[],
  passengerGroups: PassengerGroup[],
};

export type Definition = {|
  index: number,
  category: BaggageSubCategory,
  price: PriceType,
  restrictions: Restrictions,
  conditions: Conditions,
|};

export type TileDefinition = {
  ...Definition,
  originalIndex?: number,
  isCurrent?: boolean,
};

export type Definitions = {|
  handBag: Definition[],
  holdBag: Definition[],
|};

export type Combination = {|
  index: number,
  indices: number[],
  price: PriceType,
  conditions: Conditions,
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
