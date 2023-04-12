export type IdAware<T> = T & { id: string };

export const toIdAware = <T>(input: Record<string, T>): IdAware<T>[] => {
  return Object.keys(input).map((id) => ({
    ...input[id],
    id,
  }));
};
