import { Vue, Component } from 'vue-property-decorator';

import { POEMapItem } from '@/models/PathOfExile';
import { rawMapsImageURL } from '../consts/zones';

@Component({})
export default class PoeMapIconURL extends Vue {
  /**
   * Returns the URL of a map-item based on its name. Make sure to take into
   * account the variants (tier, shaped/elder) and mismatch between map name
   * and POE's API map-icon name (based on the `zones` consts).
   *
   * @param map a parsed POE map-item (copied from the clipboard)
   */
  public getMapIconURL(map: POEMapItem): string {
    // Map name contains the "Map" suffix, we need to cut this suffix
    // It can also contains the shaped prefix which needs to be removed
    let mapName = map.name.substring(0, map.name.indexOf('Map') - 1);
    const isShaped = map.name.indexOf('Shaped') > -1 ? 1 : 0;

    if (isShaped) {
      mapName = mapName.substring('Shaped '.length, mapName.length);
    }

    const rawMapImageURL = rawMapsImageURL.find((rawMap) => rawMap.name === mapName);

    if (rawMapImageURL) {
      return `https:${rawMapImageURL.url}?mn=4&mt=${map.tier}&mr=${isShaped}`;
    }

    return 'https://gamepedia.cursecdn.com/pathofexile_gamepedia/0/09/Untainted_Paradise_inventory_icon.png';
  }
}
