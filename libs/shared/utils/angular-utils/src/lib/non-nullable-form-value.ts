export type NonNullableFormValue<T extends Record<string, unknown>> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export const allValuesSet = <T extends Record<string, unknown>>(
  value: T,
  keys: { [K in keyof T]-?: true }
): value is NonNullableFormValue<T> => {
  return Object.keys(keys).find((v) => !!value[v]) === undefined;
};
