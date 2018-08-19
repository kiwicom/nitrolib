/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type CurrencyList_list$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuList_list$ref: FragmentReference;
export type MenuList_list = {|
  +$fragmentRefs: CurrencyList_list$ref,
  +$refType: MenuList_list$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "MenuList_list",
  "type": "CurrencyDetailConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CurrencyList_list",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '8524b9a6f5900e3cf48d78b5b0e5f2a7';
module.exports = node;
