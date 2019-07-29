/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import { ConcreteFragment } from 'relay-runtime';
import { FragmentReference } from "relay-runtime";
declare export opaque type SingleTripHeader_trip$ref: FragmentReference;
export type SingleTripHeader_trip = {
  +isPastBooking: ?boolean,
  +$refType: SingleTripHeader_trip$ref,
};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "SingleTripHeader_trip",
  "type": "BookingInterface",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isPastBooking",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'b1c440c1286b982c3d383f6e9e0efafd';
module.exports = node;
