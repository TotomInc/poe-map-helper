import { POECharacter } from '@/models/PathOfExile';

export function randomCharacter(league: string = 'Standard'): POECharacter {
  return {
    league,
    ascendancyClass: Math.floor(Math.random() * 10),
    class: 'Witch',
    classId: Math.floor(Math.random() * 5),
    experience: 0,
    level: 1,
    name: Math.floor(Math.random() * 1000).toString(),
  };
}
