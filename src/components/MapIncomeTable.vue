<template>
  <div id="map-income-table-component">
    <div
      v-for="(item, index) in stash.itemsDiffIncome"
      :key="'item-' + index"
      class="flex flex-row px-2 py-1 rounded"
      :class="{ 'bg-discord-900': index % 2 === 1 }"
    >
      <div class="flex flex-row items-center w-1/2">
        <img :src="item.icon" class="h-8 mr-2" />
        <p>
          {{ item.typeLine }}
          <span class="text-vue-500">x{{ item.stackSize }}</span>
        </p>
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ item.chaos }}</p>
        <img :src="require('@/assets/images/orbs/chaos-orb.png')" class="h-8 ml-2" />
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ item.exalt }}</p>
        <img :src="require('@/assets/images/orbs/exalted-orb.png')" class="h-8 ml-2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { RateState } from '@/store/rate/rate.state';
import { StashState } from '@/store/stash/stash.state';
import { POEWatchCurrency } from '../models/POEWatch';

@Component({})
export default class MapIncomeTableComponent extends Vue {
  get rate(): RateState {
    return this.$store.state.rate;
  }

  get stash(): StashState {
    return this.$store.state.stash;
  }
}
</script>
