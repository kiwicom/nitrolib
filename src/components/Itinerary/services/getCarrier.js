// @flow strict
import type { Carrier } from "../../../records/Segment";

type CarrierLogo = { code: string, name: string, type?: "airline" | "bus" | "train" };

const getCarrier = (arr: Carrier[], id: string): CarrierLogo[] =>
  arr.filter(carrier => carrier.id === id).map(({ code, name }) => ({ code, name }));

export default getCarrier;
