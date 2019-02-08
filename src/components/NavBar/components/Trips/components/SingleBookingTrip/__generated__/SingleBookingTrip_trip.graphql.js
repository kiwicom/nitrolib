/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type MulticityTrips_item$ref = any;
type OneWayTrips_item$ref = any;
type ReturnTrips_item$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type SingleBookingTrip_trip$ref: FragmentReference;
export type SingleBookingTrip_trip = {|
  +__typename: string,
  +id: string,
  +isPastBooking: ?boolean,
  +destinationImageUrl: ?string,
  +$fragmentRefs: OneWayTrips_item$ref & MulticityTrips_item$ref & ReturnTrips_item$ref,
  +$refType: SingleBookingTrip_trip$ref,
|};
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
      "kind": "ScalarField",
      "alias": null,
      "name": "isPastBooking",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "destinationImageUrl",
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
(node/*: any*/).hash = '5a615c25c579bde41aefd2cfa17d35f6';
module.exports = node;
