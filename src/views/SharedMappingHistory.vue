<template>
  <div id="shared-mapping-history-view" class="relative container mx-auto py-8">
    <div class="share-container absolute flex justify-between">
      <div>
        <back-button v-if="user.logged" class="back-button relative mr-4" :label="'Home'" @on-click="goToHome" />
      </div>

      <div>
        <div
          class="import-button inline-flex text-gray-300 py-1 px-3 mr-4 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
          :class="{
            'cursor-not-allowed': share.loading,
            'opacity-50': share.loading,
          }"
          @click="retrieveShareableLink"
        >
          <i class="material-icons flex items-center mr-2">
            edit
          </i>

          <p>Import</p>
        </div>

        <div class="mapping-history-id inline-flex">
          <v-input
            v-model="JSONBinID"
            type="text"
            placeholder="Mapping-history ID"
            icon="vpn_key"
            :disabled="share.loading"
          />
        </div>
      </div>
    </div>

    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      Shared mapping history
    </h1>

    <p class="mb-4 text-center text-discord-100 select-none">
      Click on a row for a list of detailed income items.
    </p>

    <mapping-history-table :maps-history="share.mapsHistory" :character="share.character" @on-row-click="onRowClick" />

    <div class="max-w mx-auto p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none">
      <h2 class="mb-2 text-gray-300 text-xl text-center">
        Income of the 50 most recent maps of this shared mapping-history
      </h2>

      <p v-if="share.mapsHistory.length <= 0" class="text-center">
        No data, please import a mapping-history.
      </p>

      <line-chart
        v-if="share.mapsHistory.length > 0"
        :height="150"
        :colors="['#3daa79']"
        :labels="chartLabels"
        :datasets="chartDatasets"
      />

      <div v-if="share.mapsHistory.length > 0" class="flex items-center justify-center">
        <div class="w-8 h-4 rounded mr-2 bg-green-500" />

        <p class="text-base">
          Chaos income
        </p>
      </div>
    </div>

    <notifications group="SHARED-MAPPING-HISTORY" position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';

import { UserState } from '@/store/user/user.state';
import { ShareState } from '@/store/share/share.state';
import { shareActions, shareGetters } from '@/store/share/share.consts';
import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import BackButton from '@/components/ui-components/BackButton.vue';
import Input from '@/components/ui-components/Input.vue';
import LineChart from '@/components/charts/LineChart.vue';
import MappingHistoryTable from '@/components/tables/MappingHistoryTable.vue';

@Component({
  components: {
    VInput: Input,
    BackButton,
    LineChart,
    MappingHistoryTable,
  },
})
export default class SharedMappingHistoryView extends Mixins(POEMapIconURLMixin) {
  private JSONBinID: string = '';

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

  get user(): UserState {
    return this.$store.state.user;
  }

  get share(): ShareState {
    return this.$store.state.share;
  }

  /**
   * Charts labels, return only the 50 most recent maps of the shared
   * mapping-history.
   */
  get chartLabels(): string[] {
    const mapsHistoryDataset: POEMapHistory[] = JSON.parse(JSON.stringify(this.share.mapsHistory));

    return mapsHistoryDataset.slice(0, 50).map((mapHistory, i) => `#${i + 1}`);
  }

  /**
   * Generate dataset of shared mapping-history, return only the 50 most
   * recent maps.
   */
  get chartDatasets() {
    const mapsHistoryDataset: POEMapHistory[] = JSON.parse(JSON.stringify(this.share.mapsHistory));

    return [
      {
        values: mapsHistoryDataset.slice(0, 50).map((mapHistory) => mapHistory.income.chaos),
      },
    ];
  }

  public goToHome(): void {
    if (this.user.logged) {
      this.$router.push('/');
    }
  }

  public onRowClick(event: any) {}

  public mounted(): void {
    const queryID = this.$route.query.id;

    if (queryID && typeof queryID === 'string') {
      this.JSONBinID = queryID;

      this.retrieveShareableLink();
    }

    this.$store.subscribeAction({
      after: ({ type, payload }) => {
        if (type === shareActions.LOAD_SHARE_SUCCESS) {
          this.$notify({
            group: 'SHARED-MAPPING-HISTORY',
            title: 'Load shared mapping-history',
            text: `Mapping-history successfully loaded with ID: ${this.JSONBinID}`,
          });
        }

        if (type === shareActions.LOAD_SHARE_FAILED) {
          this.$notify({
            group: 'SHARED-MAPPING-HISTORY',
            title: 'Load shared mapping-history',
            text: `Unable to load shared mapping-history: ${payload.message || 'error unknown'}`,
            type: 'error',
          });
        }
      },
    });
  }

  /**
   * Retrieve a JSONBin, if successfull store the shared map-history in the
   * store.
   */
  private retrieveShareableLink() {
    if (!this.share.loading) {
      this.$notify({
        group: 'SHARED-MAPPING-HISTORY',
        title: 'Load mapping-history',
        text: `Loading shared mapping-history with ID: ${this.JSONBinID}`,
      });

      this.$store.dispatch(shareActions.LOAD_SHARE, this.JSONBinID);
    }
  }
}
</script>

<style scoped>
.share-container {
  top: 42px;
  right: 16px;
  left: 16px;
}

.back-button {
  top: 0 !important;
  left: 0 !important;
}

.share-button,
.import-button,
.remove-import-button {
  transition: all 0.2s ease-in-out;
}
</style>
