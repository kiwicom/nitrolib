// @flow strict

// TODO: imporove it. Just a temporary decision to show some colors for Trips.

const tripColors = (tripIndex: number, defaultColor: string) => {
  const colors = [
    "#0097A9",
    "#FBAD18",
    "#D50C6A",
    "#35DC93",
    "#EF7209",
    "#863CCD",
    "#006DC7",
    "#4FB52E",
    "#30363D",
    "#ABB2BA",
  ];

  return colors.find((item, color) => color === tripIndex) || defaultColor;
};

export default tripColors;
