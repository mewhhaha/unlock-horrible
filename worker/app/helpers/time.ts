export const now = () => new Date().toISOString();

export const minute1 = () => fromNow(1000 * 60);

export const fromNow = (ms: number) => {
  return new Date(new Date().getTime() + ms);
};
