/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocationPickerRow_item$ref: FragmentReference;
export type LocationPickerRow_item = {|
  +locationId: ?string,
  +type: ?string,
  +name: ?string,
  +code: ?string,
  +slug: ?string,
  +location: ?{|
    +lat: ?number,
    +lng: ?number,
  |},
  +city: ?{|
    +locationId: ?string,
    +name: ?string,
    +slug: ?string,
    +code: ?string,
  |},
  +country: ?{|
    +locationId: ?string,
    +name: ?string,
    +slug: ?string,
    +code: ?string,
  |},
  +subdivision: ?{|
    +locationId: ?string,
    +name: ?string,
    +slug: ?string,
    +code: ?string,
  |},
  +$refType: LocationPickerRow_item$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
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
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v4 = [
  v0,
  v1,
  v3,
  v2
];
return {
  "kind": "Fragment",
  "name": "LocationPickerRow_item",
  "type": "Location",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "type",
      "args": null,
      "storageKey": null
    },
    v1,
    v2,
    v3,
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "location",
      "storageKey": null,
      "args": null,
      "concreteType": "Coordinates",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "lat",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "lng",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "city",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationArea",
      "plural": false,
      "selections": v4
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "country",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationArea",
      "plural": false,
      "selections": v4
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "subdivision",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationArea",
      "plural": false,
      "selections": v4
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ea4f52ee19d35821a5733d7a46588be4';
module.exports = node;
