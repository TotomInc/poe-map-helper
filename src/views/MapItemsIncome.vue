<template>
  <div id="maps-items-income-view" class="relative container mx-auto py-8">
    <div
      class="back-home absolute inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 cursor-pointer"
      @click="goBack()"
    >
      <i class="material-icons mr-2">
        arrow_back
      </i>

      <p>Back</p>
    </div>

    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      Map income report
    </h1>

    <div class="max-w-2xl mx-auto p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none">
      <map-income-table :items-diff-income="mapItemsIncome" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { POEPricedStashItem } from '@/models/PathOfExile';
import { MapState } from '@/store/map/map.state';
import MapIncomeTable from '@/components/MapIncomeTable.vue';

@Component({
  components: {
    MapIncomeTable
  }
})
export default class mapItemsIncomeView extends Vue {
  get mapParamIndex(): number {
    return parseInt(this.$route.params.id, 10);
  }

  get map(): MapState {
    return this.$store.state.map;
  }

  get mapItemsIncome(): POEPricedStashItem[] {
    return this.map.mapsHistory[this.mapParamIndex].items;
  }

  public goBack() {
    this.$router.back();
  }
}
</script>

<style scoped>
.back-home {
  top: 42px;
}
</style>
