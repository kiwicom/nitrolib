/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuGeoIP_geo$ref: FragmentReference;
export type MenuGeoIP_geo = {|
  +isoCountryCode: ?string,
  +$refType: MenuGeoIP_geo$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "MenuGeoIP_geo",
  "type": "GeoIP",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isoCountryCode",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '1012a4a6e6cfc2d7eb42b37410c2b4ea';
module.exports = node;
