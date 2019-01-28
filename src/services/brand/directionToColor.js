// @flow strict

const destinationColors = {
  base: {
    a: "#00a991", // TODO: connect to orbit-tokens, when added
    b: "#f9971e",
    c: "#d50c6a",
    d: "#35DC93",
    e: "#EF7209",
    f: "#863CCD",
    g: "#006DC7",
    h: "#4FB52E",
    i: "#828921",
    j: "#9F683E",
    k: "#FD696A",
    l: "#F558BF",
    m: "#7684FB",
    n: "#00A0BD",
    o: "#30363D",
  },
};

const defaultColorOrder = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
];

// TODO: connect to brandConfig, when added
const brandOrder = {
  nizkocenovci: ["c", "a", "b", "f", "h", "e", "g", "d", "i", "j", "k", "l", "m", "n", "o"],
};

export function getColorInfo(branding: any) {
  return {
    id: branding.get("id"),
    color: branding
      .get("theme")
      .get("colors")
      .get("primary-500"),
  };
}

const getColorByIndex = (direction: number, brandingId: string) => {
  const index =
    direction < 0 || direction >= defaultColorOrder.length
      ? defaultColorOrder.length - 1
      : direction;
  const colorChar = brandOrder[brandingId]
    ? brandOrder[brandingId][index]
    : defaultColorOrder[index];
  return destinationColors.base[colorChar];
};

export default function directionToColor(
  direction: number,
  brandColorInfo: { id: string, color: string } = { id: "", color: "" },
) {
  const baseColor =
    direction === 0 && brandColorInfo && brandColorInfo.id !== "kiwicom"
      ? brandColorInfo.color
      : getColorByIndex(direction || 0, brandColorInfo.id);

  return baseColor;
}
