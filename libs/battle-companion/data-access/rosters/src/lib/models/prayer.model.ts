import { PrayerProfile } from './prayer-profile.model';

export interface Prayer {
  title: string;
  profiles: PrayerProfile[];
}
