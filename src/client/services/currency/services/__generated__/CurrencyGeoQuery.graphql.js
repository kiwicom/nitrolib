/**
 * @flow
 * @relayHash 388179e5aadf81825dd4fcd5c6d7ed67
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type currencyGeoQueryVariables = {|
  ip: any
|};
export type currencyGeoQueryResponse = {|
  +geoIP: ?{|
    +isoCountryCode: ?string
  |}
|};
*/


/*
query currencyGeoQuery(
  $ip: IP!
) {
  geoIP(ip: $ip) {
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
  "name": "currencyGeoQuery",
  "id": null,
  "text": "query currencyGeoQuery(\n  $ip: IP!\n) {\n  geoIP(ip: $ip) {\n    isoCountryCode\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "currencyGeoQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "currencyGeoQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e8bb73842a95ef1afa82d84f1be99cd7';
module.exports = node;
