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
declare export opaque type TripList_list$ref: FragmentReference;
declare export opaque type TripList_list$fragmentType: TripList_list$ref;
export type TripList_list = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +__typename: string,
      +id: string,
      +$fragmentRefs: OneWayTrips_item$ref & MulticityTrips_item$ref & ReturnTrips_item$ref,
    |}
  |}>,
  +$refType: TripList_list$ref,
|};
export type TripList_list$data = TripList_list;
export type TripList_list$key = {
  +$data?: TripList_list$data,
  +$fragmentRefs: TripList_list$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "TripList_list",
  "type": "BookingInterfaceConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "BookingInterfaceEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '1251216e60a35b40bc42cd6a66234191';
module.exports = node;
