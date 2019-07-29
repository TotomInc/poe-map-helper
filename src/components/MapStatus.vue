<template>
  <transition name="smooth" appear>
    <div
      id="map-status-component"
      class="max-w-2xl mx-auto p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none"
    >
      <h1 v-if="!map.inMap" class="mb-2 text-xl text-center text-gray-300">
        You are not in a map, waiting for player to enter the map.
      </h1>

      <h1 v-else-if="map.inMap" class="mb-2 text-xl text-center text-gray-300">
        You are in the map.
      </h1>

      <h2 v-if="!map.queuedMap && !map.currentMap" class="text-base text-center">
        Start mapping by pressing
        <span class="bg-discord-300 rounded p-1 text-white">CTRL+C</span>
        with your cursor over the map-item you want to run, in order to notify the Mapper Assistant.
      </h2>

      <div class="flex">
        <div v-if="map.currentMap" class="flex w-1/2">
          <div class="flex flex-col items-center justify-center mr-4">
            <p class="mb-2 rounded-full px-2 py-1 text-xs text-white bg-vue-500">
              Current
            </p>

            <img :src="getMapIconURL(map.currentMap)" class="p-2 h-16 rounded bg-discord-500" />
          </div>

          <div class="flex flex-col flex-grow justify-center">
            <h2 class="text-lg text-gray-300">
              {{ map.currentMap.name }}

              <span class="text-base text-discord-100">(tier {{ map.currentMap.tier }})</span>
            </h2>

            <p class="text-base">
              Item quantity:
              <span class="text-vue-500">{{ map.currentMap.iq }}%</span>
            </p>

            <p class="text-base">
              Item rarity:
              <span class="text-vue-500">{{ map.currentMap.ir }}%</span>
            </p>

            <p class="text-base">
              Monster pack size:
              <span class="text-vue-500">{{ map.currentMap.mps }}%</span>
            </p>
          </div>
        </div>

        <div v-if="map.queuedMap" class="flex w-1/2">
          <div class="flex flex-col items-center justify-center mr-4">
            <p class="mb-2 rounded-full px-2 py-1 text-xs text-white bg-orange-400">
              Queued
            </p>

            <img :src="getMapIconURL(map.queuedMap)" class="p-2 h-16 rounded bg-discord-500" />
          </div>

          <div class="flex flex-col flex-grow justify-center">
            <h2 class="text-lg text-gray-300">
              {{ map.queuedMap.name }}

              <span class="text-base text-discord-100">(tier {{ map.queuedMap.tier }})</span>
            </h2>

            <p class="text-base">
              Item quantity:
              <span class="text-vue-500">{{ map.queuedMap.iq }}%</span>
            </p>

            <p class="text-base">
              Item rarity:
              <span class="text-vue-500">{{ map.queuedMap.ir }}%</span>
            </p>

            <p class="text-base">
              Monster pack size:
              <span class="text-vue-500">{{ map.queuedMap.mps }}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { POEMapItem } from '@/models/PathOfExile';
import { MapState } from '@/store/map/map.state';
import { rawMapsImageURL } from '../consts/zones';

@Component({})
export default class MapStatusComponent extends Vue {
  get map(): MapState {
    return this.$store.state.map;
  }

  private getMapIconURL(map: POEMapItem): string {
    // Map name contains the "Map" suffix, we need to cut this suffix
    const mapName = map.name.substring(0, map.name.indexOf('Map') - 1);
    const rawMapImageURL = rawMapsImageURL.find((rawMap) => rawMap.name === mapName);

    if (rawMapImageURL) {
      return `https:${rawMapImageURL.url}?mn=4&mt=${map.tier}&mr=0`;
    }

    return 'https://gamepedia.cursecdn.com/pathofexile_gamepedia/0/09/Untainted_Paradise_inventory_icon.png';
  }
}
</script>
