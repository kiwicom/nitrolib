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
export type LocationPickerResultList_list = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +id: string,
      +type: ?string,
      +code: ?string,
      +name: ?string,
      +country: ?{|
        +code: ?string,
        +name: ?string,
      |},
      +$fragmentRefs: LocationPickerRow_item$ref,
    |}
  |}>,
  +$refType: LocationPickerResultList_list$ref,
|};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
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
              "kind": "ScalarField",
              "alias": null,
              "name": "type",
              "args": null,
              "storageKey": null
            },
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "country",
              "storageKey": null,
              "args": null,
              "concreteType": "LocationArea",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/)
              ]
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
})();
// prettier-ignore
(node/*: any*/).hash = '1ea2d7544f75d1136a7717149d16ebea';
module.exports = node;
