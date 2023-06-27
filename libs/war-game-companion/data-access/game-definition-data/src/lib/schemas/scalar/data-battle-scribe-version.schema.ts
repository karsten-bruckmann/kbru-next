import { z, ZodType } from 'zod';

export type DataBattleScribeVersionAware = {
  '@_dataBattleScribeVersion': string;
};

export const dataBattleScribeVersionSchema: ZodType<DataBattleScribeVersionAware> =
  z.object({
    '@_dataBattleScribeVersion': z.string(),
  });
