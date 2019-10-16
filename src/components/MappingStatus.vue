<template>
  <div
    id="mapping-status-component"
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

    <div class="flex mb-4">
      <div v-if="map.currentMap" class="flex w-1/2">
        <div class="flex flex-col items-center justify-center mr-4">
          <p class="mb-2 rounded-full px-2 py-1 text-xs text-white bg-vue-500">
            Current
          </p>

          <img
            :src="getMapIconURL(map.currentMap, selectedPoeCharacter.league)"
            class="p-2 h-16 rounded bg-discord-500"
          />
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

          <img
            :src="getMapIconURL(map.queuedMap, selectedPoeCharacter.league)"
            class="p-2 h-16 rounded bg-discord-500"
          />
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

    <div class="flex justify-center items-center">
      <div class="inline-block text-gray-300 py-1 px-3 rounded-full bg-discord-500 cursor-pointer">
        <p v-if="!map.automaticMode" @click="enableAutomaticMode">
          Enable Automatic Mode
        </p>

        <p v-else @click="disableAutomaticMode">
          Disable Automatic Mode
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';

import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import { POEMapItem, POECharacter } from '@/models/PathOfExile';
import { MapState } from '@/store/map/map.state';
import { userGetters } from '@/store/user/user.consts';
import { mapMutations } from '../store/map/map.consts';
import { rawMapsImageURL } from '../consts/zones';

@Component({})
export default class MappingStatusComponent extends Mixins(POEMapIconURLMixin) {
  get map(): MapState {
    return this.$store.state.map;
  }

  get selectedPoeCharacter(): POECharacter {
    return this.$store.getters[userGetters.poeSelectedCharacter];
  }

  public enableAutomaticMode(): void {
    this.$store.commit(mapMutations.enableAutomaticMode);
  }

  public disableAutomaticMode(): void {
    this.$store.commit(mapMutations.disableAutomaticMode);
  }
}
</script>
