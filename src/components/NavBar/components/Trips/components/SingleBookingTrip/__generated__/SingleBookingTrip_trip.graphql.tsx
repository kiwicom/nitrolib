/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import { ReaderFragment } from 'relay-runtime';
type MulticityTrips_item$ref = any;
type OneWayTrips_item$ref = any;
type ReturnTrips_item$ref = any;
import { FragmentReference } from "relay-runtime";
declare export opaque type SingleBookingTrip_trip$ref: FragmentReference;
declare export opaque type SingleBookingTrip_trip$fragmentType: SingleBookingTrip_trip$ref;
export type SingleBookingTrip_trip = {
  +__typename: string,
  +id: string,
  +$fragmentRefs: OneWayTrips_item$ref & MulticityTrips_item$ref & ReturnTrips_item$ref,
  +$refType: SingleBookingTrip_trip$ref,
};
export type SingleBookingTrip_trip$data = SingleBookingTrip_trip;
export type SingleBookingTrip_trip$key = {
  +$data?: SingleBookingTrip_trip$data,
  +$fragmentRefs: SingleBookingTrip_trip$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SingleBookingTrip_trip",
  "type": "BookingInterface",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OneWayTrips_item",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "MulticityTrips_item",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ReturnTrips_item",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '09426230124f62bbbe491847c17c67f4';
module.exports = node;
