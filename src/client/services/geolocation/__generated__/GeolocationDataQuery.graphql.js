/**
 * @flow
 * @relayHash 0dbaba307a761e114c078055838def84
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GeolocationDataQueryVariables = {|
  ip: any
|};
export type GeolocationDataQueryResponse = {|
  +geoIP: ?{|
    +coordinates: ?{|
      +lat: ?number,
      +lng: ?number,
    |},
    +isoCountryCode: ?string,
  |}
|};
*/


/*
query GeolocationDataQuery(
  $ip: IP!
) {
  geoIP(ip: $ip) {
    coordinates {
      lat
      lng
    }
    isoCountryCode
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "ip",
    "type": "IP!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "geoIP",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ip",
        "variableName": "ip",
        "type": "IP!"
      }
    ],
    "concreteType": "GeoIP",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "coordinates",
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
        "kind": "ScalarField",
        "alias": null,
        "name": "isoCountryCode",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "GeolocationDataQuery",
  "id": null,
  "text": "query GeolocationDataQuery(\n  $ip: IP!\n) {\n  geoIP(ip: $ip) {\n    coordinates {\n      lat\n      lng\n    }\n    isoCountryCode\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "GeolocationDataQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "GeolocationDataQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a54b48bb479d6818fc8fb9564fb5bcd8';
module.exports = node;
