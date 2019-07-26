// @flow strict
const reg = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const isUUID = (input: string) => reg.test(input);

export default isUUID;
