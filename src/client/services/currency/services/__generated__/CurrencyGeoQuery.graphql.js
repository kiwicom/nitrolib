/**
 * @flow
 * @relayHash dcf7558d779dc91703a6fa4cf73eed14
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CurrencyGeoQueryVariables = {|
  ip: any
|};
export type CurrencyGeoQueryResponse = {|
  +geoIP: ?{|
    +isoCountryCode: ?string
  |}
|};
*/


/*
query CurrencyGeoQuery(
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
  "name": "CurrencyGeoQuery",
  "id": null,
  "text": "query CurrencyGeoQuery(\n  $ip: IP!\n) {\n  geoIP(ip: $ip) {\n    isoCountryCode\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CurrencyGeoQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CurrencyGeoQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8fcb9fabac238cd3cddf9219d388253c';
module.exports = node;
