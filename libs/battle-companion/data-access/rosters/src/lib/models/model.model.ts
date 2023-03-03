import { Mutation } from './mutation.model';
import { Prayer } from './prayer.model';
import { Profile } from './profile.model';
import { PsychicPower } from './psychic-power.model';
import { Weapon } from './weapon.model';

export interface Model {
  title: string;
  warlord: boolean;
  amount: number;
  profiles: Profile[];
  weapons: Weapon[];
  psychicPowers: PsychicPower[];
  prayers: Prayer[];
  mutations: Mutation[];
}
