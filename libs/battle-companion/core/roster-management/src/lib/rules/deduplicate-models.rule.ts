import { Model } from '@kbru/battle-companion/data-access/rosters';

export const deduplicateModels = (models: Model[]): Model[] => {
  const deduplicated: Record<string, Model> = {};
  models.forEach((model) => {
    const modelWithoutWeapons: Model = { ...model, weapons: [] };
    const hash = JSON.stringify(modelWithoutWeapons);
    if (!deduplicated[hash]) {
      deduplicated[hash] = model;
      return;
    }
    deduplicated[hash].amount++;
    model.weapons.forEach((weapon) => {
      const indexInDeduplicated = deduplicated[hash].weapons.findIndex(
        (w) => weapon.title === w.title
      );
      if (indexInDeduplicated === -1) {
        deduplicated[hash].weapons.push(weapon);
        return;
      }

      deduplicated[hash].weapons[indexInDeduplicated].amount++;
    });
  });
  return Object.values(deduplicated);
};
