<template>
  <div id="map-income-table-component">
    <div
      v-for="(item, index) in itemsDiffIncome"
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
import { Vue, Component, Prop } from 'vue-property-decorator';

import { POEPricedStashItem } from '@/models/PathOfExile';
import { POEWatchCurrency } from '@/models/POEWatch';
import { RateState } from '@/store/rate/rate.state';

@Component({})
export default class MapIncomeTableComponent extends Vue {
  @Prop() readonly itemsDiffIncome!: POEPricedStashItem[];

  get rate(): RateState {
    return this.$store.state.rate;
  }

  get totalItemsDiffIncome(): { chaos: number; exalt: number } {
    let chaos = 0;
    let exalt = 0;

    this.itemsDiffIncome.forEach((item) => {
      chaos += item.chaos;
      exalt += item.exalt;
    });

    chaos = Math.round(chaos * 100) / 100;
    exalt = Math.round(exalt * 1000) / 1000;

    return { chaos, exalt };
  }

  private cleanIconURL(iconURL: string): string {
    const url = new URL(iconURL);

    url.search = '';

    return url.href;
  }
}
</script>
