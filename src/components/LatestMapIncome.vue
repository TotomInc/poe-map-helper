<template>
  <transition name="smooth" appear>
    <div
      id="latest-map-income-component"
      class="max-w-2xl mx-auto p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none"
    >
      <div v-if="stash.loading">
        <h1 class="mb-2 text-xl text-center text-gray-300">
          Latest map:
          {{ map.latestMap.name }}
          (T{{ map.latestMap.tier }})
        </h1>

        <h2 class="text-lg text-center">
          Loading stash-tab data and calculating latest map income...
        </h2>
      </div>

      <div v-else-if="!map.latestMap && !map.latestMapIncomeCalculated">
        <h1 class="mb-2 text-xl text-center text-gray-300">
          No latest map found.
        </h1>

        <h2 class="text-base text-center">
          Run a map and after the map is done, its income will be calculated.
        </h2>
      </div>

      <div v-else-if="map.latestMap && !map.latestMapIncomeCalculated">
        <h1 class="mb-2 text-xl text-center text-gray-300">
          Latest map:
          {{ map.latestMap.name }}
          (T{{ map.latestMap.tier }})
        </h1>

        <h2 class="text-base text-center">
          Its income will be calculated when you enter a new map.
        </h2>
      </div>

      <div v-else-if="map.latestMap && map.latestMapIncomeCalculated">
        <h1 class="mb-2 text-xl text-center text-gray-300">
          Latest map:
          {{ map.latestMap.name }}
          (T{{ map.latestMap.tier }})
        </h1>

        <map-income-table />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { MapState } from '@/store/map/map.state';
import { StashState } from '@/store/stash/stash.state';
import MapIncomeTable from '@/components/MapIncomeTable.vue';

@Component({
  components: {
    MapIncomeTable
  }
})
export default class LatestMapIncomeComponent extends Vue {
  get map(): MapState {
    return this.$store.state.map;
  }

  get stash(): StashState {
    return this.$store.state.stash;
  }
}
</script>
