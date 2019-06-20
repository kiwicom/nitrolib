/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type LocationPickerRow_item$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocationPickerResultList_list$ref: FragmentReference;
declare export opaque type LocationPickerResultList_list$fragmentType: LocationPickerResultList_list$ref;
export type LocationPickerResultList_list = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +id: string,
      +$fragmentRefs: LocationPickerRow_item$ref,
    |}
  |}>,
  +$refType: LocationPickerResultList_list$ref,
|};
export type LocationPickerResultList_list$data = LocationPickerResultList_list;
export type LocationPickerResultList_list$key = {
  +$data?: LocationPickerResultList_list$data,
  +$fragmentRefs: LocationPickerResultList_list$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "LocationPickerResultList_list",
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
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "FragmentSpread",
              "name": "LocationPickerRow_item",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '223af908ef6d88dd24629bfe885777e7';
module.exports = node;
