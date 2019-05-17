// @flow strict

const setHours = (time: number) => String(Math.round(time / 60)); // to string because of orbit types

export default setHours;
