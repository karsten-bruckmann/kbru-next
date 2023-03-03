export interface PsychicPower {
  title: string;
  profiles: PsychicPowerProfile[];
}

export interface PsychicPowerProfile {
  title: string;
  range: string;
  warpCharge: string;
  description: string;
}
