/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import { ReaderFragment } from 'relay-runtime';
import { FragmentReference } from "relay-runtime";
declare export opaque type AirportResult_item$ref: FragmentReference;
declare export opaque type AirportResult_item$fragmentType: AirportResult_item$ref;
export type AirportResult_item = {
  +locationId: ?string,
  +name: ?string,
  +city: ?{
    +name: ?string
  },
  +country: ?{
    +locationId: ?string
  },
  +$refType: AirportResult_item$ref,
};
export type AirportResult_item$data = AirportResult_item;
export type AirportResult_item$key = {
  +$data?: AirportResult_item$data,
  +$fragmentRefs: AirportResult_item$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "locationId",
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
  "name": "AirportResult_item",
  "type": "Location",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "city",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationArea",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ]
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
        (v0/*: any*/)
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'afae1b5fa60d9cd49195e7aeb9d0f141';
module.exports = node;
