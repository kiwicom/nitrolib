/**
 * @flow
 * @relayHash 5c62c24dc4e9a28ea222d3b7b9ad1fd3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GeoDataQueryVariables = {||};
export type GeoDataQueryResponse = {|
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
query GeoDataQuery {
  geoIP(ip: "185.86.151.11") {
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
    "kind": "LinkedField",
    "alias": null,
    "name": "geoIP",
    "storageKey": "geoIP(ip:\"185.86.151.11\")",
    "args": [
      {
        "kind": "Literal",
        "name": "ip",
        "value": "185.86.151.11",
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
  "name": "GeoDataQuery",
  "id": null,
  "text": "query GeoDataQuery {\n  geoIP(ip: \"185.86.151.11\") {\n    coordinates {\n      lat\n      lng\n    }\n    isoCountryCode\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "GeoDataQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "GeoDataQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '99d8336a1c40106474c2ac96ffedb90f';
module.exports = node;
