<template>
  <div id="mapping-history-view" class="relative container mx-auto py-8">
    <back-button :label="'Home'" @on-click="goToHome" />

    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      Mapping history
    </h1>

    <p class="mb-4 text-center text-discord-100 select-none">
      Click on a row for a list of detailed income items.
    </p>

    <vue-good-table
      class="max-w shadow-2xl mb-4"
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        perPage: 10,
        perPageDropdown: [10, 20, 40],
        dropdownAllowAll: false,
        rowsPerPageLabel: 'Maps per page',
      }"
      style-class="vgt-table striped"
      @on-row-click="onRowClick"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'map.name'" class="flex flex-row items-center">
          <img :src="getMapIconURL(props.row.map, selectedPoeCharacter.league)" class="w-8 h-8 mr-3" />
          <span>{{ props.row.map.name }}</span>
        </span>

        <span v-if="props.column.field == 'income.chaos'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.income.chaos }}</span>
          <img :src="require('@/assets/images/orbs/chaos-orb.png')" class="w-6 h-6" />
        </span>

        <span v-if="props.column.field == 'income.exalt'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.income.exalt }}</span>
          <img :src="require('@/assets/images/orbs/exalted-orb.png')" class="w-6 h-6" />
        </span>

        <span v-if="props.column.field == 'duration'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ (props.row.duration * 1000) | date('mm:ss') }}</span>
        </span>

        <span v-if="props.column.field == 'endDate'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.endDate | date('DD-MM-YYYY') }}</span>
        </span>
      </template>
    </vue-good-table>

    <div class="max-w mx-auto p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none">
      <h2 class="mb-2 text-gray-300 text-xl text-center">
        Income of your 50 most recent maps
      </h2>

      <line-chart :height="150" :colors="['#3daa79']" :labels="chartLabels" :datasets="chartDatasets" />

      <div class="flex items-center justify-center">
        <div class="w-8 h-4 rounded mr-2 bg-green-500" />

        <p class="text-base">
          Chaos income
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';

import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import { mapGetters } from '@/store/map/map.consts';
import { MapState } from '@/store/map/map.state';
import { userGetters } from '@/store/user/user.consts';
import { POEMapItem, POEMapHistoryDate, POEMapHistory, POECharacter } from '@/models/PathOfExile';
import LineChart from '@/components/charts/LineChart.vue';
import BackButton from '@/components/ui-components/BackButton.vue';

@Component({
  components: {
    LineChart,
    BackButton,
  },
})
export default class MappingHistoryView extends Mixins(POEMapIconURLMixin) {
  private columns = [
    {
      label: 'Map',
      field: 'map.name',
      sortable: false,
    },
    {
      label: 'Chaos income',
      field: 'income.chaos',
      type: 'decimal',
    },
    {
      label: 'Exalt income',
      field: 'income.exalt',
      type: 'decimal',
    },
    {
      label: 'Run duration',
      field: 'duration',
      type: 'number',
    },
    {
      label: 'Run date',
      field: 'endDate',
      type: 'date',
      dateInputFormat: 'DD-MM-YYYY HH:mm:ss',
      dateOutputFormat: 'DD-MM-YYYY',
      sortable: false,
    },
  ];

  get map(): MapState {
    return this.$store.state.map;
  }

  get rows(): POEMapHistoryDate[] {
    return this.$store.getters[mapGetters.mapsHistoryDate];
  }

  get selectedPoeCharacter(): POECharacter {
    return this.$store.getters[userGetters.poeSelectedCharacter];
  }

  /**
   * Charts labels, return only the 50 most recent maps.
   */
  get chartLabels(): string[] {
    const mapsHistory: POEMapHistory[] = JSON.parse(JSON.stringify(this.map.mapsHistory));

    return mapsHistory.slice(0, 50).map((mapHistory, i) => `#${i + 1}`);
  }

  /**
   * Generate dataset, return only the 50 most recent maps.
   */
  get chartDatasets() {
    const mapsHistory: POEMapHistory[] = JSON.parse(JSON.stringify(this.map.mapsHistory));

    return [
      {
        values: mapsHistory.slice(0, 50).map((mapHistory) => mapHistory.income.chaos),
      },
    ];
  }

  public onRowClick(params: any) {
    const { originalIndex } = params.row;

    this.$router.push(`/map-income/${originalIndex}`);
  }

  public goToHome() {
    this.$router.push('/');
  }
}
</script>

<style scoped>
.back-home {
  top: 42px;
}
</style>
