const rewriteType = (type: "BUS" | "FLIGHT" | "TRAIN") => {
  switch (type) {
    case "BUS":
      return "bus";

    case "TRAIN":
      return "train";

    default:
      return "airline";
  }
};

export default rewriteType;
