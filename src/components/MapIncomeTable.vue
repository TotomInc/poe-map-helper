<template>
  <div id="map-income-table-component">
    <div class="flex flex-row px-2 py-1 rounded bg-discord-900">
      <div class="flex flex-row items-center w-1/2 cursor-pointer" @click="changeSortBy('name')">
        <p class="text-lg">
          Item name
        </p>

        <div class="flex items-center">
          <i class="dropdown-rotation material-icons" :class="{ active: sortBy === 'name' }">arrow_drop_up</i>
        </div>
      </div>

      <div class="flex flex-row items-center justify-end w-1/4 cursor-pointer" @click="changeSortBy('chaos')">
        <p class="text-lg cursor-pointer">
          Chaos income
        </p>

        <div class="flex items-center">
          <i class="dropdown-rotation material-icons" :class="{ active: sortBy === 'chaos' }">arrow_drop_up</i>
        </div>
      </div>

      <div class="flex flex-row items-center justify-end w-1/4 cursor-pointer" @click="changeSortBy('exalt')">
        <p class="text-lg cursor-pointer">
          Exalt income
        </p>

        <div class="flex items-center">
          <i class="dropdown-rotation material-icons" :class="{ active: sortBy === 'exalt' }">arrow_drop_up</i>
        </div>
      </div>
    </div>

    <div
      v-for="(item, index) in sortedItemsDiffIncome"
      :key="'item-' + index"
      class="flex flex-row px-2 py-1 rounded"
      :class="{ 'bg-discord-900': index % 2 === 1 }"
    >
      <div class="flex flex-row items-center w-1/2">
        <img :src="cleanIconURL(item.icon)" class="h-6 mr-1" />
        <p>
          {{ item.typeLine }}
          <span class="text-vue-500">x{{ item.stackSize ? item.stackSize : 1 }}</span>
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
        <p class="text-lg">
          Total:
        </p>
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
import { POEPricedStashItem } from '../models/PathOfExile';

@Component({})
export default class MapIncomeTableComponent extends Vue {
  private sortBy: 'name' | 'chaos' | 'exalt' = 'chaos';

  get rate(): RateState {
    return this.$store.state.rate;
  }

  get stash(): StashState {
    return this.$store.state.stash;
  }

  get totalItemsDiffIncome(): { chaos: number; exalt: number } {
    return this.$store.getters[stashGetters.getTotalItemsDiffIncome];
  }

  get sortedItemsDiffIncome(): POEPricedStashItem[] {
    const { itemsDiffIncome } = this.stash;
    const frozenItemsDiffIncome = itemsDiffIncome.map((item) => Object.freeze(item));

    let sortedItems: POEPricedStashItem[] = [];

    if (this.sortBy === 'name') {
      sortedItems = this.sortAlphabetically(frozenItemsDiffIncome);
    } else if (this.sortBy === 'chaos') {
      sortedItems = this.sortChaos(frozenItemsDiffIncome);
    } else if (this.sortBy === 'exalt') {
      sortedItems = this.sortExalt(frozenItemsDiffIncome);
    }

    return sortedItems;
  }

  private cleanIconURL(iconURL: string): string {
    const url = new URL(iconURL);

    url.search = '';

    return url.href;
  }

  private changeSortBy(type: 'name' | 'chaos' | 'exalt') {
    this.sortBy = type;
  }

  private sortAlphabetically(items: POEPricedStashItem[]): POEPricedStashItem[] {
    return items.sort((a, b) => {
      if (a.typeLine < b.typeLine) {
        return -1;
      }

      if (a.typeLine > b.typeLine) {
        return 1;
      }

      return 0;
    });
  }

  private sortChaos(items: POEPricedStashItem[]): POEPricedStashItem[] {
    return items.sort((a, b) => {
      if (a.chaos < b.chaos) {
        return 1;
      }

      if (a.chaos > b.chaos) {
        return -1;
      }

      return 0;
    });
  }

  private sortExalt(items: POEPricedStashItem[]): POEPricedStashItem[] {
    return items.sort((a, b) => {
      if (a.exalt < b.exalt) {
        return 1;
      }

      if (a.exalt > b.exalt) {
        return -1;
      }

      return 0;
    });
  }
}
</script>

<style scoped>
.dropdown-rotation {
  transform: rotate(0deg);
}

.dropdown-rotation.active {
  transform: rotate(180deg);
}
</style>
