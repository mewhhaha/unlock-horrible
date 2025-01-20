export const cx = (...values: (string | undefined | null)[]) => {
  return values.filter((x) => x?.trim()).join(" ");
};
