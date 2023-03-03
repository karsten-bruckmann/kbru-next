import { WeaponProfile } from './weapon-profile.model';

export interface Weapon {
  title: string;
  amount: number;
  abilities: string[];
  profiles: WeaponProfile[];
}
