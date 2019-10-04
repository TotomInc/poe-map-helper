<template>
  <div
    id="map-details-component"
    class="max-w-2xl mx-auto relative p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none"
  >
    <div class="flex flex-row">
      <div class="flex flex-col items-center justify-center mr-4">
        <img :src="getMapIconURL(map, selectedPoeCharacter.league)" class="p-2 h-16 rounded bg-discord-500" />
      </div>

      <div class="flex flex-col flex-grow justify-center">
        <h2 class="text-lg text-gray-300">
          {{ map.name }}

          <span class="text-base text-discord-100">(tier {{ map.tier }})</span>
        </h2>

        <p class="text-base">
          Item quantity:
          <span class="text-vue-500">{{ map.iq }}%</span>
        </p>

        <p class="text-base">
          Item rarity:
          <span class="text-vue-500">{{ map.ir }}%</span>
        </p>

        <p class="text-base">
          Monster pack size:
          <span class="text-vue-500">{{ map.mps }}%</span>
        </p>
      </div>

      <div class="flex flex-col flex-grow justify-end">
        <p class="text-base">
          Item level:
          <span class="text-vue-500">{{ map.itemLevel }}</span>
        </p>

        <p class="text-base">
          Item rarity:
          <span class="text-vue-500">{{ convertRarity(map.rarity) }}</span>
        </p>

        <p class="text-base">
          Amount of modifiers:
          <span class="text-vue-500">{{ map.modifiers.length }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { POEMapItem, POECharacter } from '@/models/PathOfExile';
import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import { userGetters } from '@/store/user/user.consts';

@Component({})
export default class MapDetailsComponent extends Mixins(POEMapIconURLMixin) {
  @Prop({
    type: Object,
    required: true,
  })
  readonly map!: POEMapItem;

  get selectedPoeCharacter(): POECharacter {
    return this.$store.getters[userGetters.poeSelectedCharacter];
  }

  public convertRarity(rarity: number): string {
    if (rarity === -1) {
      return 'unknown';
    }

    if (rarity === 0) {
      return 'normal';
    }

    if (rarity === 1) {
      return 'magic';
    }

    if (rarity === 2) {
      return 'rare';
    }

    return 'unique';
  }
}
</script>
