// @flow strict

export const { isAccepted, saveAccepted } = jest.genMockFromModule("../store");

isAccepted.mockReturnValue(false);
