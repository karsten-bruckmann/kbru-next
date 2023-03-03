export type IdAware<T> = T & { id: string };

export const toIdAware = <T>(input: IdAware<T>[]): Record<string, T> => {
  const record: Record<string, T> = {};
  input.forEach((item) => {
    const id = item.id;
    const recordItem: T & { id?: string } = item;
    delete recordItem.id;
    record[id] = recordItem;
  });
  return record;
};
