<template>
  <div
    id="latest-map-income-component"
    class="max-w-2xl mx-auto relative p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none"
  >
    <div class="map-history-view absolute w-6 h-6 rounded bg-discord-500 cursor-pointer" @click="goToMappingHistory()">
      <i class="material-icons poll-icon-fix flex items-center justify-center text-xl w-6 h-6">poll</i>
    </div>

    <div v-if="stash.loading">
      <h2 class="text-lg text-center">
        Loading stash-tab data and calculating latest map income...
      </h2>
    </div>

    <div v-else-if="!map.latestMap">
      <h1 class="mb-2 text-xl text-center text-gray-300">
        No latest map found.
      </h1>

      <h2 class="text-base text-center">
        Run a map and after the map is done, its income will be calculated.
      </h2>
    </div>

    <div v-else-if="map.latestMap && totalItemsDiffIncome.chaos <= 0">
      <h1 class="mb-2 text-xl text-center text-gray-300">
        Latest map:
        {{ map.latestMap.name }}
        (T{{ map.latestMap.tier }})
      </h1>

      <h2 class="text-base text-center">
        Its income will be calculated when you enter a new map.
      </h2>
    </div>

    <div v-else-if="map.latestMap && totalItemsDiffIncome.chaos > 0">
      <h1 class="mb-2 text-xl text-center text-gray-300">
        Latest map:
        {{ map.latestMap.name }}
        (T{{ map.latestMap.tier }})
      </h1>

      <map-income-table :items-diff-income="stash.itemsDiffIncome" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { MapState } from '@/store/map/map.state';
import { stashGetters } from '@/store/stash/stash.consts';
import { StashState } from '@/store/stash/stash.state';
import MapIncomeTable from '@/components/tables/MapIncomeTable.vue';

@Component({
  components: {
    MapIncomeTable,
  },
})
export default class LatestMapIncomeComponent extends Vue {
  get map(): MapState {
    return this.$store.state.map;
  }

  get stash(): StashState {
    return this.$store.state.stash;
  }

  get totalItemsDiffIncome(): { chaos: number; exalt: number } {
    return this.$store.getters[stashGetters.getTotalItemsDiffIncome];
  }

  public goToMappingHistory() {
    this.$router.push('/mapping-history');
  }
}
</script>

<style scoped>
.map-history-view {
  top: 8px;
  right: 8px;
}

.poll-icon-fix {
  margin-left: 0.5px;
}
</style>
