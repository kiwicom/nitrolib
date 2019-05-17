// @flow strict
import type { TileDefinition } from "../../../records/Baggage";

export default function handleIsCurrentFlag(
  definitions: TileDefinition[],
  commonDefIndices: number[],
) {
  const memo = [...commonDefIndices];
  return definitions.reduce((acc, def) => {
    if (memo.some(i => i === def.originalIndex)) {
      def.isCurrent = true; // eslint-disable-line
      memo.splice(memo.findIndex(i => i === def.originalIndex), 1); // eslint-disable-line
    }
    // $FlowExpected: Union types issue
    return acc.concat(def);
  }, []);
}
