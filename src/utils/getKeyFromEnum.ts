export const getKeyFromEnum = (key: string, data: any) => {
  return data[key] ?? "unknown";
};
