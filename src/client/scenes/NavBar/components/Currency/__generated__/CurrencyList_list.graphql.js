/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type CurrencyItem_item$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type CurrencyList_list$ref: FragmentReference;
export type CurrencyList_list = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +code: ?string,
      +name: ?string,
      +$fragmentRefs: CurrencyItem_item$ref,
    |}
  |}>,
  +$refType: CurrencyList_list$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "CurrencyList_list",
  "type": "CurrencyDetailConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "CurrencyDetailEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "CurrencyDetail",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "code",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "FragmentSpread",
              "name": "CurrencyItem_item",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '8b0d37263b19453f3c32ccfc326d5b4b';
module.exports = node;
