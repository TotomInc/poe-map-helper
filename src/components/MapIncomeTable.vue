<template>
  <div id="map-income-table-component">
    <div
      v-for="(item, index) in stash.itemsDiffIncome"
      :key="'item-' + index"
      class="flex flex-row px-2 py-1 rounded"
      :class="{ 'bg-discord-900': index % 2 === 1 }"
    >
      <div class="flex flex-row items-center w-1/2">
        <img :src="cleanIconURL(item.icon)" class="h-6 mr-1" />
        <p>
          {{ item.typeLine }}
          <span class="text-vue-500">x{{ item.stackSize }}</span>
        </p>
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ item.chaos }}</p>
        <img :src="require('@/assets/images/orbs/chaos-orb.png')" class="h-6 ml-1" />
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ item.exalt }}</p>
        <img :src="require('@/assets/images/orbs/exalted-orb.png')" class="h-6 ml-1" />
      </div>
    </div>

    <div class="flex flex-row px-2 py-1 rounded">
      <div class="flex flex-row items-center w-1/2">
        <p>Total:</p>
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ totalItemsDiffIncome.chaos }}</p>
        <img :src="require('@/assets/images/orbs/chaos-orb.png')" class="h-6 ml-1" />
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ totalItemsDiffIncome.exalt }}</p>
        <img :src="require('@/assets/images/orbs/exalted-orb.png')" class="h-6 ml-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { RateState } from '@/store/rate/rate.state';
import { StashState } from '@/store/stash/stash.state';
import { stashGetters } from '@/store/stash/stash.consts';
import { POEWatchCurrency } from '../models/POEWatch';

@Component({})
export default class MapIncomeTableComponent extends Vue {
  get rate(): RateState {
    return this.$store.state.rate;
  }

  get stash(): StashState {
    return this.$store.state.stash;
  }

  get totalItemsDiffIncome(): { chaos: number; exalt: number } {
    return this.$store.getters[stashGetters.getTotalItemsDiffIncome];
  }

  private cleanIconURL(iconURL: string): string {
    const url = new URL(iconURL);

    url.search = '';

    return url.href;
  }
}
</script>
