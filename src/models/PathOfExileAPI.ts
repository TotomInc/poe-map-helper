export interface POECharacter {
  ascendancyClass: number;
  class: string;
  classId: number;
  experience: number;
  league: string;
  level: number;
  name: string;
}

export interface POELeague {
  id: number;
  name: string;
  display?: string;
  hardcore: boolean;
  upcoming: boolean;
  active: boolean;
  event: boolean;
  challenge: boolean;
  start?: Date;
  end?: Date;
}
