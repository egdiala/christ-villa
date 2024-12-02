const cleanUpObject = (data: object) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (typeof value === "number") return { ...acc, [key]: value };
    if (!value) return { ...acc };
    return { ...acc, [key]: value };
  }, {});
};

export const queryFormatter = (params: object) => {
  if (params) {
    return new URLSearchParams(cleanUpObject(params));
  }
  return "&";
};
