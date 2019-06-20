/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TripHeader_list$ref: FragmentReference;
declare export opaque type TripHeader_list$fragmentType: TripHeader_list$ref;
export type TripHeader_list = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +isPastBooking: ?boolean
    |}
  |}>,
  +$refType: TripHeader_list$ref,
|};
export type TripHeader_list$data = TripHeader_list;
export type TripHeader_list$key = {
  +$data?: TripHeader_list$data,
  +$fragmentRefs: TripHeader_list$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "TripHeader_list",
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
              "name": "isPastBooking",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'a89c1c2f2723df86a68855fc28aeb4ec';
module.exports = node;
