import { POEMapZone } from '@/models/PathOfExile';
import { maps, specialMappedZones, hideouts } from '../consts/zones';

const parseEnteredZone = /You have entered (.*)./;

export interface ParsedLogLine {
  enterMap: boolean;
  enterHideout: boolean;
  mapZoneDetails: undefined | POEMapZone;
}

/**
 * Parse a line from the logfile, detect if the player have entered a new zone,
 * returns zone details, hideout, map, ...
 *
 * @param line line from the logfile
 */
export function parseLogLine(line: string): ParsedLogLine {
  let mapZoneDetails: undefined | POEMapZone;
  let enterMap = false;
  let enterHideout = false;

  if (parseEnteredZone.test(line)) {
    // eslint-disable-next-line prefer-destructuring
    const zoneName = line.match(parseEnteredZone)![1];

    mapZoneDetails = [...maps, ...specialMappedZones].find((map) => map.name === zoneName);

    if (mapZoneDetails) {
      enterMap = true;
    } else if (hideouts.indexOf(zoneName) > -1) {
      enterHideout = true;
    }
  }

  return { enterMap, enterHideout, mapZoneDetails };
}
