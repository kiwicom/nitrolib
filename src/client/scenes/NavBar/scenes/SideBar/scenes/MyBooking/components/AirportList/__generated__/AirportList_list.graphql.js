/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type AirportResult_item$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type AirportList_list$ref: FragmentReference;
export type AirportList_list = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +locationId: ?string,
      +$fragmentRefs: AirportResult_item$ref,
    |}
  |}>,
  +$refType: AirportList_list$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "AirportList_list",
  "type": "LocationConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Location",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "locationId",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "FragmentSpread",
              "name": "AirportResult_item",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'dea27172a064221e8b297658c04232af';
module.exports = node;
