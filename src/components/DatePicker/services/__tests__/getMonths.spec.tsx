import getMonthDays from "../getMonthDays";

describe("#getMonthsDays", () => {
  test("getMonth's days matrix", () => {
    const date = new Date(2019, 0, 1);

    expect(getMonthDays({ date })).toEqual([
      [, "1", "2", "3", "4", "5", "6"],
      ["7", "8", "9", "10", "11", "12", "13"],
      ["14", "15", "16", "17", "18", "19", "20"],
      ["21", "22", "23", "24", "25", "26", "27"],
      ["28", "29", "30", "31", , , ],
    ]);
  });
});
