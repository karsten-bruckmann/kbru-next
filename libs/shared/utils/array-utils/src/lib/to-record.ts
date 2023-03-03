export const toRecord = <T extends { id: string }>(
  array: T[]
): Record<string, Omit<T, 'id'>> =>
  array.reduce(
    (record, entry) => ({
      ...record,
      [entry.id]: {
        ...entry,
        id: undefined,
      },
    }),
    {}
  );
