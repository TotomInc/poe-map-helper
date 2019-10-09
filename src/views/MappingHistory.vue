<template>
  <div id="mapping-history-view" class="relative container mx-auto py-8">
    <back-button :label="'Home'" @on-click="goToHome" />

    <div
      class="share-button absolute inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
      @click="createShareableLink"
    >
      <i class="material-icons flex items-center mr-2">
        share
      </i>

      <p>Share</p>
    </div>

    <div
      class="import-button absolute inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
      @click="createShareableLink"
    >
      <i class="material-icons flex items-center mr-2">
        edit
      </i>

      <p>Import</p>
    </div>

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

      <p v-if="map.mapsHistory.length <= 0" class="text-center">
        No data. Run some maps!
      </p>

      <line-chart
        v-if="map.mapsHistory.length > 0"
        :height="150"
        :colors="['#3daa79']"
        :labels="chartLabels"
        :datasets="chartDatasets"
      />

      <div v-if="map.mapsHistory.length > 0" class="flex items-center justify-center">
        <div class="w-8 h-4 rounded mr-2 bg-green-500" />

        <p class="text-base">
          Chaos income
        </p>
      </div>
    </div>

    <notifications group="MAPPING-HISTORY" position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';
import axios from 'axios';
import isElectron from 'is-electron';

import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import { mapMutations, mapGetters } from '@/store/map/map.consts';
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

  /**
   * Stringify the map-history and push it to a JSONBin, once created copy the
   * JSONBin ID to the clipboard.
   */
  public createShareableLink() {
    const payload = {
      mapsHistory: JSON.stringify(this.map.mapsHistory),
    };

    this.$notify({
      group: 'MAPPING-HISTORY',
      title: 'Share mapping-history',
      text: 'Creating a shareable mapping-history link...',
    });

    axios
      .post('https://api.jsonbin.io/b/', payload, {
        headers: {
          'Content-Type': 'application/json',
          'secret-key': '$2b$10$gRhmLSfmU/QxmWS8jGarjeeoWH6Ld9ssN00A91R.nCWNjTubYvQDq',
        },
      })
      .then((response) => {
        return this.copyToClipboard(response.data.id);
      })
      .then((binID) => {
        this.$notify({
          group: 'MAPPING-HISTORY',
          title: 'Share mapping-history',
          text: 'Mapping-history link created and copied to your clipboard!',
        });
      })
      .catch((error) => {
        this.$notify({
          group: 'MAPPING-HISTORY',
          title: 'Share mapping-history',
          text: `Unable to share mapping-history: error ${error.statusCode || 'unknown'}`,
          type: 'error',
        });
      });
  }

  /**
   * Retrieve a JSONBin, if success then store the shared map-history in the
   * store.
   *
   * @param binID ID of the JSONBin to retrieve
   */
  public retrieveShareableLink(binID: string) {
    axios
      .get(`https://api.jsonbin.io/b/${binID}`, {
        headers: {
          'Content-Type': 'application/json',
          'secret-key': '$2b$10$gRhmLSfmU/QxmWS8jGarjeeoWH6Ld9ssN00A91R.nCWNjTubYvQDq',
        },
      })
      .then((response) => {
        const payload = JSON.parse(response.data);

        this.$store.commit(mapMutations.setMapsHistoryShared, payload);

        this.$notify({
          group: 'MAPPING-HISTORY',
          title: 'Load mapping-history',
          text: `Mapping-history successfully loaded from bin ID ${binID}`,
        });
      })
      .catch((error) => {
        this.$notify({
          group: 'MAPPING-HISTORY',
          title: 'Load mapping-history',
          text: `Unable to load mapping-history: error ${error.statusCode || 'unknown'}`,
          type: 'error',
        });
      });
  }

  /**
   * Copy to the clipboard the JSONBin ID if in an electron environment.
   *
   * @param binID ID of the JSONBin to copy to clipboard
   */
  private copyToClipboard(binID: string) {
    if (isElectron()) {
      import('electron').then((electron) => {
        electron.clipboard.writeText(binID);
      });
    }
  }
}
</script>

<style scoped>
.share-button,
.import-button {
  transition: all 0.2s ease-in-out;
}

.share-button {
  top: 42px;
  right: 16px;
}

.import-button {
  top: 42px;
  right: 112px;
}
</style>
