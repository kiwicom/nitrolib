/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type PlaceResult_item$ref: FragmentReference;
export type PlaceResult_item = {|
  +locationId: ?string,
  +name: ?string,
  +type: ?string,
  +country: ?{|
    +locationId: ?string,
  |},
  +$refType: PlaceResult_item$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "locationId",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "PlaceResult_item",
  "type": "Location",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
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
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "country",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationArea",
      "plural": false,
      "selections": [
        v0
      ]
    }
  ]
};
})();
(node/*: any*/).hash = '8d1d4e5dfdf87bfae5fc8de42ff9bb3d';
module.exports = node;
